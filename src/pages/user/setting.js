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
import ActionSheet from 'react-native-actionsheet'

// 弹窗
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '取消', '确认退出']
const title = '您确认要退出吗？'
export default class Setting extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            user: global.user.userData,
            is_investor: params.is_investor,
            investor_msg: params.investor_msg,
            back_msg: params.back_msg,
            is_risk: params.is_risk,
            is_bank_card: params.is_bank_card,
            is_modify_truename: params.is_modify_truename,
            is_special_investor: params.is_special_investor,
            is_pay_auth: params.is_pay_auth,
            is_pay_auth_msg: params.is_pay_auth_msg,
        }
    }

    componentDidMount(){
        // this.loadNetData();
    }

    onBack = () => {
        // this.props.navigation.state.params.onCallBack();
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
        let url = NetApi.get_member_info;

        let data = {
            member_id: global.user.userData.id,
        };
        Services.Post(url, data, true)
            .then( result => {
                // console.log(result.code);
                if (result && result.code === 1) {
                    console.log(result);
                    let user = result.data;

                    this.updateState({
                        user: user
                    });

                    storage.save({
                        key: 'loginState',
                        data: {
                            id: global.user.userData.id,
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
                            token: global.user.userData.token,
                        },
                    });

                    global.user = {
                        loginState: true,
                        userData: {
                            id: global.user.userData.id,
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
                            token: global.user.userData.token,
                        }
                    };

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
            is_investor: this.state.is_investor,
            investor_msg: this.state.investor_msg,
            back_msg: this.state.back_msg,
            is_risk: this.state.is_risk,
            is_bank_card: this.state.is_bank_card,
            is_modify_truename: this.state.is_modify_truename,
            is_special_investor: this.state.is_special_investor,
            is_pay_auth: this.state.is_pay_auth,
            is_pay_auth_msg: this.state.is_pay_auth_msg,
            onCallBack:()=>{
                this.loadNetData();
            }
        })
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    handlePress = (i) => {
        if(i === 1){
            this.doLogOut();
        }
    }

    doLogOut = () => {
        let url = NetApi.logout+"?token="+global.user.userData.token;
        Services.Get(url)
            .then( result => {
                // console.log(result);
                this.removeLoginState();
                if (result && result.code === 0) {
                    Toast.toastShort("退出成功");
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
                    title = {'设置'}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                />
                {/*<StatusBar*/}
                    {/*animated = {true}*/}
                    {/*hidden = {false}*/}
                    {/*backgroundColor = {'transparent'}*/}
                    {/*translucent = {true}*/}
                    {/*barStyle = {'dark-content'}*/}
                {/*/>*/}
                {/*<View style={styles.mtop}>*/}
                    {/*<View style={[styles.minfo, GlobalStyle.flexRowStart]}>*/}
                        {/*{global.user.userData.head_img ?*/}
                            {/*<Image source={{uri: global.user.userData.head_img}} style={styles.mtouxiang} />*/}
                            {/*:*/}
                            {/*<Image source={Images.icon_user_touxiang} style={styles.mtouxiang} />*/}
                        {/*}*/}
                        {/*<Text style={styles.mnicheng}>{global.user.userData.nickname ? global.user.userData.nickname : global.user.userData.account}</Text>*/}
                    {/*</View>*/}
                    {/*{global.user.userData.is_investor === 1 ?*/}
                        {/*<View style={[styles.mshenfen, GlobalStyle.flexColumnCenter]}>*/}
                            {/*<Image source={Images.icon_member_zhuanyetouzizhe} style={styles.msfico} />*/}
                            {/*<Text style={styles.msftext}>专业投资者</Text>*/}
                        {/*</View>*/}
                        {/*:*/}
                        {/*<View style={[styles.mshenfen, GlobalStyle.flexColumnCenter]}>*/}
                            {/*<Image source={Images.icon_member_putonghuiyuan} style={styles.msfico} />*/}
                            {/*<Text style={styles.msftext}>普通会员</Text>*/}
                        {/*</View>*/}
                    {/*}*/}

                {/*</View>*/}

                <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                    <TouchableOpacity  style={GlobalStyle.userlist}>
                        {/*<View style={GlobalStyle.userlistleft}>*/}
                            {/*<Image source={Images.icon_member_gerenxinxi} style={GlobalStyle.usericon} />*/}
                        {/*</View>*/}
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>清除缓存</Text>
                            {/*<Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />*/}
                        </View>
                    </TouchableOpacity>
                    {/*{this.yinhangka()}*/}

                    <TouchableOpacity  style={GlobalStyle.userlist}>
                        {/*<View style={GlobalStyle.userlistleft}>*/}
                            {/*<Image source={Images.icon_member_mimaguanli} style={GlobalStyle.usericon} />*/}
                        {/*</View>*/}
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>当前版本</Text>
                            {/*<Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />*/}
                        </View>
                    </TouchableOpacity>
                    {this.pinggu()}

                </View>

                <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                    <TouchableOpacity onPress = {() => {this.showActionSheet()}} style={GlobalStyle.userlist}>
                        {/*<View style={GlobalStyle.userlistleft}>*/}
                            {/*<Image source={Images.icon_member_tuichu} style={GlobalStyle.usericon} />*/}
                        {/*</View>*/}
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>安全退出</Text>
                            <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                </View>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
            </View>
        );
    }

    yinhangka = () => {
        if(this.state.is_pay_auth === -1){
            if(this.state.is_investor === 0){
                return (
                    <TouchableOpacity onPress={() => {Toast.toastShort(this.state.is_pay_auth_msg);RouterHelper.navigate('', 'RenzhengType')}} style={GlobalStyle.userlist}>
                        {/*<View style={GlobalStyle.userlistleft}>*/}
                            {/*<Image source={Images.icon_member_yinhangka} style={GlobalStyle.usericon} />*/}
                        {/*</View>*/}
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>银行卡</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_bank_card === 1 ? '已绑定' : '未绑定'}</Text>
                            <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => {Toast.toastShort(this.state.is_pay_auth_msg);RouterHelper.navigate('', 'Renzheng')}} style={GlobalStyle.userlist}>
                        {/*<View style={GlobalStyle.userlistleft}>*/}
                            {/*<Image source={Images.icon_member_yinhangka} style={GlobalStyle.usericon} />*/}
                        {/*</View>*/}
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>银行卡</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_bank_card === 1 ? '已绑定' : '未绑定'}</Text>
                            <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }
        }else{
            if(this.state.is_bank_card === 1){
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Yinhangka')}} style={GlobalStyle.userlist}>
                        {/*<View style={GlobalStyle.userlistleft}>*/}
                            {/*<Image source={Images.icon_member_yinhangka} style={GlobalStyle.usericon} />*/}
                        {/*</View>*/}
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>银行卡</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_bank_card === 1 ? '已绑定' : '未绑定'}</Text>
                            <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Yinhangka')}} style={GlobalStyle.userlist}>
                        {/*<View style={GlobalStyle.userlistleft}>*/}
                            {/*<Image source={Images.icon_member_yinhangka} style={GlobalStyle.usericon} />*/}
                        {/*</View>*/}
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>银行卡</Text>
                            <Text style={styles.userlistRightText}>{this.state.is_bank_card === 1 ? '已绑定' : '未绑定'}</Text>
                            <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }

        }
    }

    pinggu = () => {
        // if(this.state.is_pay_auth === -2){
            return (
                <TouchableOpacity onPress={() => { this.toWebview('http://yuntu.3todo.com/index/article/info/id/3', '', '', 'NewsWebDetail')}} style={GlobalStyle.userlist}>
                    {/*<View style={GlobalStyle.userlistleft}>*/}
                        {/*<Image source={Images.icon_member_fengxianpinggu} style={GlobalStyle.usericon} />*/}
                    {/*</View>*/}
                    <View style={GlobalStyle.userlistright}>
                        <Text style={GlobalStyle.userlisttext}>关于我们</Text>
                        {/*<Text style={styles.userlistRightText}>{this.state.is_risk === 1 ? '已通过' : '未通过'}</Text>*/}
                        <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        // }else{
        //     if(this.state.is_risk === 0){
        //         return (
        //             <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Guanyu')}} style={GlobalStyle.userlist}>
        //                 {/*<View style={GlobalStyle.userlistleft}>*/}
        //                     {/*<Image source={Images.icon_member_fengxianpinggu} style={GlobalStyle.usericon} />*/}
        //                 {/*</View>*/}
        //                 <View style={GlobalStyle.userlistright}>
        //                     <Text style={GlobalStyle.userlisttext}>关于我们</Text>
        //                     {/*<Text style={styles.userlistRightText}>{this.state.is_risk === 1 ? '已通过' : '未评估'}</Text>*/}
        //                     <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
        //                 </View>
        //             </TouchableOpacity>
        //         )
        //     }else if(this.state.is_risk === 1){
        //         return (
        //             <View style={GlobalStyle.userlist}>
        //                 {/*<View style={GlobalStyle.userlistleft}>*/}
        //                     {/*<Image source={Images.icon_member_fengxianpinggu} style={GlobalStyle.usericon} />*/}
        //                 {/*</View>*/}
        //                 <View style={GlobalStyle.userlistright}>
        //                     <Text style={GlobalStyle.userlisttext}>关于我们</Text>
        //                     {/*<Text style={styles.userlistRightText}>{this.state.is_risk === 1 ? '已通过' : '未通过'}</Text>*/}
        //                     <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
        //                 </View>
        //             </View>
        //         )
        //     }
        // }
    }

    toWebview = (link,content_id,is_collection, compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            link: link,
            content_id:content_id,
            is_collection:is_collection

        })
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    mtop: {
        backgroundColor: GlobalStyle.themeColor,
        height: 160,
        padding: 15,
    },
    minfo: {
        height: 30,
    },
    mtouxiang: {
        width: 32,
        height: 32,
        marginRight: 6,
        borderRadius: 16,
    },
    mnicheng: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    },
    mshenfen: {
        backgroundColor: '#fff',
        marginTop: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 100,
        width: GlobalStyle.width - 30,
    },
    msfico: {
        height: (GlobalStyle.width-80)*96/1251,
        width: GlobalStyle.width-80,
        marginTop: 15
    },
    msftext: {
        fontSize: 16,
        color: GlobalStyle.themeColor,
        fontWeight: 'bold',
        marginTop: 13
    },
    userlistRightText: {
        position: 'absolute',
        right: 20,
        color: '#585858',
    },
});
