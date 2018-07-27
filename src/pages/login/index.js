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
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            user: '',
            mobile:'',
            passwd:'',
            loginState: '',
            seconds: 60,
            code:'',
            codeAlreadySend: false,
        }
    }

    // async componentWillMount(){
    //     try {
    //         let result = await storage.load({
    //             key: 'loginState',
    //         });
    //         const resetAction = NavigationActions.reset({
    //             index: 0,
    //             actions: [
    //                 NavigationActions.navigate({ routeName: 'TabNavScreen'})
    //             ]
    //         });
    //         this.props.navigation.dispatch(resetAction);
    //     } catch (error) {
    //         // // console.log(error);
    //     }

    // }

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

    doLogin = () => {
        let url = NetApi.login,
            mobile = this.state.mobile,
            // code = this.state.code,
            password = this.state.passwd;

        // setTimeout(() => {
        //     const resetAction = NavigationActions.reset({
        //         index: 0,
        //         actions: [
        //             NavigationActions.navigate({ routeName: 'TabNavScreen'})
        //         ]
        //     })
        //     this.props.navigation.dispatch(resetAction)
        //     RouterHelper.navigate('', 'Home')
        // }, 500)

        if (mobile === '') {
            Toast.toastShort('手机号不能为空');
            return false;
        }
        // if (code === '') {
        //     Toast.toastShort('手机验证码不能为空');
        //     return false;
        // }
        if (password === '') {
            Toast.toastShort('密码不能为空');
            return false;
        }

        let data = {
            telephone: mobile,
            // mobile_code: code,
            password: password,
        };
        Services.Post(url, data, true)
            .then( result => {
                console.log(result.code);
                if (result && result.code === 1) {
                    // console.log(result);

                    Toast.toastShort('登录成功')
                    let user = result.data;

                    this.updateState({
                        user: user.token
                    });

                    storage.save({
                        key: 'loginState',
                        data: {
                            id: user.member_id,
                            account: user.account,
                            nickname: user.nickname,
                            head_img: user.head_img,
                            sex: user.sex,
                            integral: user.integral,
                            money: user.money,
                            email: user.email,
                            addr: user.addr,
                            bank_num: user.bank_num,
                            is_investor: user.is_investor,
                            investor_msg: user.investor_msg,
                            back_msg: user.back_msg,
                            special_type: user.special_type,
                            is_risk: user.is_risk,
                            is_bank_card: user.is_bank_card,
                            is_modify_truename: user.is_modify_truename,
                            is_special_investor: user.is_special_investor,
                            is_pay_auth: user.is_pay_auth,
                            is_pay_auth_msg: user.is_pay_auth_msg,
                            token: user.token,
                        },
                    });

                    global.user = {
                        loginState: true,
                        userData: {
                            id: user.member_id,
                            account: user.account,
                            nickname: user.nickname,
                            head_img: user.img_url,
                            sex: user.sex,
                            integral: user.integral,
                            money: user.money,
                            email: user.email,
                            addr: user.addr,
                            bank_num: user.bank_num,
                            is_investor: user.is_investor,
                            investor_msg: user.investor_msg,
                            back_msg: user.back_msg,
                            special_type: user.special_type,
                            is_risk: user.is_risk,
                            is_bank_card: user.is_bank_card,
                            is_modify_truename: user.is_modify_truename,
                            is_special_investor: user.is_special_investor,
                            is_pay_auth: user.is_pay_auth,
                            is_pay_auth_msg: user.is_pay_auth_msg,
                            token: user.token,
                        }
                    };

                    // console.log(global.user);

                    setTimeout(() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'TabNavScreen'})
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)
                    }, 500)
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    getVerifyCode = () => {
        let url = NetApi.sendSMS,
            mobile = this.state.mobile;

        if (mobile === '') {
            Toast.toastShort('手机号不能为空');
            return false;
        }
        if (!(/^1[34578]\d{9}$/.test(mobile))){
            Toast.toastShort('手机号格式不正确');
            return;
        }

        let data = {
            mobile: mobile,
            type: 'login'
        };
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    this.countDownTimer();
                    Toast.toastShort('验证码已发送，请注意查收！');
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    // 验证码倒计时
    countDownTimer(){
        this.setState({
            codeAlreadySend: true,
            seconds: 60,
        })
        this.timerInterval = setInterval(() => {
            if (this.state.seconds === 0) {
                return clearInterval(this.timerInterval);
            }

            this.setState({
                seconds: this.state.seconds - 1
            });
        }, 1000)
    }


    render(){
        return (
            <View style={styles.container}>
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'light-content'}
                />
                <KeyboardAwareScrollView>
                    <View style={styles.logintop}>
                        <Image  style={styles.loginbg} />
                        <View style={styles.topTitle}>
                            <Text style={styles.topTitlea}>会员登录</Text>
                        </View>
                        <TouchableOpacity onPress={() => {this.onBack()}} style={styles.loginback}>
                            <Image source={Images.icon_close} style={styles.loginbackico} />
                        </TouchableOpacity>
                        {(!global.user.loginState && !global.user.guangguang) ? null :
                            <TouchableOpacity onPress={() => {this.onBack()}} style={styles.loginback}>
                                <Image source={Images.icon_close} style={styles.loginbackico} />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.loginwrap}>
                        <View style={styles.loginlogo}>
                            <Image source={Images.image_login_logo} style={styles.loginlogoico} />
                        </View>
                        <View style={styles.mcell}>
                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="请输入用户名/手机号" keyboardType="numeric" maxLength={11} onChangeText={(text) => {
                                            this.setState({
                                                mobile:text
                                            });
                                        }}
                                        style={[styles.cellInput,__IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        placeholderTextColor="#989898"
                                    >
                                    </TextInput>
                                </View>
                            </View>
                            {/*<View style={styles.cellItem}>*/}
                                {/*<View style={styles.cellRight}>*/}
                                    {/*<TextInput placeholder="请输入短信验证码" keyboardType="numeric" maxLength={4} onChangeText={(text) => {*/}
                                            {/*this.setState({*/}
                                                {/*code:text*/}
                                            {/*});*/}
                                        {/*}}*/}
                                        {/*style={[styles.cellInput,__IOS__ ? null : styles.inputAndroid]}*/}
                                        {/*underlineColorAndroid={'transparent'}*/}
                                        {/*placeholderTextColor="#989898"*/}
                                    {/*>*/}
                                    {/*</TextInput>*/}
                                    {/*<View style={styles.mimaright}>*/}
                                        {/*{this.state.codeAlreadySend ?*/}
                                            {/*<View>*/}
                                                {/*{this.state.seconds === 0 ?*/}
                                                    {/*<Text style={styles.forget} onPress={()=>{this.getVerifyCode()}}>重新获取</Text>*/}
                                                    {/*:*/}
                                                    {/*<Text style={styles.forget}>剩余{this.state.seconds}秒</Text>*/}
                                                {/*}*/}
                                            {/*</View>*/}
                                            {/*:*/}
                                            {/*<Text style={styles.forget} onPress={()=>{this.getVerifyCode()}}>获取验证码</Text>*/}
                                        {/*}*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="请输入密码" keyboardType="default" secureTextEntry={true} maxLength={16} onChangeText={(text) => {
                                            this.setState({
                                                passwd:text
                                            });
                                        }}
                                        style={[styles.cellInput,__IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        placeholderTextColor="#989898"
                                    >
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.doLogin()} style={styles.btn}>
                            <Text style={styles.btna}>登录</Text>   
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.doLogin()} style={[styles.guangguang, GlobalStyle.hide]}>
                            <Text style={styles.guangguanga}>先逛逛</Text>   
                        </TouchableOpacity>
                        <View style={styles.loginbot}>
                            <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Register')}} style={styles.botleft}>
                                <Text style={styles.bottext}>注册账号</Text>
                            </TouchableOpacity>
                            <Text>|</Text>
                            <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Repassword')}} style={styles.botright}>
                                <Text style={styles.bottext}>忘记密码</Text>
                            </TouchableOpacity>
                        </View>
                            
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    logintop:{
        width: GlobalStyle.width,
        height: GlobalStyle.height,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor:'#f5f5f5'
    },
    loginbg:{
        width: GlobalStyle.width,
        height: GlobalStyle.height,
        // opacity: .8
    },
    loginback:{
        position: 'absolute',
        top: 35,
        right: 20,
    },
    loginbackico:{
        width: 20,
        height: 20
    },
    topTitle: {
        width: GlobalStyle.width,
        height: 45,
        position: 'absolute',
        top: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topTitlea: {
        backgroundColor: 'transparent',
        color: '#3B3B3B',
        fontSize: 18
    },
    loginwrap:{
        marginTop: 100,
        backgroundColor:'transparent',
        position: 'relative',
        height: GlobalStyle.height-100,
    },
    loginlogo: {
        position: 'relative',
        width: 120,
        marginLeft: (GlobalStyle.width-120)/2,
        marginBottom: 20
    },
    loginlogoico: {
        width: 120,
        height: 120
    },
    mcell:{
        position:'relative',
        zIndex:1,
        marginLeft:15,
        marginRight:15,
    },
    cellItem:{
        overflow:'hidden',
        borderRadius:5,
        position:'relative',
        marginTop:5,
        marginBottom:5,
        display:'flex',
        overflow:'hidden',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    cellLeft:{
        height:45,
        alignItems:'center',
        justifyContent:'center'
    },
    leftico:{
        width:28,
        height:28,
    },
    cellRight:{
        height:45,
        width: GlobalStyle.width - 30,
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'rgba(152, 152, 152, 0.3)',
        borderBottomWidth: 1,
    },
    cellInput:{
        height:45,
        fontSize:15,
        textAlign:'left',
        color:'#585858',
        width: GlobalStyle.width - 30,
    },
    btn:{
        backgroundColor: '#597290',
        width: GlobalStyle.width-30,
        overflow:'hidden',
        height:48,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 15,
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    btna:{
        color:'#fff',
        textAlign:'center',
        fontSize:16,
    },
    loginbot:{
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
        height:30,
        width: GlobalStyle.width,
        flexDirection:'row',
        position: 'absolute',
        bottom: 20
    },
    botleft:{
        marginRight:20
    },
    botright:{
        marginLeft:20
    },
    bottext:{
        color:'#3B3B3B',
        fontSize:15,
        textAlign:'center'
    },
    botmid:{
        flex:1,
    },
    guangguang: {
        alignItems: 'center',
        marginTop: 20,
    },
    guangguanga: {
        fontSize: 15
    },
    mimaright:{
        position:'absolute',
        right:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    forget:{
        lineHeight: __IOS__ ? 30 :25, 
        height:30,
        color: GlobalStyle.themeColor,
        fontSize:14,
    },
});
