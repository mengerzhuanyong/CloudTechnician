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
export default class JijinGonggao extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            ready: false,
            loadMore: false,
            refreshing: false,
            orderListData: [],
            fund_id: params.fund_id,
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
       let url = NetApi.get_notice_by_fund;
        let data = {
            fund_id: this.state.fund_id
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

    toWebview = (title, link, compent) => {
        const { navigate } = this.props.navigation;
        navigate(compent, {
            title: title,
            link: link,
        })
    }

    dropLoadMore = () => {
        this.loadNetData();
    }

    freshNetData = () => {
        this.loadNetData();
    }

    renderCompanyItem = ({item}) => {
        let url = item.notice_url;
        return(
            <TouchableOpacity onPress={() => {this.toWebview(item.name, url, 'NewsWebDetail')}} style={[styles.gonggaoList, GlobalStyle.flexRowStart]}>
                <Image source={require('../../assets/images/icons/icon_fund_xieyi.png')} style={styles.gonggaoico} />
                <Text style={styles.gonggaotext} >{item.title}</Text>
            </TouchableOpacity>
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
                    title = {'基金公告'}
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
        backgroundColor: '#fff',
    },
    gonggaoList: {
        // borderBottomColor: '#f2f2f2',
        // borderBottomWidth: 1
        height: 40,
        marginTop: 5
        
    },
    gonggaoico: {
        width: 24,
        height: 24,
        marginRight: 6
    },
    gonggaotext: {
        color: '#666',
        fontSize: 14.5,
        lineHeight: 20,
    },
    shopListView: {
        paddingLeft: 15,
        paddingRight: 15
    }
});
