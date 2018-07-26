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

export default class Shuhui extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            fund_id: params.fund_id,
            fund_name: params.title,
            money_total: params.money_total,
            next_open_month: params.next_open_month,
            money: '',
            fene: '',
            money_text: '',
            rate_money: '',
            total_money: '',
            total_money_text: '',
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
            fund_id: this.state.fund_id,
            onCallBack:()=>{
                this.loadNetData();
            }
        })
    }

    setFene = (text) => {
        let url = NetApi.get_buy_fund_rate;
        let money = text;
        if(money.indexOf('.')>0 || money.indexOf('。')>0){
            Toast.toastShort('申购份额必须是整数，不能包含特殊字符，请重新输入!');
            this.setState({
                fene: '',
                money: '',
                money_text: '',
                rate_money: '',
                total_money: '',
                total_money_text: '',
            })
            return false;
        }
        let data = {
            money: text,
            fund_id: this.state.fund_id
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.setState({
                        money_text: result.data.money_text,
                        rate_money: result.data.rate_money,
                        total_money: result.data.total_money,
                        money: result.data.money,
                        total_money_text: result.data.total_money_text,
                    })
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                // console.log(error);
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    submit = () => {
        let url = NetApi.redeem_fund;
        let money = this.state.fene;
        if(money.indexOf('.')>0 || money.indexOf('。')>0){
            Toast.toastShort('申购份额必须是整数，不能包含特殊字符，请重新输入!');
            this.setState({
                fene: '',
                money: '',
                money_text: '',
                rate_money: '',
                total_money: '',
                total_money_text: '',
            })
            return false;
        }
        let data = {
            fund_id: this.state.fund_id,
            money: this.state.fene,
            member_id: global.user.userData.id,
            token: global.user.userData.token,
        };

        if(!this.state.fene){
            Toast.toastShort('请填写赎回份额！');
            return false;
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
                // console.log(error);
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
                    title = {this.state.fund_name}
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
                    <View style={[GlobalStyle.userlist, {backgroundColor: '#fff'}]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>可用份额</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.money_total}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist, {backgroundColor: '#fff'}]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>赎回开放月</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.next_open_month}</Text>
                        </View>
                    </View>

                    <View style={[{padding: 15, backgroundColor: '#fff', paddingBottom: 5 }]}>
                        <View style={styles.shengoujia}>
                            <View style={styles.shengoufene}>
                                <TextInput
                                    placeholder={'请填写赎回份额'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => {
                                        this.setState({
                                            fene: text
                                        })
                                        this.setFene(text);
                                    }}
                                    style={[styles.cellInput, __IOS__ ? null : styles.inputAndroid]} 
                                    underlineColorAndroid={'transparent'}
                                    value={this.state.fene}
                                >
                                </TextInput>
                            </View>
                            <View style={[styles.zongjine, GlobalStyle.flexRowBetween]}>
                                <Text style={styles.jinefuhao}>￥</Text>
                                <Text style={styles.jineshuzhi}>{this.state.total_money}</Text>
                            </View>
                            <View style={[styles.jinebaokuo, GlobalStyle.flexRowBetween]}>
                                <Text style={styles.jinebkleft}>包括：</Text>
                                <View style={styles.jinebkright}>
                                    <Text style={styles.jinebkrightline}>人民币：{this.state.total_money_text}</Text>
                                    <Text style={styles.jinebkrightline}>本金价款：{this.state.money}</Text>
                                    <Text style={styles.jinebkrightline}>赎回费：{this.state.rate_money}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.zhanghu}>
                            <Text style={[styles.orderText, {marginBottom: 8}]}>※金额不包括收益</Text>
                            <Text style={[styles.orderText, {marginBottom: 8}]}>※您的赎回将按照申购顺序从前到后，依次完成赎回</Text>
                        </View>
                    </View>

                    <View style={[GlobalStyle.whiteModule, {marginTop: 0}]}>
                        <TouchableOpacity onPress={() => {this.submit()}} style={[GlobalStyle.submit, {marginTop: 0}]}>
                            <Text style={GlobalStyle.btna}>提交赎回申请</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[{padding: 15, paddingBottom: 5, paddingTop: 30}]}>
                        <Text style={[styles.orderText, {color: GlobalStyle.themeColor}]}>请您确保默认银行卡账户信息填写完整，并保持可用状态，否则赎回款项可能无法到账！</Text>
                    </View>

                    <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                        <TouchableOpacity onPress = {() => {RouterHelper.navigate('', 'Yinhangka')}} style={GlobalStyle.userlist}>
                            <View style={GlobalStyle.userlistleft}>
                                <Image source={require('../../assets/images/icons/icon_member_yinhangka.png')} style={GlobalStyle.usericon} />
                            </View>
                            <View style={GlobalStyle.userlistright}>
                                <Text style={GlobalStyle.userlisttext}>查看银行卡信息</Text>
                                <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                            </View>
                        </TouchableOpacity>
                    </View>
                            
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
    userlistRightText: {
        position: 'absolute',
        right: 20,
        color: GlobalStyle.themeColor,
    },
    right0: {
        right: 0
    },
    shengoujia: {
        backgroundColor: GlobalStyle.themeColor,
        borderRadius: 8,

    },
    shengoufene: {

    },
    cellInput:{
        width: GlobalStyle.width - 50,
        height: 45,
        marginLeft: 10,
        fontSize:15,
        textAlign:'center',
        color: GlobalStyle.themeColor,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        
    },
    inputAndroid:{
        padding: 0,
    },
    zongjine: {
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 1
    },
    jinefuhao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    jineshuzhi: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    jinebaokuo: {
        padding: 15,
    },
    jinebkleft: {
        color: '#fff',
    },
    jinebkright: {

    },
    jinebkrightline: {
        color: '#fff',
        fontSize: 13,
        lineHeight: 18
    },
    orderText: {
        fontSize: 12.5,
        color: '#666',
        lineHeight: 18
    },
    zhanghu: {
        marginTop: 15
    },
});
