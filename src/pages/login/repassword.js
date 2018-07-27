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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

export default class Repassword extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            isRenzheng: 0, //是否是认证投资者    在获取短信验证码的时候传回来一个参数，比如说code=2的时候就动态添加一个输入证件号的输入框
            seconds: 60,
            mobile:'',
            passwd:'',
            passwdd:'',
            code:'',
            codeAlreadySend: false,
            cardShow: false,
            card_num: '',
        }
    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        if(this.props.navigation.goBack()){
            this.props.navigation.goBack();
        }else{
            RouterHelper.navigate('', 'Home');
        }
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

    

    doRepassword = () => {
        let url = NetApi.forget,
            mobile = this.state.mobile,
            code = this.state.code,
            password = this.state.passwd;
            // relpassword = this.state.passwdd,
            // card_num = this.state.card_num;

        if (mobile === '') {
            Toast.toastShort('手机号不能为空');
            return false;
        }
        if (!(/^1[34578]\d{9}$/.test(mobile))){
            Toast.toastShort('手机号格式不正确');
            return;
        }
        if (code === '') {
            Toast.toastShort('手机验证码不能为空');
            return false;
        }
        if (password === '' ) {
            Toast.toastShort('密码不能为空');
            return false;
        }
        // else if(password !== relpassword){
        //     Toast.toastShort('两次输入密码不一致');
        //     return false;
        // }

        // if(this.state.cardShow){
        //     if (card_num === '') {
        //         Toast.toastShort('证件号不能为空');
        //         return false;
        //     }
        //     let data = {
        //         mobile: mobile,
        //         mobile_code: code,
        //         new_pwd: password,
        //         card_num: card_num,
        //     };
        //     Services.Post(url, data)
        //         .then( result => {
        //             // console.log(result.code);
        //             if (result && result.code === 1) {
        //                 Toast.toastShort('重置密码成功');
        //                 this.onBack();
        //             }else{
        //                 Toast.toastShort(result.msg);
        //             }
        //         })
        //         .catch( error => {
        //             Toast.toastShort('服务器请求失败，请稍后重试！');
        //         })
        // }
        // else{
            let data = {
                telephone: mobile,
                code: code,
                password: password,
            };
            Services.Post(url, data)
                .then( result => {
                    // console.log(result.code);
                    if (result && result.code === 1) {
                        Toast.toastShort('重置密码成功');
                        this.onBack();
                    }else{
                        Toast.toastShort(result.msg);
                    }
                })
                .catch( error => {
                    Toast.toastShort('服务器请求失败，请稍后重试！');
                })
        // }

            
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
            type: 'find'
        };
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    this.countDownTimer();
                    Toast.toastShort('验证码已发送，请注意查收！');
                }else if (result && result.code === 2) {
                    this.updateState({
                        cardShow: true
                    })
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
                            <Text style={styles.topTitlea}>找回密码</Text>
                        </View>
                        <TouchableOpacity onPress={() => {this.onBack()}} style={styles.loginback}>
                            <Image source={Images.icon_angle_left_grey} style={styles.loginbackico} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginwrap}>
                        <View style={styles.loginlogo}>
                            <Image source={Images.image_login_logo} style={styles.loginlogoico} />
                        </View>
                        <View style={styles.mcell}>
                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="请输入手机号" keyboardType="numeric" maxLength={11} onChangeText={(text) => {
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
                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="请输入短信验证码" keyboardType="numeric" maxLength={4} onChangeText={(text) => {
                                            this.setState({
                                                code:text
                                            });
                                        }}
                                        style={[styles.cellInput,__IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        placeholderTextColor="#989898"
                                    >
                                    </TextInput>
                                    <View style={styles.mimaright}>
                                        {this.state.codeAlreadySend ?
                                            <View>
                                                {this.state.seconds === 0 ?
                                                    <Text style={styles.forget} onPress={()=>{this.getVerifyCode()}}>重新获取</Text>
                                                    :
                                                    <Text style={styles.forget}>剩余{this.state.seconds}秒</Text>
                                                }
                                            </View>
                                            :
                                            <Text style={styles.forget} onPress={()=>{this.getVerifyCode()}}>获取验证码</Text>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="请输入新密码(长度6-12位)" keyboardType="default" secureTextEntry={true} maxLength={12} onChangeText={(text) => {
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
                            {/*<View style={styles.cellItem}>*/}
                                {/*<View style={styles.cellRight}>*/}
                                    {/*<TextInput placeholder="再次输入新密码" keyboardType="default" secureTextEntry={true} maxLength={12} onChangeText={(text) => {*/}
                                            {/*this.setState({*/}
                                                {/*passwdd:text*/}
                                            {/*});*/}
                                        {/*}}*/}
                                        {/*style={[styles.cellInput,__IOS__ ? null : styles.inputAndroid]} */}
                                        {/*underlineColorAndroid={'transparent'}*/}
                                        {/*placeholderTextColor="#989898"*/}
                                    {/*>*/}
                                    {/*</TextInput>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                            {/*{this.state.cardShow ? */}
                                {/*<View style={styles.cellItem}>*/}
                                    {/*<View style={styles.cellRight}>*/}
                                        {/*<TextInput placeholder="请输入认证投资者时填写的证件号" keyboardType="default" onChangeText={(text) => {*/}
                                                {/*this.setState({*/}
                                                    {/*card_num:text*/}
                                                {/*});*/}
                                            {/*}}*/}
                                            {/*style={[styles.cellInput,__IOS__ ? null : styles.inputAndroid]} */}
                                            {/*underlineColorAndroid={'transparent'}*/}
                                            {/*placeholderTextColor="#989898"*/}
                                        {/*>*/}
                                        {/*</TextInput>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*: null }*/}
                        </View>
                        <TouchableOpacity onPress={()=>this.doRepassword()} style={styles.btn}>
                            <Text style={styles.btna}>立即找回</Text>   
                        </TouchableOpacity>
                        {/*<View style={styles.xieyiwrap}>*/}
                            {/*<Text style={styles.xieyitext}>我已查看并接受</Text>*/}
                            {/*<TouchableOpacity onPress={()=>RouterHelper.navigate('', 'Xieyi')}>*/}
                                {/*<Text style={styles.xieyia}>《用户协议》</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
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
        backgroundColor:"#f5f5f5"
    },
    loginbg:{
        width: GlobalStyle.width,
        height: GlobalStyle.height,
    },
    loginback:{
        position: 'absolute',
        top: 35,
        left: 15,
    },
    loginbackico:{
        margin:5,
        width: 10,
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
        marginBottom: 20,
        display: 'none'
    },
    loginlogoico: {
        width: 120,
        height: 120*203/250
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
        color:'rgba(255,255,255,0.7)',
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
    xieyiwrap:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 12,
        position: 'absolute',
        bottom: 20,
        height: 30,
        width: GlobalStyle.width,
    },
    xieyitext:{
        color: 'rgba(255,255,255,.6)',

    },
    xieyia:{
        color: GlobalStyle.themeColor
    }
});
