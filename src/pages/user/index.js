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
    StatusBar,
    DeviceEventEmitter
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'

import Setting from "./setting";
import ActionSheet from 'react-native-actionsheet'

// 弹窗
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 0
const options = ['取消', '上午', '下午', '全天']
const title = '日期管理'
export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            money_total: 0,
            clear_total: 0,
            new_profit: 0,
            fund_list: [],
            is_investor: -10,//为下一个页面传值
            investor_msg: '',
            back_msg: '',
            is_risk: -10,
            is_bank_card: -10,
            is_modify_truename: -10,
            is_special_investor: -10,
            is_pay_auth: -10,
            is_pay_auth_msg: '',
            time: '',
            head_img:'',
            nickname:''
        }
    }

    async componentWillMount() {
        try {
            await this.getInvestStatusData();
        } catch (error) {
            // // console.log(error);
        }

    }

    componentDidMount() {
        // this.requestDataSource()
        DeviceEventEmitter.addListener('customName', this.callBack)
    }
    componentWillUnmount() {
        DeviceEventEmitter.removeListener('customName')
    }
    callBack = (params) => {
        this.forceUpdate()
    }



    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState = (state) => {
        if (!this) {
            return
        }
        ;
        this.setState(state);
    }


    toWebview = (title, link, compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            title: title,
            link: link,
        })
    }

    onPushNavigator = (compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            money_total: this.state.money_total,
            clear_total: this.state.clear_total,
            new_profit: this.state.new_profit,
            fund_list: this.state.fund_list,
            is_investor: this.state.is_investor,
            investor_msg: this.state.investor_msg,
            back_msg: this.state.back_msg,
            is_risk: this.state.is_risk,
            is_bank_card: this.state.is_bank_card,
            is_modify_truename: this.state.is_modify_truename,
            is_special_investor: this.state.is_special_investor,
            is_pay_auth: this.state.is_pay_auth,
            is_pay_auth_msg: this.state.is_pay_auth_msg,
            onCallBack: () => {
                // this.loadNetData();
            }
        })
    }

    render() {
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            backgroundColor: '#617995'
        }

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={''}
                    style={navigationBar}
                    titleStyle={{color: '#333333'}}
                    leftButton={UtilsView.getLeftSetButton(() => RouterHelper.navigate('', "Setting"))}
                    rightButton={UtilsView.getRightXiaoxiButton(() => RouterHelper.navigate('', 'Xiaoxi'))}
                />
                {/*<StatusBar*/}
                {/*animated = {true}*/}
                {/*hidden = {false}*/}
                {/*backgroundColor = {'transparent'}*/}
                {/*translucent = {true}*/}
                {/*barStyle = {'light-content'}*/}
                {/*/>*/}
                <View style={styles.userbg}>


                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop:10}}>
                        {global.user.userData.head_img ?
                            <Image source={{uri: global.user.userData.head_img}} style={styles.userPhotoIcon} />
                            :
                            <Image source={Images.icon_user_touxiang} style={styles.userPhotoIcon} />
                        }
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginLeft: 20, color:'white'}}>{global.user.userData.nickname}</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:15}}>
                                <Text style={{marginLeft: 20, color:'white'}}>等级:</Text>
                                <Text style={{marginLeft: 10, color:'white'}}>技师</Text>
                            </View>
                            {/*<View style={{flexDirection:'row'}}>*/}
                                {/*<Text style={{marginLeft: 20, color:'white'}}>门店:</Text>*/}
                                {/*<Text style={{marginLeft: 10, color:'white'}}>长江路丰田凯越店</Text>*/}
                            {/*</View>*/}
                        </View>
                    </View>

                </View>

                <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                    <TouchableOpacity onPress={() => {
                        RouterHelper.navigate('', 'Huiyuan')
                    }} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={Images.icon_user_huiyuan}
                                   style={GlobalStyle.usericon}/>
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>会员中心</Text>
                            <Image source={Images.icon_user_arrow}
                                   style={GlobalStyle.userlistmore}/>
                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Jijin')}} style={[GlobalStyle.userlist, GlobalStyle.hide]}>*/}
                    {/*<View style={GlobalStyle.userlistleft}>*/}
                    {/*<Image source={Images.icon_jinjinrengou} style={GlobalStyle.usericon} />*/}
                    {/*</View>*/}
                    {/*<View style={GlobalStyle.userlistright}>*/}
                    {/*<Text style={GlobalStyle.userlisttext}>我的基金</Text>*/}
                    {/*<Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />*/}
                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity onPress={() => {
                        RouterHelper.navigate('', 'Zichan')
                    }} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={Images.icon_user_zichan}
                                   style={GlobalStyle.usericon}/>
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>我的资产</Text>
                            <Image source={Images.icon_user_arrow}
                                   style={GlobalStyle.userlistmore}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        RouterHelper.navigate('', 'OrderManage')
                    }} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={Images.icon_user_order}
                                   style={GlobalStyle.usericon}/>
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>订单管理</Text>
                            <Image source={Images.icon_user_arrow}
                                   style={GlobalStyle.userlistmore}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        RouterHelper.navigate('', "DateManage")
                    }} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={Images.icon_user_zichan}
                                   style={GlobalStyle.usericon}/>
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>日期管理</Text>
                            <Text style={styles.userlistRightText}>{this.state.time}</Text>
                            <Image source={Images.icon_user_arrow}
                                   style={GlobalStyle.userlistmore}/>
                        </View>
                    </TouchableOpacity>

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={title}
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={this.handlePress}
                    />
                </View>

                <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                    <TouchableOpacity onPress={() => {
                        RouterHelper.navigate('', 'Shoucang')
                    }} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={Images.icon_user_shoucang}
                                   style={GlobalStyle.usericon}/>
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>我的收藏</Text>
                            <Image source={Images.icon_user_arrow}
                                   style={GlobalStyle.userlistmore}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        RouterHelper.navigate('', 'Setting')
                    }} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistleft}>
                            <Image source={Images.icon_user_guanyu}
                                   style={GlobalStyle.usericon}/>
                        </View>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>设置</Text>
                            <Image source={Images.icon_user_arrow}
                                   style={GlobalStyle.userlistmore}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    handlePress = (i) => {
        if (i === 1) {
            this.setState({
                time: '上午'
            })
            // Toast.toastShort("第一个")
        } else if (i === 2) {
            this.setState({
                time: '下午'
            })
            // Toast.toastShort("第二个")
        } else if (i === 3) {
            this.setState({
                time: '全天'
            })
            // Toast.toastShort("第三个")
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    userbg: {
        backgroundColor: GlobalStyle.themeColor,
        height: 100,
    },
    userInfo: {
        height: 60,
        position: 'absolute',
        bottom: 30,
        left: 15,

    },
    userPhotoIcon: {
        width: 66,
        height: 66,
        borderRadius: 33
    },
    userMessage: {
        marginLeft: 10,
        height: 60
    },
    username: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 22,
        marginTop: 4
    },
    usertouxian: {
        backgroundColor: '#fff',
        height: 20,
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 5
    },
    userv: {
        textAlign: 'center',
        borderRadius: 8,
        height: 16,
        position: 'relative',
        marginRight: 2,
    },
    uservicon: {
        width: 10,
        height: 10,
        position: 'absolute',
        top: 3,
        left: 3,
    },
    uservtext: {
        color: GlobalStyle.themeColor,
        fontSize: 12
    },
    userBigIcon: {
        width: 45,
        height: 45,
    },
    userBigText: {
        color: '#666',
        fontSize: 13,
        lineHeight: 30,
        textAlign: 'center',

    },
    userMid: {
        backgroundColor: '#fff',
        padding: 15,
        paddingBottom: 5,
        paddingTop: 12
    },
    userlistRightText: {
        position: 'absolute',
        right: 20,
        color: '#585858',
    },
});
