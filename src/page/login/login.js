/**
 * 云技师 - Login
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
import {VerticalLine} from "../../component/common/CommonLine";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobile: '15066886007',
            password: '123123',
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        let timers = [this.timer];
        ClearTimer(timers);
    }

    doLogin = async () => {
        let url = ServicesApi.login;
        let {mobile, password} = this.state;

        if (!Tool.checkMobile(mobile)) {
            return;
        }
        if (!Tool.checkPassword(password)) {
            return false;
        }

        let data = {
            telephone: mobile,
            password: password,
        };
        let result = await Services.Post(url, data, true);
        if (result) {
            if (result.code == 1) {
                Toast.toastShort('登录成功');
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
        const {params} = this.props.navigation.state;
        const pageTitle = params && params.pageTitle ? params.pageTitle : '会员登录';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{
                        backgroundColor: GlobalStyle.bgColor,
                    }}
                    leftButton={null}
                />
                <View style={styles.loginWrap}>
                    <View style={styles.loginView}>
                        <Image
                            source={Images.img_logo}
                            style={styles.loginIconStyle}
                        />
                    </View>
                    <View style={styles.inputCellWrap}>
                        <View style={styles.cellItem}>
                            <View style={styles.cellRight}>
                                <TextInput
                                    placeholder="请输入用户名"
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
                                    placeholder="请输入密码"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    maxLength={16}
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
                    </View>
                    <TouchableOpacity
                        onPress={this.doLogin}
                        style={styles.btn}
                    >
                        <Text style={styles.btnName}>登录</Text>
                    </TouchableOpacity>
                    <View style={styles.loginBotView}>
                        <TouchableOpacity
                            style={styles.loginBotItemView}
                            onPress={() => RouterHelper.navigate('注册账号', 'Register')}
                        >
                            <Text style={styles.loginBtnText}>注册账号</Text>
                        </TouchableOpacity>
                        <VerticalLine lineStyle={styles.verLine}/>
                        <TouchableOpacity
                            style={styles.loginBotItemView}
                            onPress={() => RouterHelper.navigate('忘记密码', 'RetrievePassword')}
                        >
                            <Text style={styles.loginBtnText}>忘记密码</Text>
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
    verLine: {
        height: 15,
        marginHorizontal: 10,
        backgroundColor: '#333',
    },
    loginBtnText: {
        color: '#3B3B3B',
        fontSize: 15,
        textAlign: 'center'
    },
});
