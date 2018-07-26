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


import JifenQuanbu from './jifenQuanbu'

/**
 * 我的资产页面
 */
export default class Zichan extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            money_total: params.money_total,
            clear_total: params.clear_total,
            new_profit: params.new_profit,

        }
        this.state =  {
            integral_total: '',
            integral_new: '',
            list: [],
            all_income:'',
            all_page:'',
            detailstate:1,
            withdrawlist:[]
        }
    }

    componentDidMount() {
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.state.params.onCallBack();
        this.props.navigation.goBack();
    }

    componentWillUnmount = () => {
        this.onBack();
    }

    updateState = (state) => {
        if (!this) {
            return
        }
        ;
        this.setState(state);
    }

    loadNetData = () => {
        let url = NetApi.getRecentmemberIncome+"?token="+global.user.userData.token;


        Services.Get(url)
            .then( result => {
                if (result && result.code === 1) {
                    console.log(result.data);
                    this.updateState({
                        list: result.data.list,
                        all_income: result.data.all_income,
                        all_page:result.data.all_page,
                    })
                    if(result.data.list==0){
                        Toast.toastShort("暂无收入信息");
                    }
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }

    loadWithData=()=>{

        let url = NetApi.getRecentWithdrawlist + "?token=" + global.user.userData.token;
        Services.Get(url)
            .then(result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.updateState({
                        withdrawlist: result.data.list,
                    })
                    if(result.data.list.length==0){
                        Toast.toastShort("暂无提现信息");
                    }
                    // Toast.toastShort(result.msg);
                } else {
                    Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }

    onPushNavigator = (compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {})
    }

    onPushToJijin = (compent, fund_id, fund_name) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            fund_id: fund_id,
            fund_name: fund_name,
        })
    }

    render() {
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的资产'}
                    style={navigationBar}
                    titleStyle={{color: '#333333'}}
                    leftButton={UtilsView.getLeftBlackButton(() => this.onBack())}
                    rightButton={UtilsView.getRightKefuBlackButton(() => RouterHelper.navigate('', 'Kefu'))}
                />
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent={true}
                    barStyle={'dark-content'}
                />
                <ScrollView>
                    <View style={{ flexDirection: 'row', backgroundColor: '#617995', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{}}>
                            <Text style={{marginLeft:25,marginTop:20,marginBottom:5, color:'#fff'}}>总收入(元)</Text>
                            <Text></Text>
                            <Text style={{marginLeft:20,marginTop:5,marginBottom:20,fontSize:35,textAlign:'center',color:'#fff'}}>{this.state.all_income}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Tixian')}} >
                        <View style={{marginRight:25}}>
                            <Text style={{color:'#fff',textAlign:'center',paddingBottom:5,paddingRight:10,paddingLeft:10,paddingTop:5,borderRadius:5,backgroundColor:'#fccd55'}}>提现</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    {/*<View style={GlobalStyle.whiteModule}>*/}
                    {/*<View style={[GlobalStyle.titleModule, GlobalStyle.flexRowBetween]}>*/}
                    {/*<View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStart]}>*/}
                    {/*<Image source={require('../../assets/images/icons/icon_jinjinrengou.png')}*/}
                    {/*style={styles.titleIcon}/>*/}
                    {/*<Text style={GlobalStyle.titleText}>我的基金</Text>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    {/*<View style={GlobalStyle.fundModule}>*/}
                    {/*{this.fundList(this.state.fund_list)}*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    <View style={styles.middle}>
                        <TouchableOpacity onPress={()=>{this.updateState({detailstate:1}),this.loadNetData()}}>
                            {
                                this.state.detailstate==1
                                    ?
                                    <Text style={{color:'#617995'}}>收入明细</Text>
                                    :
                                    <Text>收入明细</Text>
                            }

                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.updateState({detailstate:2}),this.loadWithData()}}>
                            {
                                this.state.detailstate==2
                                    ?
                                    <Text style={{color:'#617995'}}>提现明细</Text>
                                    :
                                    <Text>提现明细</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.detailstate==1
                            ?
                            <View style={{flexDirection:"column"}}>
                            <View style={{height:40,  flexDirection: 'row', justifyContent: 'space-around', alignItems: "center",backgroundColor:'#fff' }}>
                                <Text style={{flex:1,textAlign:'center'}} >时间</Text>
                                <Text style={{flex:2,textAlign:'center'}}>订单</Text>
                                <Text style={{flex:1,textAlign:'center'}} >收入</Text>
                            </View>
                            {this.zichanlist(this.state.list)}
                            </View>
                            :
                            <View style={{flexDirection:"column"}}>
                                <View style={{height:40,  flexDirection: 'row', justifyContent: 'space-around', alignItems: "center",backgroundColor:'#fff' }}>
                                    <Text style={{flex:1,textAlign:'center'}} >时间</Text>
                                    <Text style={{flex:2,textAlign:'center'}}>金额</Text>
                                    <Text style={{flex:1,textAlign:'center'}} >状态</Text>
                                </View>
                                {this.tixianliebiao(this.state.withdrawlist)}
                            </View>
                    }

                </ScrollView>
            </View>
        );
    }

    zichanlist(data) {
        let investList = [];
        for (var i = 0; i < data.length; i++) {
            let content_url = data[i].article_url;
            let content_id=data[i].id;
            let is_collection=data[i].is_collection
            let investItem = (
                <View style={{height:40,  flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
                    <Text style={{flex:1,textAlign:'center'}} >{data[i].create_time}</Text>
                    <Text style={{flex:2,textAlign:'center'}}>{data[i].status_name}</Text>
                    <Text style={{flex:1,textAlign:'center',marginLeft:10}} >{data[i].money}</Text>
                </View>
            )
            investList.push(investItem);
        }
        return (
            <View >
                {investList}
            </View>
        )

    }

    tixianliebiao(data) {
        let investList = [];
        for (var i = 0; i < data.length; i++) {

            let investItem = (
                <View style={{
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: "center",

                }}>
                    <Text style={{flex: 1, textAlign: 'center'}}>{data[i].create_time}</Text>
                    <Text style={{flex: 2, textAlign: 'center'}}>{data[i].money}</Text>
                    <Text style={{flex: 1, textAlign: 'center',marginLeft:10}}>{data[i].status_name}</Text>
                </View>
            )
            investList.push(investItem);
        }
        return (
            <View style={[GlobalStyle.newsModule, styles.backcolor]}>
                {investList}
            </View>
        )

    }

    onPushNavigator = (compent) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
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
            onCallBack:()=>{
                // this.loadNetData();
            }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    titleIcon: {
        width: 27,
        height: 27,
        marginRight: 10
    },
    myFundItem: {
        borderColor: '#d9d9d9',
        borderWidth: 1,
        borderRadius: 8,
        height: 45,
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    myFundText: {
        color: GlobalStyle.themeColor,
        fontSize: 16
    },
    lookIco: {
        width: 15,
        height: 15,
    },
    userlistRightText: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft:10,
        paddingRight:10,
        position: 'absolute',
        right: 20,
        color: '#ffffff',
        backgroundColor: '#ffcc52',
        borderRadius: 2
    },
    top: {
        backgroundColor: '#617995',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    toptext: {
        color: '#ffffff',
        fontSize: 15,
    },
    topbigText: {
        color: '#ffffff',
        fontSize: 35,
        textAlign:'center'
    },
    middle: {
        backgroundColor: '#cccccc',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 15,
    }

});
