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

export default class AddBank extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            user_name: '',
            bank_number: '',
            bank_telephone: '',
            bank_name: '',
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
        
    }

    getUserInfo = () => {
        let url = NetApi.get_member_info;

        let data = {
            member_id: global.user.userData.id,
        };
        Services.Post(url, data)
            .then( result => {
                // console.log(result.code);
                if (result && result.code === 1) {
                    // console.log(result);
                    let user = result.data;

                    this.updateState({
                        user: user
                    });


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

        })
    }

    Submit = () => {
        let url = NetApi.insert_bank_card+"?token="+global.user.userData.token;
        let data = {
            user_name: this.state.user_name,
            bank_number: this.state.bank_number,
            bank_telephone: this.state.bank_telephone,
            bank_name: this.state.bank_name,
        };

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
                    title = {'添加银行卡'}
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

                <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>真实姓名</Text>
                            <TextInput
                                placeholder={'请填写真实姓名' }
                                onChangeText={(text) => {
                                    this.setState({
                                        user_name: text
                                    })
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', fontSize: 14, color: '#bbbbc1', width: 210}]}
                                underlineColorAndroid={'transparent'}
                            >
                            </TextInput>
                        </View>
                    </View>    
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>银行预留手机号</Text>
                            <TextInput
                                placeholder={'请填写银行预留手机号' }
                                onChangeText={(text) => {
                                    this.setState({
                                        bank_telephone: text
                                    })
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', fontSize: 14, color: '#bbbbc1', width: 210}]}
                                underlineColorAndroid={'transparent'}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>银行卡号</Text>
                            <TextInput
                                placeholder={'请填写银行卡号' }
                                onChangeText={(text) => {
                                    this.setState({
                                        bank_number: text
                                    })
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', fontSize: 14, color: '#bbbbc1', width: 210}]} 
                                underlineColorAndroid={'transparent'}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>开户行名称</Text>
                            <TextInput
                                placeholder={'请填写开户行名称(精确到分支行)' }
                                onChangeText={(text) => {
                                    this.setState({
                                        bank_name: text
                                    })
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', fontSize: 14, color: '#bbbbc1', width: 220}]} 
                                underlineColorAndroid={'transparent'}
                                // multiline={true}
                            >
                            </TextInput>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={()=>this.Submit()} style={[GlobalStyle.submit, {marginBottom: 15}]}>
                    <View style={GlobalStyle.btn}>
                        <Text style={GlobalStyle.btna}>提交</Text>   
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
});
