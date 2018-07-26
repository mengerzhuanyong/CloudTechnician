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
    Dimensions
} from 'react-native'


import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

import FundDetailInfo from './fundDetailInfo'
import FundDetailFee from './fundDetailFee'
import FundDetailDeal from './fundDetailDeal'
import FundDetailNews from './fundDetailNews'

import {SegmentedView, Label} from 'teaset';

export default class FundDetail extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            user: global.user.userData,
            loginState: global.user.loginState,
            fund_id: params.fund_id,
            fundDetailData: [],
            fundDetailInfoData: '',
            fundDetailFeeData: [],
            fundDetailDealData: [],
            fundDetailNewsData: [],
            fundDetailBank: [],
            fundDetailBankTitle: '',
            fundDetailBankName: '',
            fundDetailBankNum: '',
            fundDetailFeeSubscription: [],
            fundDetailFeeApply_buy: [],
            fundDetailFeeRedeem: [],
            fundDetailFeeTransfet_buy: [],
            fundDetailFeeTransfet_sale: [],
            is_investor: -10,//为下一个页面传值
            investor_msg: '',
            back_msg: '',
            is_risk: -10,
            is_bank_card: -10,
            is_modify_truename: -10,
            is_special_investor: -10,
            is_pay_auth: -10,
            is_pay_auth_msg: '',
            title: params.title,
            datum_rate: params.datum_rate,
            buy_end_day: params.buy_end_day,
            buy_end_money: params.buy_end_money,
            time_limit: params.time_limit,
            start_buy_money: params.start_buy_money,
            end_people: params.end_people,
            is_collection: params.is_collection,
            activeIndex: params.activeIndex ? params.activeIndex : 0, //默认选中第几个tab标签
        }
    }

    async componentWillMount(){
        try {
            await this.getInvestStatusData();
        } catch (error) {
            // // console.log(error);
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

    getInvestStatusData = () => {
        // console.log(global.invest);
        let url = NetApi.get_member_status;
        let data = {
            member_id: global.user.userData.id
        }
        Services.Post(url, data, true)
            .then( result => {
                if (result && result.code === 1) {
                    console.log(result);
                    global.user = {
                        loginState: true,
                        userData: {
                            id: global.user.userData.id,
                            account: global.user.userData.account,
                            nickname: global.user.userData.nickname,
                            head_img: global.user.userData.head_img,
                            sex: global.user.userData.sex,
                            integral: global.user.userData.integral,
                            money: global.user.userData.money,
                            email: global.user.userData.email,
                            addr: global.user.userData.addr,
                            bank_num: global.user.userData.bank_num,
                            is_investor: result.data.is_investor,
                            investor_msg: result.data.investor_msg,
                            back_msg: result.data.back_msg,
                            is_risk: result.data.is_risk,
                            is_bank_card: result.data.is_bank_card,
                            is_modify_truename: result.data.is_modify_truename,
                            is_special_investor: result.data.is_special_investor,
                            is_pay_auth: result.data.is_pay_auth,
                            is_pay_auth_msg: result.data.is_pay_auth_msg,
                            special_type: result.data.special_type,
                            token: global.user.userData.token,
                        }
                    };
                    this.updateState({
                        is_investor: result.data.is_investor,
                        investor_msg: result.data.investor_msg,
                        back_msg: result.data.back_msg,
                        is_risk: result.data.is_risk,
                        is_bank_card: result.data.is_bank_card,
                        is_modify_truename: result.data.is_modify_truename,
                        is_special_investor: result.data.is_special_investor,
                        is_pay_auth: result.data.is_pay_auth,
                        is_pay_auth_msg: result.data.is_pay_auth_msg,
                        special_type: result.data.special_type,
                    })
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
        
    }

    loadNetData = () => {
        let url = NetApi.get_one;

        let data = {
            fund_id: this.state.fund_id,
            member_id: global.user.userData.id,
        };

        Services.Post(url, data, url)
            .then( result => {
                console.log(result);
                if (result && result.code === 1) {
                    // console.log(result.data);
                    this.updateState({
                        fundDetailData: result.data,
                        fundDetailInfoData: result.data.content_url,
                        fundDetailFeeData: result.data.rate,
                        fundDetailFeeSubscription: result.data.rate.subscription,
                        fundDetailFeeApply_buy: result.data.rate.apply_buy,
                        fundDetailFeeRedeem: result.data.rate.redeem,
                        fundDetailFeeTransfet_buy: result.data.rate.transfet_buy,
                        fundDetailFeeTransfet_sale: result.data.rate.transfet_sale,
                        fundDetailDealData: result.data.file,
                        fundDetailNewsData: result.data.notice,
                        fundDetailBank: result.data.bank_info,
                        fundDetailBankTitle: result.data.bank_info.bank_title,
                        fundDetailBankName: result.data.bank_info.bank_name,
                        fundDetailBankNum: result.data.bank_info.bank_num,
                        is_collection: result.data.is_collection,
                        open_day: result.data.open_day,
                    })
                }else{
                    // Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    onPushNavigator = (compent) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            fund_id: this.state.fund_id,
            is_investor: this.state.is_investor,
            investor_msg: this.state.investor_msg,
            back_msg: this.state.back_msg,
            is_risk: this.state.is_risk,
            is_bank_card: this.state.is_bank_card,
            is_modify_truename: this.state.is_modify_truename,
            is_special_investor: this.state.is_special_investor,
            is_pay_auth: this.state.is_pay_auth,
            is_pay_auth_msg: this.state.is_pay_auth_msg,
            fundDetailBank: this.state.fundDetailBank,
            fundDetailBankTitle: this.state.fundDetailBankTitle,
            fundDetailBankName: this.state.fundDetailBankName,
            fundDetailBankNum: this.state.fundDetailBankNum,
            open_day: this.state.open_day,
        })
    }

    onCollect = () => {
        let url = NetApi.collection_fund;

        let data = {
            member_id: global.user.userData.id,
            fund_id: this.state.fund_id
        };

        Services.Post(url, data)
            .then( result => {
                // console.log(result);
                if (result && result.code === 1) {
                    if(result.data === 0){
                        Toast.toastShort(result.msg);
                        this.updateState({
                            is_collection: 0
                        })
                    }else{
                        Toast.toastShort(result.msg);
                        this.updateState({
                            is_collection: 1
                        })
                    }
                    
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
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
                    title = {'基金详情'}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                    rightButton = {this.state.is_collection === 0 ?
                        <TouchableOpacity onPress={()=>{this.onCollect()}} style={styles.botLeft}>
                            <Image source={require('../../assets/images/icons/icon_shoucang_cur.png')} style={[styles.botLeftIco, {width: 24*109/100}]} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>{this.onCollect()}} style={styles.botLeft}>
                            <Image source={require('../../assets/images/icons/icon_shoucang.png')} style={[styles.botLeftIco, {width: 24*109/100}]} />
                        </TouchableOpacity>
                    }
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'dark-content'}
                />
                <ScrollView style={styles.scrollWrap}>
                    <View style={[GlobalStyle.whiteModule, {padding: 15, marginBottom: 10}]}>
                        <Text style={styles.fundTitle}>{this.state.title}</Text>
                        <View style={styles.fundInfo}>
                            <View style={styles.fundInfoLine}>
                                <View style={styles.fundInfoLeft}>
                                    <Text style={styles.fundInfoKey}>业绩比较基准</Text>
                                    <Text style={styles.fundInfoValue}>{this.state.datum_rate}<Text style={{fontSize: 13}}>%</Text></Text>
                                </View>
                                <View style={styles.fundInfoRight}>
                                    <Text style={styles.fundInfoKey}>产品期限(月)</Text>
                                    <Text style={styles.fundInfoValue}>{this.state.time_limit}</Text>
                                </View>
                            </View>
                            <View style={styles.fundInfoLine}>
                                <View style={styles.fundInfoLeft}>
                                    <Text style={styles.fundInfoKey}>起投金额要求(万元)</Text>
                                    <Text style={styles.fundInfoValue}>{this.state.start_buy_money}</Text>
                                </View>
                                <View style={styles.fundInfoRight}>
                                    <Text style={styles.fundInfoKey}>剩余名额(人)</Text>
                                    <Text style={styles.fundInfoValue}>{this.state.end_people}</Text>
                                </View>
                            </View>
                            <View style={styles.fundInfoLine}>
                                <View style={styles.fundInfoLeft}>
                                    <Text style={styles.fundInfoKey}>截止打款(天)</Text>
                                    <Text style={styles.fundInfoValue}>{this.state.buy_end_day}</Text>
                                </View>
                                <View style={styles.fundInfoRight}>
                                    <Text style={styles.fundInfoKey}>剩余额度</Text>
                                    <Text style={styles.fundInfoValue}>{this.state.buy_end_money}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*<SegmentedView style={{ flex: 1, height: 1000 }} type='carousel' activeIndex={this.state.activeIndex} animated={true} >*/}
                    
                    <SegmentedView style={{ flex: 1, height: 1000 }} type='projector' barStyle={{height: 45, borderBottomColor: '#f2f2f2', borderBottomWidth: 1, }} indicatorPositionPadding={0}>
                          <SegmentedView.Sheet title='基本信息' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                              <FundDetailInfo 
                                  thisData={this.state.fundDetailInfoData} 
                                  {...this.props}
                              />
                          </SegmentedView.Sheet>
                          <SegmentedView.Sheet title='交易费用' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                            <FundDetailFee 
                                thisData={this.state.fundDetailFeeData} 
                                fundDetailFeeSubscription={this.state.fundDetailFeeSubscription} 
                                fundDetailFeeApply_buy={this.state.fundDetailFeeApply_buy} 
                                fundDetailFeeRedeem={this.state.fundDetailFeeRedeem} 
                                fundDetailFeeTransfet_buy={this.state.fundDetailFeeTransfet_buy} 
                                fundDetailFeeTransfet_sale={this.state.fundDetailFeeTransfet_sale} 
                                {...this.props}
                            />
                          </SegmentedView.Sheet>
                          <SegmentedView.Sheet title='合同协议' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                            <FundDetailDeal 
                                thisData={this.state.fundDetailDealData} 
                                {...this.props}
                            />
                          </SegmentedView.Sheet>
                          <SegmentedView.Sheet title='基金公告' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                            <FundDetailNews 
                                thisData={this.state.fundDetailNewsData} 
                                {...this.props}
                            />
                          </SegmentedView.Sheet>
                    </SegmentedView>                    
                </ScrollView>
                    
                <View style={styles.botBar}>
                    {this.state.is_collection === 0 ?
                        <TouchableOpacity onPress={()=>{this.onCollect()}} style={styles.botLeft}>
                            <Image source={require('../../assets/images/icons/icon_shoucang_cur.png')} style={[styles.botLeftIco, {width: 24*109/100}]} />
                            <Text style={styles.botLeftText}>添加收藏</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>{this.onCollect()}} style={styles.botLeft}>
                            <Image source={require('../../assets/images/icons/icon_shoucang.png')} style={[styles.botLeftIco, {width: 24*109/100}]} />
                            <Text style={styles.botLeftText}>添加收藏</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={()=>{RouterHelper.navigate('', 'Jisuanqi')}} style={styles.botLeft}>
                        <Image source={require('../../assets/images/icons/icon_shouyi.png')} style={[styles.botLeftIco, {width: 24*96/100}]} />
                        <Text style={styles.botLeftText}>收益计算</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{RouterHelper.navigate('', 'Renshengou')}} style={styles.botRight}>
                        <Text style={styles.botRightText}>认申购</Text>
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
    scrollWrap: {
        backgroundColor: GlobalStyle.bgColor,
        flex:1
    },
    fundTitle: {
        color: GlobalStyle.themeColor,
        fontSize: 16,
        marginBottom: 5
    },
    fundInfo: {
        display: 'flex',
        flexDirection: 'column',

    },
    fundInfoLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,

    },
    fundInfoLeft: {
        marginRight: 5,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 5,
    },
    fundInfoKey: {
        color: '#666',
        fontSize: 15,
        height: 30,
        lineHeight: 30
    },
    fundInfoValue: {
        fontSize: 16,
        color: GlobalStyle.themeColor,
        paddingTop: 5,
        paddingBottom: 5,
    },
    fundInfoRight: {
        marginLeft: 5,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 5,
    },
    botBar: {
        height: 54,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#ececec',
        borderTopWidth: 1,

    },
    botLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botLeftIco: {
        height: 24,

    },
    botLeftText: {
        fontSize: 13,
        color: '#666',
        height: 20,
        lineHeight: 20,
    },
    botRight: {
        flex: 2,
        backgroundColor: GlobalStyle.themeColor,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',

    },
    botRightText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
});
