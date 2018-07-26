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

export default class SetMima extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            user: '',
            oldpassword: '',
            password: '',
            rePassword: '',
        }
    }

    componentDidMount(){
        this.getUserData();
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    getUserData = () => {
        // console.log(global.user);
        if (!global.user.loginState) {
            return;
        }else{
            let { userData, loginState } = global.user;
            this.updateState({
                user: userData,
                loginState: loginState,
            })
        }        
    }

    loadNetData = () => {
        
    }

    submit = () => {
        let { id } = this.state.user;
        let { oldpassword, password, rePassword } = this.state;

        if (!oldpassword) {
            Toast.toastShort('请输入原密码');
            return;
        }
        if (!password) {
            Toast.toastShort('请输入新密码');
            return;
        }
        if (!rePassword) {
            Toast.toastShort('请确认新密码');
            return;
        }
        if (password !== rePassword) {
            Toast.toastShort('两次密码输入不一致，请重新输入！');
            return;
        }

        let url = NetApi.changepass+"?token="+global.user.userData.token;
        let data = {
            password: password,
            old_password: oldpassword,
            repassword:rePassword
        }
        
        Services.Post(url, data)
            .then( result => {
                // console.log(result);
                if (result && result.code === 1) {
                    this.doLogOut();
                }else{
                    Toast.toastShort(result.msg)
                }
            })
            .catch( error => {
                // console.log(error)
            })
    }

    doLogOut = () => {
        let url = NetApi.logout+"?token="+global.user.userData.token;
        Services.Get(url)
            .then( result => {
                // console.log(result);

                if (result && result.code === 1) {
                    Toast.toastShort("修改密码成功，请重新登录！");
                    this.removeLoginState();
                }
            })
            .catch( error => {
                // console.log('退出失败，请重试！', error);
            })

    }

    removeLoginState = () => {
        storage.remove({
            key: 'loginState',
        });
        global.user.loginState = false;
        global.user.userData = '';
        setTimeout(() => {
            this.props.navigation.navigate('Login'); //跳转到用户页面  
        }, 500);
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
                    title = {'修改密码'}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'dark-content'}
                />
                <KeyboardAwareScrollView>
                    <View style={[GlobalStyle.mcell, {marginTop: 0, borderTopWidth: 10, borderTopColor: GlobalStyle.bgColor}]}>
                        <View style={GlobalStyle.cellItem}>
                            <Text style={[GlobalStyle.cellLeft, {width: 100}]}>原密码</Text>
                            <View style={[GlobalStyle.cellRight,GlobalStyle.textRight]}>
                                <TextInput
                                    placeholder={'请输入原密码'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            oldpassword: text
                                        })
                                    }}
                                    style={[GlobalStyle.cellInput,__IOS__ ? null : GlobalStyle.inputAndroid]} 
                                    underlineColorAndroid={'transparent'}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={GlobalStyle.cellItem}>
                            <Text style={[GlobalStyle.cellLeft, {width: 100}]}>新密码</Text>
                            <View style={[GlobalStyle.cellRight,GlobalStyle.textRight]}>
                                <TextInput
                                    placeholder={'请输入新密码'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text
                                        })
                                    }}
                                    style={[GlobalStyle.cellInput,__IOS__ ? null : GlobalStyle.inputAndroid]} 
                                    underlineColorAndroid={'transparent'}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={GlobalStyle.cellItem}>
                            <Text style={[GlobalStyle.cellLeft, {width: 100}]}>确认新密码</Text>
                            <View style={[GlobalStyle.cellRight,GlobalStyle.textRight]}>
                                <TextInput
                                    placeholder={'请确认新密码'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            rePassword: text
                                        })
                                    }}
                                    style={[GlobalStyle.cellInput,__IOS__ ? null : GlobalStyle.inputAndroid]} 
                                    underlineColorAndroid={'transparent'}
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=>this.submit()} style={[GlobalStyle.submit, {marginBottom: 15, marginTop: 10}]}>
                        <View style={GlobalStyle.btn}>
                            <Text style={GlobalStyle.btna}>提交修改</Text>   
                        </View>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {

    }
});
