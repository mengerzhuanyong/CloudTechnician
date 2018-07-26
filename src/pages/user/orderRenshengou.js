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
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet'

import EmptyComponent from '../../components/common/emptyComponent'
// 弹窗
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '取消', '确认']
const titleClose = '您确认要关闭此订单吗？'
const titleUndo = '您确认要撤销该订单吗？'

export default class OrderRenshengou extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            ready: false,
            loadMore: false,
            refreshing: false,
            fund_id: params.fund_id,
            orderListData: [],
            isDateTimePickerVisible: false,
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
            type: 1,
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

    hasCompleted = (DateFormat) => {
        let url = NetApi.confirm_payment;
        let data = {
            order_id: this.state.order_id,
            payment_day: DateFormat,
            member_id: global.user.userData.id,
            token: global.user.userData.token,
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    Toast.toastShort(result.msg);
                    this.loadNetData();
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    _showDateTimePicker = (order_id) => {
        this.setState({ 
            isDateTimePickerVisible: true,
            order_id: order_id
        })
    }

    _hideDateTimePicker = () => {
        this.setState({ 
            isDateTimePickerVisible: false 
        });
    }

    _handleDatePicked = (date) => {
        // console.log(date);
        let DateFormat =  moment(date).format("YYYY-MM-DD");
        this.setState({
            payment_day:DateFormat
        });
        // console.log(DateFormat);
        this._hideDateTimePicker();
        this.hasCompleted(DateFormat);
    };

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

    showActionSheetClose(order_id) {
        this.ActionSheetClose.show();
        this.setState({
            order_id: order_id
        })
    }

    handlePressClose = (i) => {
        if(i === 1){
            this.closeOrder();
        }
    }

    showActionSheetUndo(order_id) {
        this.ActionSheetUndo.show();
        this.setState({
            order_id: order_id
        })
    }

    handlePressUndo = (i) => {
        if(i === 1){
            this.undoOrder();
        }
    }

    closeOrder = () => {
        let url = NetApi.close_fund_order;
        let data = {
            order_id: this.state.order_id
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    Toast.toastShort(result.msg);
                    this.loadNetData();
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }

    undoOrder = () => {
        let url = NetApi.reback_fund_order;
        let data = {
            order_id: this.state.order_id
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    Toast.toastShort(result.msg);
                    this.loadNetData();
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }

    renderCompanyItem = ({item}) => {
        let thisStatus = item.status;
        // console.log(thisStatus);
        if(thisStatus === 0){
            //未汇款
            return(
                <View style={styles.orderItem}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderRenshengouDetail', item.id, thisStatus)}} style={styles.orderTop}>
                        <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                            <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                                <Image source={require('../../assets/images/icons/icon_rili.png')} style={styles.orderCreateIco} />
                                <Text style={styles.orderCreateText}>{item.create_time}</Text>
                            </View>
                            <Text style={styles.orderStatus}>{item.status_msg}</Text>
                        </View>
                        <View style={[styles.orderdate, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.orderTime}>汇款日：待确认</Text>
                            <Text style={styles.orderMoney}>{item.money}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.orderBot, GlobalStyle.flexRowEnd]}>
                        <TouchableOpacity onPress={()=>{this._showDateTimePicker(item.id)}} style={styles.orderOpera}>
                            <Text style={styles.orderOperaText}>确认汇款</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.showActionSheetClose(item.id)}} style={styles.orderOpera}>
                            <Text style={styles.orderOperaText}>取消订单</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else if(thisStatus === 1){
            //已汇款待确认
            return(
                <View style={styles.orderItem}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderRenshengouDetail', item.id, thisStatus)}} style={styles.orderTop}>
                        <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                            <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                                <Image source={require('../../assets/images/icons/icon_rili.png')} style={styles.orderCreateIco} />
                                <Text style={styles.orderCreateText}>{item.create_time}</Text>
                            </View>
                            <Text style={styles.orderStatus}>{item.status_msg}</Text>
                        </View>
                        <View style={[styles.orderdate, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.orderTime}>汇款日：{item.payment_day}</Text>
                            <Text style={styles.orderMoney}>{item.money}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }else if(thisStatus === 2){
            //已确认到款，待确认份额
            return(
                <View style={styles.orderItem}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderRenshengouDetail', item.id, thisStatus)}} style={styles.orderTop}>
                        <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                            <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                                <Image source={require('../../assets/images/icons/icon_rili.png')} style={styles.orderCreateIco} />
                                <Text style={styles.orderCreateText}>{item.create_time}</Text>
                            </View>
                            <Text style={styles.orderStatus}>{item.status_msg}</Text>
                        </View>
                        <View style={[styles.orderdate, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.orderTime}>汇款确认日：{item.admin_status_time}</Text>
                            <Text style={styles.orderMoney}>{item.money}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.orderBot, GlobalStyle.flexRowEnd]}>
                        <TouchableOpacity onPress={() => {this.showActionSheetUndo(item.id)}} style={styles.orderOpera}>
                            <Text style={styles.orderOperaText}>撤销订单</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else if(thisStatus === 3){
            //已确认份额
            return(
                <View style={styles.orderItem}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderRenshengouDetail', item.id, thisStatus)}} style={styles.orderTop}>
                        <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                            <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                                <Image source={require('../../assets/images/icons/icon_rili.png')} style={styles.orderCreateIco} />
                                <Text style={styles.orderCreateText}>{item.create_time}</Text>
                            </View>
                            <Text style={styles.orderStatus}>{item.status_msg}</Text>
                        </View>
                        <View style={[styles.orderdate, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.orderTime}>份额确认日：{item.confirm_day}</Text>
                            <Text style={styles.orderMoney}>{item.money}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }else if(thisStatus === -1){
            //申请反悔，待审核
            return(
                <View style={styles.orderItem}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderRenshengouDetail', item.id, thisStatus)}} style={styles.orderTop}>
                        <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                            <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                                <Image source={require('../../assets/images/icons/icon_rili.png')} style={styles.orderCreateIco} />
                                <Text style={styles.orderCreateText}>{item.create_time}</Text>
                            </View>
                            <Text style={styles.orderStatus}>{item.status_msg}</Text>
                        </View>
                        <View style={[styles.orderdate, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.orderTime}></Text>
                            <Text style={styles.orderMoney}>{item.money}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }else if(thisStatus === -2){
            //已反悔，取消订单
            return(
                <View style={styles.orderItem}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderRenshengouDetail', item.id, thisStatus)}} style={styles.orderTop}>
                        <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                            <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                                <Image source={require('../../assets/images/icons/icon_rili.png')} style={styles.orderCreateIco} />
                                <Text style={styles.orderCreateText}>{item.create_time}</Text>
                            </View>
                            <Text style={styles.orderStatus}>{item.status_msg}</Text>
                        </View>
                        <View style={[styles.orderdate, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.orderTime}></Text>
                            <Text style={styles.orderMoney}>{item.money}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }else if(thisStatus === -3){
            //已取消，取消订单
            return(
                <View style={styles.orderItem}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'OrderRenshengouDetail', item.id, thisStatus)}} style={styles.orderTop}>
                        <View style={[styles.orderInfo, GlobalStyle.flexRowBetween]}>
                            <View style={[styles.orderCreate, GlobalStyle.flexRowStart]}>
                                <Image source={require('../../assets/images/icons/icon_rili.png')} style={styles.orderCreateIco} />
                                <Text style={styles.orderCreateText}>{item.create_time}</Text>
                            </View>
                            <Text style={styles.orderStatus}>{item.status_msg}</Text>
                        </View>
                        <View style={[styles.orderdate, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.orderTime}></Text>
                            <Text style={styles.orderMoney}>{item.money}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
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

                <DateTimePicker
                    titleIOS={'选择时间'}
                    confirmTextIOS='确认'
                    cancelTextIOS='取消'
                    datePickerModeAndroid='calendar'
                    mode='date'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />

                  <ActionSheet
                    ref={o => this.ActionSheetClose = o}
                    title={titleClose}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePressClose}
                  />

                  <ActionSheet
                    ref={o => this.ActionSheetUndo = o}
                    title={titleUndo}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePressUndo}
                  />
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
