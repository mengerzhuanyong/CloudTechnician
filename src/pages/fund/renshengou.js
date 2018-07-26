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
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

export default class Renshengou extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            user: global.user.userData,
            loginState: global.user.loginState,
            fund_id: params.fund_id,
            fundDetailBank: params.fundDetailBank,
            fundDetailBankTitle: params.fundDetailBankTitle,
            fundDetailBankName: params.fundDetailBankName,
            fundDetailBankNum: params.fundDetailBankNum,
            open_day: params.open_day,
            is_investor: params.is_investor,
            investor_msg: params.investor_msg,
            back_msg: params.back_msg,
            is_risk: params.is_risk,
            is_bank_card: params.is_bank_card,
            is_modify_truename: params.is_modify_truename,
            is_special_investor: params.is_special_investor,
            is_pay_auth: params.is_pay_auth,
            is_pay_auth_msg: params.is_pay_auth_msg,
            money: '',
            fene: '',
            isTongyi: false,
            money_text: '',
            rate_money: '',
            total_money: '',
            total_money_text: '',
        }
    }

    async componentWillMount(){
        try {
            await this.getInvestData();
        } catch (error) {
            // // console.log(error);
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
        this.loadInvestData();
        this.setState({
            user: global.user.userData
        })        
    }

    loadInvestData = () => {
        let url = NetApi.get_member_status;
        let data = {
            member_id: global.user.userData.id
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    global.user = {
                        loginState: true,
                        userData: {
                            id: global.user.userData.id,
                            account: global.user.userData.account,
                            nickname: global.user.userData.nickname,
                            head_img: global.user.userData.head_img,
                            sex: global.user.userData.sex,
                            integral: global.user.userData.integral,
                            money: global.user.userData.money,
                            email: global.user.userData.email,
                            addr: global.user.userData.addr,
                            bank_num: global.user.userData.bank_num,
                            is_investor: result.data.is_investor,
                            investor_msg: result.data.investor_msg,
                            back_msg: result.data.back_msg,
                            is_risk: result.data.is_risk,
                            is_bank_card: result.data.is_bank_card,
                            is_modify_truename: result.data.is_modify_truename,
                            is_special_investor: result.data.is_special_investor,
                            is_pay_auth: result.data.is_pay_auth,
                            is_pay_auth_msg: result.data.is_pay_auth_msg,
                            special_type: result.data.special_type,
                            token: global.user.userData.token,
                        }
                    };
                    this.updateState({
                        is_investor: result.data.is_investor,
                        investor_msg: result.data.investor_msg,
                        back_msg: result.data.back_msg,
                        is_risk: result.data.is_risk,
                        is_bank_card: result.data.is_bank_card,
                        is_modify_truename: result.data.is_modify_truename,
                        is_special_investor: result.data.is_special_investor,
                        is_pay_auth: result.data.is_pay_auth,
                        is_pay_auth_msg: result.data.is_pay_auth_msg,
                        special_type: result.data.special_type,
                    })
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
        
    }

    getInvestData = () => {
        // console.log(global.invest);
        let url = NetApi.get_investor_info;
        let data = {
            member_id: global.user.userData.id,
            token: global.user.userData.token
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    let card_id = result.data.card_type, 
                        card_type = '请选择', 
                        sex_id = result.data.sex, 
                        sex = '请选择', 
                        nationality_id = result.data.nationality, 
                        nationality = '请选择',
                        experience = result.data.experience,
                        experience1 = 0,
                        experience2 = 0,
                        experience3 = 0,
                        experience4 = 0;
                    switch(card_id){
                        case 1:
                            card_type = '身份证';break;
                        case 2:
                            card_type = '港澳通行证';break;
                        case 3:
                            card_type = '护照';break;
                        case 4:
                            card_type = '台湾居民来往大陆通行证';break;
                        case 5:
                            card_type = '其他';break;
                    }
                    switch(sex_id){
                        case 1:
                            sex = '男';break;
                        case 2:
                            sex = '女';break;
                    }
                    switch(nationality_id){
                        case 1:
                            nationality = '中国';break;
                        case 2:
                            nationality = '中国香港';break;
                        case 3:
                            nationality = '中国澳门';break;
                        case 4:
                            nationality = '中国台湾省';break;
                        case 5:
                            nationality = '其他';break;
                    }
                    if(experience === '') {
                        experience1 = 0;
                        experience2 = 0;
                        experience3 = 0;
                        experience4 = 0;
                    }else{
                        experience = experience.split(',');
                        experience1 = experience[0];
                        experience2 = experience[1];
                        experience3 = experience[2];
                        experience4 = experience[3];
                    }
                    global.invest.investInfo = {
                        id: global.user.userData.id,
                        sex_id: result.data.sex,
                        sex: sex,
                        mobile: global.user.userData.account,
                        truename: result.data.truename,
                        card_id: result.data.card_type,
                        card_type: card_type,
                        card_num: result.data.card_num,
                        card_img_front: result.data.card_img_front,
                        card_img_back: result.data.card_img_back,
                        birth_time: result.data.birth_time,
                        nationality_id: result.data.nationality,
                        nationality: nationality,
                        profession: result.data.profession,
                        business: result.data.business,
                        assets: result.data.assets,
                        assets_img: result.data.assets_img,
                        experience: result.data.experience,
                        experience1: experience1,
                        experience2: experience2,
                        experience3: experience3,
                        experience4: experience4,
                        experience_img: result.data.experience_img,
                        control_people: result.data.control_people,
                        beneficiary: result.data.beneficiary,
                        beneficiary_desc: result.data.beneficiary_desc,
                        bad_record: result.data.bad_record,
                        special_img: result.data.special_img,
                        special_type: result.data.special_type,
                        editable: global.invest.investInfo.editable,
                    };
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                // console.log(error);
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    onPushNavigator = (compent, back_msg) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            back_msg: back_msg,
            is_investor: this.state.is_investor,
            fund_id: this.state.fund_id,
            onCallBack:()=>{
                this.loadInvestData();
            }
        })
    }

    toWebview = (link, compent) => {
        const { navigate } = this.props.navigation;
        navigate(compent, {
            link: link,
        })
    }

    chengnuoshu = () => {
        let url = NetApi.get_info_page;
        let data = {
            id: 71,
        }
        Services.Post(url, data, true)
            .then( result => {
                if (result && result.code === 1) {
                    console.log(result);
                    this.toWebview(result.data, 'NewsWebDetail');
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                // console.log(error);
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    pushToSuccess = (compent, order_id) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            fene: this.state.fene,
            money:  this.state.money,
            rate_money: this.state.rate_money,
            total_money: this.state.total_money,
            order_id: order_id,
            fund_id: this.state.fund_id,
            fundDetailBankTitle: this.state.fundDetailBankTitle,
            fundDetailBankName: this.state.fundDetailBankName,
            fundDetailBankNum: this.state.fundDetailBankNum,
            open_day: this.state.open_day,
        })
    }

    setTongyi = () => {
        this.setState({
            isTongyi: !this.state.isTongyi,
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
        Services.Post(url, data, true)
            .then( result => {
                console.log(result);
                if (result && result.code === 1) {
                    console.log(result);
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
        let url = NetApi.apply_buy_fund;
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

        if(this.state.is_pay_auth === 1){
            if(!this.state.fene){
                Toast.toastShort('请填写基金购买金额！');
                return false;
            }
            if(this.state.isTongyi){
                Services.Post(url, data, true)
                    .then( result => {
                        console.log(result);
                        if (result && result.code === 1) {
                            // console.log(result);
                            Toast.toastShort(result.msg);
                            this.pushToSuccess('Tijiaochenggong', result.data);
                        }else{
                            Toast.toastShort(result.msg);
                        }
                    })
                    .catch( error => {
                        // console.log(error);
                        Toast.toastShort('服务器请求失败，请稍后重试！');
                    })
            }else{
                Toast.toastShort('请先同意以上协议！');
            }
        }else{
            Toast.toastShort(this.state.is_pay_auth_msg);
        }
            
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
                    title = {'认申购'}
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
                    <View style={[GlobalStyle.whiteModule, {padding: 15,}]}>
                        <Text style={styles.tishi}>提示：按照监管部门规定，购买私募基金前请您先进行以下操作：</Text>
                        <View style={styles.pingguItem}>
                            {this.invest()}
                            {this.yinhangka()}
                            {this.pinggu()}
                        </View>                            
                    </View>

                    <View style={[GlobalStyle.whiteModule, {padding: 15 }]}>
                        <View style={styles.shengoujia}>
                            <View style={styles.shengoufene}>
                                <TextInput
                                    placeholder={'请填写申购份额'}
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
                                    <Text style={styles.jinebkrightline}>认申购价款：{this.state.money}</Text>
                                    <Text style={styles.jinebkrightline}>认申购费用：{this.state.rate_money}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart, {marginTop: 20}]}>
                            {this.state.isTongyi ?
                                <TouchableOpacity onPress={() => {this.setTongyi()}} style={[GlobalStyle.checkboxLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                    <Image source={require('../../assets/images/icons/icon_gouxuan.png')} style={[GlobalStyle.gouxuanIco]} />
                                </TouchableOpacity>
                            : 
                                <TouchableOpacity onPress={() => {this.setTongyi()}} style={[GlobalStyle.checkboxLeft, {borderColor: '#666', }]}></TouchableOpacity> 
                            }
                            <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'JijinHetong')}} style={[styles.tongyiright]}>
                                <Text style={styles.orderText}>我已阅读
                                <Text style={[styles.orderText,  styles.xiahuaxian, {color: GlobalStyle.themeColor}]}>基金合同、投资者承诺书、投资告知书、申购提示书、赎回提示书等，</Text>
                                清楚并认可上述文件告知内容，并愿意自行承担由此可能导致的一切风险和损失。</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.zhanghu}>
                            <Text style={[styles.orderText, {marginBottom: 8}]}>订单提交后，请于{this.state.open_day}下午15点前，使用绑定的银行卡（尾号{global.user.userData.bank_num}）将合计金额汇款至募集账户——</Text>
                            <Text style={[styles.orderText, styles.textWeight, {color: GlobalStyle.themeColor}]}>银行户名：{this.state.fundDetailBankTitle}</Text>
                            <Text style={[styles.orderText, styles.textWeight, {color: GlobalStyle.themeColor}]}>开户行：{this.state.fundDetailBankName}</Text>
                            <Text style={[styles.orderText, styles.textWeight, {color: GlobalStyle.themeColor}]}>银行账号：{this.state.fundDetailBankNum}</Text>
                        </View>
                    </View>

                </ScrollView>
                    
                <View style={styles.botBar}>
                    <TouchableOpacity onPress={()=>{RouterHelper.navigate('', 'Jisuanqi')}} style={styles.botLeft}>
                        <Image source={require('../../assets/images/icons/icon_shouyi.png')} style={[styles.botLeftIco, {width: 24*96/100}]} />
                        <Text style={styles.botLeftText}>收益计算</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.submit()}} style={styles.botRight}>
                        <Text style={styles.botRightText}>提交</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }

    invest = () => {
        // console.log(this.state.is_investor);
        if(this.state.is_investor === -2){
            global.invest.investInfo.editable = true;
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Renzheng');Toast.toastShort(this.state.back_msg)}} style={[GlobalStyle.userlist, styles.pingguList]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>专业投资者认证</Text>
                        <Text style={[styles.userlistRightText, {color: '#f00'}]}>{this.state.investor_msg}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }else if(this.state.is_investor === -1){
            global.invest.investInfo.editable = true;
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Renzheng',this.state.back_msg)}} style={[GlobalStyle.userlist, styles.pingguList]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>专业投资者认证</Text>
                        <Text style={[styles.userlistRightText, {color: '#f00'}]}>{this.state.investor_msg}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }else if(this.state.is_investor === 0){
            global.invest.investInfo.editable = true;
            if(global.invest.investInfo.special_type > -1){
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'RenzhengType')}} style={[GlobalStyle.userlist, styles.pingguList]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>专业投资者认证</Text>
                            <Text style={styles.userlistRightText}>{this.state.investor_msg}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'RenzhengType')}} style={[GlobalStyle.userlist, styles.pingguList]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>专业投资者认证</Text>
                            <Text style={styles.userlistRightText}>{this.state.investor_msg}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }
        }else if(this.state.is_investor === 1){
            global.invest.investInfo.editable = false;
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Renzheng');Toast.toastShort(this.state.back_msg)}} style={[GlobalStyle.userlist, styles.pingguList]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>专业投资者认证</Text>
                            <Text style={styles.userlistRightText}>{this.state.investor_msg}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }else if(this.state.is_investor === 2){
            global.invest.investInfo.editable = false;
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Renzheng');Toast.toastShort(this.state.back_msg)}} style={[GlobalStyle.userlist, styles.pingguList]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>专业投资者认证</Text>
                            <Text style={[styles.userlistRightText, {color: '#f00'}]}>{this.state.investor_msg}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }            
            
    }

    yinhangka = () => {
        // console.log(this.state.is_risk);
        if(this.state.is_pay_auth === -1){
            if(this.state.is_investor === 0){
                return (
                    <TouchableOpacity onPress={() => {Toast.toastShort(this.state.is_pay_auth_msg);RouterHelper.navigate('', 'RenzhengType')}} style={[GlobalStyle.userlist, styles.pingguList]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>绑定银行借记卡</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_bank_card === 1 ? '已绑定' : '未绑定'}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => {Toast.toastShort(this.state.is_pay_auth_msg);RouterHelper.navigate('', 'Renzheng')}} style={[GlobalStyle.userlist, styles.pingguList]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>绑定银行借记卡</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_bank_card === 1 ? '已绑定' : '未绑定'}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }
        }else{
            if(this.state.is_bank_card === 1){
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Yinhangka')}} style={[GlobalStyle.userlist, styles.pingguList]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>绑定银行借记卡</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_bank_card === 1 ? '已绑定' : '未绑定'}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Yinhangka')}} style={[GlobalStyle.userlist, styles.pingguList]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>绑定银行借记卡</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_bank_card === 1 ? '已绑定' : '未绑定'}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }
                
        }
    }

    pinggu = () => {
        if(this.state.is_pay_auth === -2){
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Pinggu')}} style={[GlobalStyle.userlist, styles.pingguList]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>技能认证</Text>
                        <Text style={[styles.userlistRightText, {color: '#f00'}]}>{this.state.is_risk === 1 ? '已通过' : '未通过'}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }else{
            if(this.state.is_risk === 0){
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Pinggu')}} style={[GlobalStyle.userlist, styles.pingguList]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>技能认证</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_risk === 1 ? '已通过' : '未评估'}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }else if(this.state.is_risk === 1){
                return (
                    <View style={[GlobalStyle.userlist, styles.pingguList]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext, styles.renzhengText]}>技能认证</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_risk === 1 ? '已通过' : '未通过'}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </View>
                )
            }
        }
            
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
        color: '#585858',
    },
    textWeight: {
        fontWeight: 'bold'
    },
    xiahuaxian: {
        textDecorationLine: 'underline'
        // borderBottomWidth: 1,
        // borderBottomColor: GlobalStyle.themeColor
    },
    tishi: {
        color: GlobalStyle.themeColor,
        fontSize: 11.5,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    pingguItem: {

    },
    pingguList: {
        borderWidth: 1,
        borderColor: '#f2f2f2',
        marginTop: 10,
        borderRadius: 5
    },
    renzhengText: {
        color: GlobalStyle.themeColor,
        fontWeight: 'bold'
    },
    botBar: {
        height: 54,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#ececec',
        borderTopWidth: 1,

    },
    botLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botLeftIco: {
        height: 24,

    },
    botLeftText: {
        fontSize: 13,
        color: '#666',
        height: 20,
        lineHeight: 20,
    },
    botRight: {
        flex: 2.5,
        backgroundColor: GlobalStyle.themeColor,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',

    },
    botRightText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
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
    tongyi: {
        marginTop: 15,
        width: GlobalStyle.width - 30,
        height: 60,
    },
    tongyileft: {
        width: 18,
        marginRight: 6,
        height: 60,
    },
    tongyikuang: {
        width: 18,
        height: 18,
        borderWidth: 1.5,
        borderColor: '#ececec',
        borderRadius: 4,
        marginTop: 2,
    },
    tongyidagou: {
        display: 'none',
    },
    tongyiright: {
        flex: 1,
    },
    orderText: {
        fontSize: 12.5,
        color: '#666',
        lineHeight: 20
    },
    zhanghu: {
        marginTop: 20
    },
});
