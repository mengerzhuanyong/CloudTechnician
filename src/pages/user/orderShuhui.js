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
} from 'react-native'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'
import ActivityIndicatorItem from '../../components/common/ActivityIndicatorItem'

import EmptyComponent from '../../components/common/emptyComponent'

export default class OrderShuhui extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            ready: false,
            loadMore: false,
            refreshing: false,
            fund_id: params.fund_id,
            orderListData: [],
            order_id: '',
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

    updateState = (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        let url = NetApi.get_fund_order_list;
        let data = {
            fund_id: this.state.fund_id,
            type: 2,
            member_id: global.user.userData.id,
            token: global.user.userData.token,
        }
        Services.Post(url, data)
            .then( result => {
                // console.log(result);
                this.updateState({
                    orderListData: result.data,
                })
            })
            .catch( error => {
                // consoleLog('链接服务器出错，请稍后重试', error);
            })
    }

    onPushNavigator = (compent, order_id, status) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            order_id: order_id,
            status: status,
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

    toWebview = (title, id, link, compent) => {
        const { navigate } = this.props.navigation;
        navigate(compent, {
            title: title,
            id: id,
            link: link,
        })
    }

    renderCompanyItem = ({item}) => {
        let thisStatus = item.status;
        // console.log(thisStatus);
        return(
            <View style={styles.orderItem}>
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderShuhuiDetail', item.id, thisStatus)}} style={styles.orderTop}>
                    <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                        <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                            <Image source={require('../../assets/images/icons/icon_rili.png')} style={styles.orderCreateIco} />
                            <Text style={styles.orderCreateText}>{item.create_time}</Text>
                        </View>
                        <Text style={styles.orderStatus}>{item.status_msg}</Text>
                    </View>
                    <View style={[styles.orderdate, GlobalStyle.flexRowBetween]}>
                        <Text style={styles.orderTime}>赎回手续费：{item.rate_money}</Text>
                        <Text style={styles.orderMoney}>{item.money}</Text>
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
        return (
            <View style={styles.container}>
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
        width: 15,
        height: 15,
        marginRight: 3
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
