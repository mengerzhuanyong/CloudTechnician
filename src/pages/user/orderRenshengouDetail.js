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
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet'

// 弹窗
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '取消', '确认']
const titleClose = '您确认要关闭此订单吗？'
const titleUndo = '您确认要撤销该订单吗？'
export default class OrderRenshengouDetail extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            order_id: params.order_id,
            status: params.status,
            fund_id: '',
            order_sn: '',
            create_time: '',
            payment_day: '',
            status_msg: '',
            buy_type: '',
            money: '',
            confirm_day: '',
            open_day: '',
            is_first: '',
            manage_cost: '',
            entrust_cost: '',
            outsource_cost: '',
            rate_money: '',
            clear_money: '',
            clear_num: '',
            last_clear_time: '',
            redeem_money: '',
            transfer_money: '',
            isDateTimePickerVisible: false,
        }
    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.state.params.onCallBack();
        this.props.navigation.goBack();
    }

    componentWillUnmount = () => {
        this.onBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        let url = NetApi.get_apply_buy_order_detaile;
        let data = {
            order_id: this.state.order_id,
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.setState({
                        fund_id: result.data.fund_id,
                        order_sn: result.data.order_sn,
                        create_time: result.data.create_time,
                        payment_day: result.data.payment_day,
                        status_msg: result.data.status_msg,
                        buy_type: result.data.buy_type,
                        money: result.data.money,
                        confirm_day: result.data.confirm_day,
                        open_day: result.data.open_day,
                        is_first: result.data.is_first,
                        manage_cost: result.data.manage_cost,
                        entrust_cost: result.data.entrust_cost,
                        outsource_cost: result.data.outsource_cost,
                        rate_money: result.data.rate_money,
                        clear_money: result.data.clear_money,
                        clear_num: result.data.clear_num,
                        last_clear_time: result.data.last_clear_time,
                        redeem_money: result.data.redeem_money,
                        transfer_money: result.data.transfer_money,
                    })
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    onPushNavigator = (compent) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            fund_id: this.state.fund_id,
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
                    this.onBack();
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    _showDateTimePicker = () => {
        this.setState({ 
            isDateTimePickerVisible: true 
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

    showActionSheetClose() {
        this.ActionSheetClose.show();
    }

    handlePressClose = (i) => {
        if(i === 1){
            this.closeOrder();
        }
    }

    showActionSheetUndo() {
        this.ActionSheetUndo.show();
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

    render(){
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'订单详情'}
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
                <ScrollView>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>订单号</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.order_sn}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>创建时间</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.create_time}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>确认汇款时间</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.payment_day}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>订单状态</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.status_msg}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>订单类型</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.buy_type}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>订单金额</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.money}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>份额确认日</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.confirm_day}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>所属开放日</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.open_day}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>申购类型</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.is_first}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist, GlobalStyle.hide]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>管理费用</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.manage_cost}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist, GlobalStyle.hide]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>托管费用</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.entrust_cost}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist, GlobalStyle.hide]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>外包费用</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.outsource_cost}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>手续费用</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.rate_money}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>已结算金额</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.clear_money}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>已结算次数</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.clear_num}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>上次结算时间</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.last_clear_time}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>已赎回份数</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.redeem_money}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>已转让份数</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.transfer_money}</Text>
                        </View>
                    </View>
                </ScrollView>
                    
                {this.botBar(this.state.status)}

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

    botBar = (thisStatus) => {
        if(thisStatus === 0){
            //未汇款
            return(
                <View style={styles.botBar}>
                    <TouchableOpacity onPress={()=>{this._showDateTimePicker()}} style={styles.botLeft}>
                        <Text style={styles.botLeftText}>确认汇款</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.showActionSheetClose()}} style={styles.botRight}>
                        <Text style={styles.botRightText}>取消订单</Text>
                    </TouchableOpacity> 
                </View>
            )
        }else if(thisStatus === 2){
            //汇款已确认，份额待确认
            return(
                <View style={styles.botBar}>
                    <TouchableOpacity onPress={()=>{this.showActionSheetUndo()}} style={styles.botLeft}>
                        <Text style={styles.botLeftText}>撤销订单</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    userlistRightText: {
        position: 'absolute',
        right: 20,
        color: GlobalStyle.themeColor,
    },
    right0: {
        right: 0
    },
    botBar: {
        height: 54,
        backgroundColor: GlobalStyle.themeColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    botLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
    },
    botLeftText: {
        fontSize: 18,
        color: '#fff',
    },
    botRight: {
        flex: 1,
        backgroundColor: '#fff',
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
    },
    botRightText: {
        color: '#666',
        fontSize: 18,
    },
});
