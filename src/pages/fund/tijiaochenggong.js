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
export default class Tijiaochenggong extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            user: global.user.userData,
            loginState: global.user.loginState,
            money: params.money,
            fene:  params.fene,
            rate_money: params.rate_money,
            total_money: params.total_money,
            order_id: params.order_id,
            fund_id: params.fund_id,
            payment_day: '',
            isDateTimePickerVisible: false,
            fundDetailBankTitle: params.fundDetailBankTitle,
            fundDetailBankName: params.fundDetailBankName,
            fundDetailBankNum: params.fundDetailBankNum,
            open_day: params.open_day,
        }
    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        
    }

    onPushNavigator = (compent) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            
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
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    sendSms = () => {
        let url = NetApi.send_bank_msg;
        let data = {
            fund_id: this.state.fund_id,
            member_id: global.user.userData.id,
            token: global.user.userData.token,
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    Toast.toastShort(result.msg);
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

    render(){
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'提交订单成功'}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                    rightButton = {UtilsView.getRightHomeBlackButton(() => RouterHelper.navigate('', 'TabNavScreen'))}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'dark-content'}
                />
                <ScrollView>
                    <View style={[styles.tijiaoStatus, GlobalStyle.whiteModule, GlobalStyle.mt10, GlobalStyle.flexColumnCenter]}>
                        <Image source={Images.icon_chenggong} style={styles.statusIco} />
                        <Text style={styles.statusText}>订单提交成功</Text>
                    </View>
                    <View style={[styles.tijiaoInfo, GlobalStyle.whiteModule, GlobalStyle.mt10, GlobalStyle.pt0]}>
                        <View style={[styles.infoWrap, GlobalStyle.flexRowStart, {marginTop: 0}]}><Text style={[styles.infoText, styles.infoTextThemeColor]}>订单详情</Text></View>
                        <View style={[styles.infoWrap, GlobalStyle.flexRowStart, ]}><Text style={styles.infoText}>申购份额：{this.state.money}</Text></View>
                        <View style={[styles.infoWrap, GlobalStyle.flexRowStart, ]}><Text style={styles.infoText}>申购金额：{this.state.money}</Text></View>
                        <View style={[styles.infoWrap, GlobalStyle.flexRowStart, ]}><Text style={styles.infoText}>申购费：{this.state.rate_money}</Text></View>
                        <View style={[styles.infoWrap, GlobalStyle.flexRowStart, ]}><Text style={styles.infoText}>合计金额：{this.state.total_money}</Text></View>
                        <TouchableOpacity onPress={() => {this.sendSms()}} style={[GlobalStyle.submit, styles.submit, GlobalStyle.mt20]}>
                            <Text style={GlobalStyle.btna}>汇款信息发送到手机</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this._showDateTimePicker()}} style={[GlobalStyle.submit, styles.submit]}>
                            <Text style={GlobalStyle.btna}>已完成汇款？</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.zhanghu, GlobalStyle.whiteModule]}>
                        <Text style={[styles.orderText, {marginBottom: 8}]}>订单提交后，请于{this.state.open_day}下午15点前，使用绑定的银行卡（尾号{global.user.userData.bank_num}）将合计金额汇款至募集账户——</Text>
                        <Text style={[styles.orderText, styles.textWeight, {color: GlobalStyle.themeColor}]}>银行户名：{this.state.fundDetailBankTitle}</Text>
                        <Text style={[styles.orderText, styles.textWeight, {color: GlobalStyle.themeColor}]}>开户行：{this.state.fundDetailBankName}</Text>
                        <Text style={[styles.orderText, styles.textWeight, {color: GlobalStyle.themeColor}]}>银行账号：{this.state.fundDetailBankNum}</Text>
                    </View>

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
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    tijiaoStatus: {
        padding: 35,
        marginTop: 10
    },
    statusIco: {
        width: 75,
        height: 75,

    },
    statusText: {
        marginTop: 13,
        fontSize: 17,
        fontWeight: 'bold',
        color: GlobalStyle.themeColor,
    },
    tijiaoInfo: {
        padding: 15,
    },
    infoTextThemeColor: {
        color: GlobalStyle.themeColor,
    },
    infoWrap: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        height: 40,
    },
    infoText: {
        color: '#999',
        fontSize: 14,
    },
    submit: {
        marginTop: 15,
        marginBottom: 0,
        height: 46
    },
    zhanghu: {
        marginTop: 20,
        padding: 15
    },
});
