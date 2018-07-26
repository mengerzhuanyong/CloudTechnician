/**
 * 速芽物流 - WebName
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'
import ActivityIndicatorItem from '../../components/common/ActivityIndicatorItem'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'

import EmptyComponent from '../../components/common/emptyComponent'
export default class TuijianZhuce extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            ready: false,
            loadMore: false,
            refreshing: false,
            orderListData: [],
        }
    }

    componentDidMount(){
        this.loadNetData();
        setTimeout(() => {
            this.updateState({
                ready: true
            })
        },0)
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState = (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        let url = NetApi.get_team_reg_list;
        let data = {
            member_id: global.user.userData.id,
            token: global.user.userData.token,
        }
        Services.Post(url, data, true)
            .then( result => {
                console.log(result);
                this.updateState({
                    orderListData: result.data,
                })
            })
            .catch( error => {
                // consoleLog('链接服务器出错，请稍后重试', error);
            })
    }

    onPushNavigator = (compent, order_id) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            order_id: order_id,
            onCallBack:()=>{
                this.loadNetData();
            }
        })
    }

    dropLoadMore = () => {
        this.loadNetData();
    }

    freshNetData = () => {
        this.loadNetData();
    }

    renderCompanyItem = ({item}) => {
        return(
            <View style={styles.orderItem}>
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderRenshengouDetail', item.order_id)}} style={styles.orderTop}>
                    <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                        <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                            <Image source={{uri: item.head_img}} style={styles.orderCreateIco} />
                            <Text style={styles.orderCreateText}>{item.account}</Text>
                        </View>
                        <Text style={styles.orderStatus}>{item.create_time}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderHeaderView = () => {
        return (
            <View style={styles.shopListViewTitle}>
                
            </View>
        )
    }

    renderFooterView = () => {
        return <FooterComponent />;
    }
    
    renderEmptyView = () => {
        return <EmptyComponent />;
    }

    renderSeparator = () => {
        return <View style={GlobalStyle.horLine} />;
    }

    render(){
        const { ready, refreshing, orderListData } = this.state;
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'推荐注册人'}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                    rightButton = {UtilsView.getRightKefuBlackButton(() => RouterHelper.navigate('', 'Kefu'))}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'dark-content'}
                />
                {ready ?
                    <FlatList
                        style = {styles.shopListView}
                        keyExtractor = { item => item.id}
                        data = {orderListData}
                        extraData = {this.state}
                        renderItem = {(item) => this.renderCompanyItem(item)}
                        onEndReachedThreshold = {0.1}
                        onEndReached = {(info) => this.dropLoadMore(info)}
                        onRefresh = {this.freshNetData}
                        refreshing = {refreshing}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent = {this.renderHeaderView}
                        ListFooterComponent = {this.renderFooterView}
                        ListEmptyComponent = {this.renderEmptyView}
                    />
                    : <ActivityIndicatorItem />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    orderItem: {
        backgroundColor: '#fff',
        marginTop: 10,
    },
    orderTop: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    orderInfo: {
        height: 40,
    },
    orderCreate: {
        
    },
    orderCreateIco: {
        width: 20,
        height: 20,
        marginRight: 3,
        borderRadius: 10
    },
    orderCreateText: {
        fontSize: 15,
        color: '#666',
    },
    orderStatus: {
        fontSize: 15,
        color: '#666',

    },
    orderdate: {
        height: 40,
    },
    orderTime: {
        fontSize: 15,
        color: '#666',

    },
    orderMoney: {
        fontSize: 20,
        color: GlobalStyle.themeColor,

    },
    orderBot: {
        height: 48,
    },
    orderOpera: {
        height: 32,
        width: 86,
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 13,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderOperaText: {
        fontSize: 15,
        color: '#666',

    },
});
