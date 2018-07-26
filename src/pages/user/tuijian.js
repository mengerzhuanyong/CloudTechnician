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

export default class Tuijian extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            reg_count: '',
            bank_count: '',
            first_money: '',
            total_person_price: '',
            person_price: '',
        }
    }

    async componentWillMount(){
        try {
            await this.loadNetData();
        } catch (error) {
            // // console.log(error);
        }

    }

    componentDidMount(){
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        let url = NetApi.get_team_info;
        let data = {
            member_id: global.user.userData.id,
            token: global.user.userData.token
        }

        Services.Post(url, data, true)
            .then( result => {
                if (result && result.code === 1) {
                    console.log(result.data);
                    this.updateState({
                        reg_count: result.data.reg_count,
                        bank_count: result.data.bank_count,
                        first_money: result.data.first_money,
                        total_person_price: result.data.total_person_price,
                        person_price: result.data.person_price,
                    })
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

    render(){
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'推荐'}
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
                <View style={GlobalStyle.userNeiTop}>
                    <Text style={GlobalStyle.userNeiTopline1}>累计人脉价值</Text>
                    <Text style={GlobalStyle.userNeiTopline2}>{this.state.total_person_price}</Text>
                    <Text style={GlobalStyle.userNeiTopline3}>本月人脉价值：{this.state.person_price}</Text>
                </View>

                <View style={[GlobalStyle.whiteModule, {marginTop: 0}]}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'TuijianZhuce')}} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={require('../../assets/images/icons/icon_user_huiyuan.png')} style={GlobalStyle.usericon} />
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>推荐注册人数</Text>
                            <Text style={styles.userlistRightText}>{this.state.reg_count}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'TuijianBangka')}} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={require('../../assets/images/icons/icon_user_zichan.png')} style={GlobalStyle.usericon} />
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>银行卡绑定人数</Text>
                            <Text style={styles.userlistRightText}>{this.state.bank_count}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'TuijianShoutou')}} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={require('../../assets/images/icons/icon_user_shangcheng.png')} style={GlobalStyle.usericon} />
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>被邀请人首投金额</Text>
                            <Text style={styles.userlistRightText}>{this.state.first_money}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>    
                </View>

                <View style={[GlobalStyle.whiteModule, {marginTop: 0, paddingBottom: 10, paddingTop: 10, backgroundColor: GlobalStyle.bgColor}]}>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Erweima')}} style={[GlobalStyle.userlist, {backgroundColor: '#fff'}]}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={require('../../assets/images/icons/icon_user_huiyuan.png')} style={GlobalStyle.usericon} />
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>推荐给好友</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
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
    userlistRightText: {
        position: 'absolute',
        right: 20,
        color: GlobalStyle.themeColor,
    },
});
