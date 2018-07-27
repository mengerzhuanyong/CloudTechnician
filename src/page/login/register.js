/**
 * 云技师 - Register
 * https://menger.me
 * @大梦
 */


'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet, Image, TouchableOpacity, TextInput,
} from 'react-native'

import NavigationBar from '../../component/system/NavigationBar'
import VerificationCode from "../../component/common/VerificationCode";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'register',
            mobile: '15066886007',
            password: '123123',
            rePassword: '123123',
            code: '',
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        let timers = [this.timer];
        ClearTimer(timers);
    }

    doRegister = async () => {
        let url = ServicesApi.register;
        let {mobile, password, rePassword, code} = this.state;

        if (!Tool.checkMobile(mobile)) {
            return;
        }
        if (!Tool.checkPassword(password)) {
            return false;
        }

        let data = {
            code: code,
            telephone: mobile,
            password: password,
            repassword: rePassword,
        };
        let result = await Services.Post(url, data, true);
        if (result) {
            if (result.code == 1) {
                Toast.toastShort('注册成功');
                this.saveUserInfo(result.data);
                this.timer = setTimeout(() => {
                    RouterHelper.reset('', 'Tab');
                }, 1000);
            } else {
                Toast.toastShort(result.msg);
            }
        }
    };

    saveUserInfo = (userInfo) => {
        global.token = userInfo.token;
        StorageManager.save(Constant.USER_INFO_KEY, userInfo);
    };


    render() {
        let {type, mobile} = this.state;
        const {params} = this.props.navigation.state;
        const pageTitle = params && params.pageTitle ? params.pageTitle : '注册';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{
                        backgroundColor: GlobalStyle.bgColor,
                    }}
                />
                <View style={styles.loginWrap}>
                    <View style={styles.inputCellWrap}>
                        <View style={styles.cellItem}>
                            <View style={styles.cellRight}>
                                <TextInput
                                    placeholder="请输入手机号"
                                    keyboardType="numeric"
                                    maxLength={11}
                                    onChangeText={(text) => {
                                        this.setState({
                                            mobile: text
                                        });
                                    }}
                                    style={[styles.cellInput]}
                                    underlineColorAndroid={'transparent'}
                                    placeholderTextColor="#989898"
                                />
                            </View>
                        </View>
                        <View style={styles.cellItem}>
                            <View style={styles.cellRight}>
                                <TextInput
                                    placeholder="请输入短信验证码"
                                    keyboardType="numeric"
                                    maxLength={6}
                                    onChangeText={(text) => {
                                        this.setState({
                                            code: text
                                        });
                                    }}
                                    style={[styles.cellInput]}
                                    underlineColorAndroid={'transparent'}
                                    placeholderTextColor="#989898"
                                />
                                <VerificationCode
                                    type={type}
                                    mobile={mobile}
                                />
                            </View>
                        </View>
                        <View style={styles.cellItem}>
                            <View style={styles.cellRight}>
                                <TextInput
                                    placeholder="请输入密码(长度6-12位)"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    maxLength={12}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text
                                        });
                                    }}
                                    style={[styles.cellInput]}
                                    underlineColorAndroid={'transparent'}
                                    placeholderTextColor="#989898"
                                />
                            </View>
                        </View>

                        <View style={styles.cellItem}>
                            <View style={styles.cellRight}>
                                <TextInput
                                    placeholder="再次输入密码"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    maxLength={12}
                                    onChangeText={(text) => {
                                        this.setState({
                                            rePassword: text
                                        });
                                    }}
                                    style={[styles.cellInput]}
                                    underlineColorAndroid={'transparent'}
                                    placeholderTextColor="#989898"
                                />
                            </View>
                        </View>

                        <View style={styles.protocolView}>
                            <Text style={styles.protocolTitle}>注册后表示您同意</Text>
                            <TouchableOpacity
                                onPress={() => RouterHelper.navigate('用户使用协议', 'CommonWebPage', {url: ''})}
                            >
                                <Text style={styles.protocolValue}>《用户使用协议》</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={this.doRegister}
                        style={styles.btn}
                    >
                        <Text style={styles.btnName}>立即注册</Text>
                    </TouchableOpacity>
                    <View style={styles.loginBotView}>
                        <TouchableOpacity
                            style={styles.loginBotItemView}
                            onPress={() => RouterHelper.goBack()}
                        >
                            <Text style={styles.loginBtnText}>已有账号，立即登录>></Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    loginWrap: {
        flex: 1,
        paddingTop: 30,
        position: 'relative',
    },
    loginView: {
        position: 'relative',
        width: 120,
        marginLeft: (GlobalStyle.width - 120) / 2,
        marginBottom: 20
    },
    loginIconStyle: {
        width: 120,
        height: 120
    },
    inputCellWrap: {
        position: 'relative',
        zIndex: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    cellItem: {
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
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftIcon: {
        width: 28,
        height: 28,
    },
    cellRight: {
        height: 45,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        // width: GlobalStyle.width - 30,
        borderBottomColor: 'rgba(152, 152, 152, 0.3)',
    },
    cellInput: {
        flex: 1,
        height: 45,
        fontSize: 15,
        textAlign: 'left',
        color: '#585858',
        // backgroundColor: '#f60',
        // width: GlobalStyle.width - 30,
    },
    btn: {
        backgroundColor: '#597290',
        width: GlobalStyle.width - 30,
        overflow: 'hidden',
        height: 48,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    btnName: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    loginBotView: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: GlobalStyle.width,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20
    },
    loginBotItemView: {},
    loginBtnText: {
        color: '#3B3B3B',
        fontSize: 15,
        textAlign: 'center'
    },

    protocolView: {
        marginTop: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    protocolTitle: {
        fontSize: 13,
        color: '#585858',
    },
    protocolValue: {
        fontSize: 13,
        color: GlobalStyle.themeColor,
    },
});
