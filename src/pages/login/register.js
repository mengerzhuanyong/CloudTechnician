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
import {NavigationActions} from 'react-navigation'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'


import SendSMS from '../../components/common/sendSMS'

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            seconds: 60,
            mobile: '',
            passwd: '',
            passwdd: '',
            code: '',
            codeAlreadySend: false,
            parent_mobile: '',
        }
    }

    componentDidMount() {
        this.loadNetData();
    }

    onBack = () => {
        if (this.props.navigation.goBack()) {
            this.props.navigation.goBack();
        } else {
            RouterHelper.navigate('', 'Home');
        }
    }

    updateState = (state) => {
        if (!this) {
            return
        }
        ;
        this.setState(state);
    }

    loadNetData = () => {

    }

    onPushNavigator = (compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {})
    }

    toWebview = (link, compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            link: link,
        })
    }

    shiyongxieyi = () => {
        let url = NetApi.get_info_page;
        let data = {
            id: 70,
        }
        Services.Post(url, data, true)
            .then(result => {
                if (result && result.code === 1) {
                    console.log(result);
                    this.toWebview(result.data, 'NewsWebDetail');
                } else {
                    Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                // console.log(error);
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    doRegister = () => {
        let url = NetApi.register,
            mobile = this.state.mobile,
            code = this.state.code,
            password = this.state.passwd,
            relpassword = this.state.passwdd,
            parent_mobile = this.state.parent_mobile;

        if (mobile === '') {
            Toast.toastShort('手机号不能为空');
            return false;
        }
        if (!(/^1[34578]\d{9}$/.test(mobile))) {
            Toast.toastShort('手机号格式不正确');
            return;
        }
        if (code === '') {
            Toast.toastShort('手机验证码不能为空');
            return false;
        }
        if (password === '' || relpassword === '') {
            Toast.toastShort('密码不能为空');
            return false;
        } else if (password !== relpassword) {
            Toast.toastShort('两次输入密码不一致');
            return false;
        }

        let data = {
            telephone: mobile,
            code: code,
            password: password,
            repassword: relpassword
        };
        Services.Post(url, data)
            .then(result => {
                // console.log(result);
                if (result && result.code === 1) {
                    Toast.toastShort('注册成功');
                    let user = result.data;

                    this.updateState({
                        user: user.token
                    });

                    storage.save({
                        key: 'loginState',
                        data: {
                            token: user.token,
                        },
                    });

                    global.user = {
                        loginState: true,
                        userData: {
                            token: user.token,
                        }
                    };

                    // console.log(global.user);

                    setTimeout(() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'TabNavScreen'})
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)
                    }, 100)
                } else {
                    Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                // Toast.toastShort(result.msg);
                Toast.toastShort('服务器请求失败，请稍后重试！'+error);
            })
    }

    getVerifyCode = () => {
        let url = NetApi.sendSMS,
            mobile = this.state.mobile;

        if (mobile === '') {
            Toast.toastShort('手机号不能为空');
            return false;
        }
        if (!(/^1[34578]\d{9}$/.test(mobile))) {
            Toast.toastShort('手机号格式不正确');
            return;
        }

        let data = {
            mobile: mobile,
            type: ''
        };
        Services.Post(url, data)
            .then(result => {
                if (result && result.code === 1) {
                    this.countDownTimer();
                    Toast.toastShort('验证码已发送，请注意查收！');
                } else {
                    Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    // 验证码倒计时
    countDownTimer() {
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

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent={true}
                    barStyle={'light-content'}
                />
                <KeyboardAwareScrollView>
                    <View style={styles.logintop}>
                        <Image style={styles.loginbg}/>
                        <View style={styles.topTitle}>
                            <Text style={styles.topTitlea}>会员注册</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.onBack()
                        }} style={styles.loginback}>
                            <Image source={require('../../assets/images/icons/icon_angle_left_grey.png')}
                                   style={styles.loginbackico}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginwrap}>
                        <View style={styles.loginlogo}>
                            <Image source={require('../../assets/images/images/image_login_logo.png')}
                                   style={styles.loginlogoico}/>
                        </View>
                        <View style={styles.mcell}>
                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="请输入手机号" keyboardType="numeric" maxLength={11}
                                               onChangeText={(text) => {
                                                   this.setState({
                                                       mobile: text
                                                   });
                                               }}
                                               style={[styles.cellInput, __IOS__ ? null : styles.inputAndroid]}
                                               underlineColorAndroid={'transparent'}
                                               placeholderTextColor="#989898"
                                    >
                                    </TextInput>
                                </View>
                            </View>
                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="请输入短信验证码" keyboardType="numeric" maxLength={4}
                                               onChangeText={(text) => {
                                                   this.setState({
                                                       code: text
                                                   });
                                               }}
                                               style={[styles.cellInput, __IOS__ ? null : styles.inputAndroid]}
                                               underlineColorAndroid={'transparent'}
                                               placeholderTextColor="#989898"
                                    >
                                    </TextInput>
                                    <View style={styles.mimaright}>
                                        {this.state.codeAlreadySend ?
                                            <View>
                                                {this.state.seconds === 0 ?
                                                    <Text style={styles.forget} onPress={() => {
                                                        this.getVerifyCode()
                                                    }}>重新获取</Text>
                                                    :
                                                    <Text style={styles.forget}>剩余{this.state.seconds}秒</Text>
                                                }
                                            </View>
                                            :
                                            <Text style={styles.forget} onPress={() => {
                                                this.getVerifyCode()
                                            }}>获取验证码</Text>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="请输入密码(长度6-12位)" keyboardType="default"
                                               secureTextEntry={true} maxLength={12} onChangeText={(text) => {
                                        this.setState({
                                            passwd: text
                                        });
                                    }}
                                               style={[styles.cellInput, __IOS__ ? null : styles.inputAndroid]}
                                               underlineColorAndroid={'transparent'}
                                               placeholderTextColor="#989898"
                                    >
                                    </TextInput>
                                </View>
                            </View>

                            <View style={styles.cellItem}>
                                <View style={styles.cellRight}>
                                    <TextInput placeholder="再次输入密码" keyboardType="default" secureTextEntry={true} maxLength={12} onChangeText={(text) => {
                                        this.setState({
                                            passwdd:text
                                        });
                                    }}
                                               style={[styles.cellInput,__IOS__ ? null : styles.inputAndroid]}
                                               underlineColorAndroid={'transparent'}
                                               placeholderTextColor="#989898"
                                    >
                                    </TextInput>
                                </View>
                            </View>

                            <View style={styles.cellItemnomarginbottom}>
                                <Text style={styles.cellLeft}>注册后表示您同意</Text>
                                <TouchableOpacity onPress={() => this.shiyongxieyi()}>
                                    <Text style={styles.cellrightnoborer}>《用户使用协议》</Text>
                                </TouchableOpacity>
                            </View>

                            {/*<View style={styles.cellItem}>*/}
                            {/*<View style={styles.cellRight}>*/}
                            {/*<TextInput placeholder="再次输入密码" keyboardType="default" secureTextEntry={true} maxLength={12} onChangeText={(text) => {*/}
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
                            {/*<View style={styles.cellItem}>*/}
                            {/*<View style={styles.cellRight}>*/}
                            {/*<TextInput placeholder="请输入邀请人手机号(选填)" keyboardType="numeric" maxLength={11} onChangeText={(text) => {*/}
                            {/*this.setState({*/}
                            {/*parent_mobile:text*/}
                            {/*});*/}
                            {/*}}*/}
                            {/*style={[styles.cellInput,__IOS__ ? null : styles.inputAndroid]} */}
                            {/*underlineColorAndroid={'transparent'}*/}
                            {/*placeholderTextColor="#989898"*/}
                            {/*>*/}
                            {/*</TextInput>*/}
                            {/*</View>*/}
                            {/*</View>*/}
                        </View>

                        <TouchableOpacity onPress={() => this.doRegister()} style={styles.btn}>
                            <Text style={styles.btna}>立即注册</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.xieyiwrap} onPress={() => {
                            this.onBack()
                        }}>
                                <Text style={styles.xieyitext}>已有账号，立即登录>></Text>
                        </TouchableOpacity>
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
    logintop: {
        width: GlobalStyle.width,
        height: GlobalStyle.height,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#f5f5f5'
    },
    loginbg: {
        width: GlobalStyle.width,
        height: GlobalStyle.height,
    },
    loginback: {
        position: 'absolute',
        top: 35,
        left: 15,
    },
    loginbackico: {
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
    loginwrap: {
        marginTop: 100,
        backgroundColor: 'transparent',
        position: 'relative',
        height: GlobalStyle.height - 100,
    },
    loginlogo: {
        position: 'relative',
        width: 120,
        marginLeft: (GlobalStyle.width - 120) / 2,
        marginBottom: 20,
        display: 'none'
    },
    loginlogoico: {
        width: 120,
        height: 120 * 203 / 250
    },
    mcell: {
        position: 'relative',
        zIndex: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    cellItem: {
        overflow: 'hidden',
        borderRadius: 5,
        position: 'relative',
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cellLeft: {
        marginLeft: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftico: {
        width: 28,
        height: 28,
    },
    cellRight: {
        height: 45,
        width: GlobalStyle.width - 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'rgba(152, 152, 152, 0.3)',
        borderBottomWidth: 1,
    },
    cellInput: {
        height: 45,
        fontSize: 15,
        textAlign: 'left',
        color: '#585858',
        width: GlobalStyle.width - 30,
    },
    btn: {
        backgroundColor: '#597290',
        width: GlobalStyle.width - 30,
        overflow: 'hidden',
        height: 48,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    btna: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    loginbot: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: GlobalStyle.width,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20
    },
    botleft: {
        marginRight: 20
    },
    botright: {
        marginLeft: 20
    },
    bottext: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center'
    },
    botmid: {
        flex: 1,
    },
    guangguang: {
        alignItems: 'center',
        marginTop: 20,
    },
    guangguanga: {
        fontSize: 15
    },
    mimaright: {
        position: 'absolute',
        right: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forget: {
        lineHeight: __IOS__ ? 30 : 25,
        height: 30,
        color: GlobalStyle.themeColor,
        fontSize: 14,
    },
    xieyiwrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        position: 'absolute',
        bottom: 20,
        height: 30,
        width: GlobalStyle.width,
    },
    xieyitext: {
        color: '#3B3B3B',

    },
    xieyia: {
        color: GlobalStyle.themeColor
    },
    cellrightnoborer: {
        height: 45,
        width: GlobalStyle.width - 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: GlobalStyle.themeColor
    },
    cellItemnomarginbottom: {
        overflow: 'hidden',
        borderRadius: 5,
        position: 'relative',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    xieyiwrapheight: {
        height:50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        position: 'absolute',
        bottom: 20,
        height: 30,
        width: GlobalStyle.width,
    },
});
