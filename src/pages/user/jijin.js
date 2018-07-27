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

export default class Jijin extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            fund_id: params.fund_id,
            fund_name: params.fund_name,
            clear_money_total: '',
            money_total: '',
            next_profit_month: '',
            next_open_month: '',
            datum_rate: '',
            confirm_day: '',
            zaitu_money: '',
            is_collection: '',
        }
    }

    async componentWillMount(){
        try {
            await this.getFundDetail();
        } catch (error) {
            // // console.log(error);
        }

    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        
    }

    getFundDetail = () => {
        let url = NetApi.get_fund_detaile;
        let data = {
            fund_id: this.state.fund_id,
            member_id: global.user.userData.id,
            token: global.user.userData.token,
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.updateState({
                        clear_money_total: result.data.clear_money_total,
                        money_total: result.data.money_total,
                        next_profit_month: result.data.next_profit_month,
                        next_open_month: result.data.next_open_month,
                        datum_rate: result.data.datum_rate,
                        confirm_day: result.data.confirm_day,
                        zaitu_money: result.data.zaitu_money,
                        datum_rate: result.data.datum_rate,
                        buy_end_day: result.data.buy_end_day,
                        buy_end_money: result.data.buy_end_money,
                        time_limit: result.data.time_limit,
                        start_buy_money: result.data.start_buy_money,
                        end_people: result.data.end_people,
                        fund_name: result.data.fund_name,
                        is_collection: result.data.is_collection,
                    })
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    onPushNavigator = (compent, num) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            fund_id: this.state.fund_id,
            title: this.state.fund_name,
            money_total: this.state.money_total,
            next_open_month: this.state.next_open_month,
            datum_rate: this.state.datum_rate,
            buy_end_day: this.state.buy_end_day,
            buy_end_money: this.state.buy_end_money,
            time_limit: this.state.time_limit,
            start_buy_money: this.state.start_buy_money,
            end_people: this.state.end_people,
            is_collection: this.state.is_collection,
            activeIndex: num,
            onCallBack:()=>{
                this.getFundDetail();
            }
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
                    title = {this.state.fund_name}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                    rightButton = {UtilsView.getRightKefuBlackButton(() => RouterHelper.navigate('', 'Kefu'))}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'dark-content'}
                />
                <ScrollView>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>业绩比较基准</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.datum_rate}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>首次投资日期</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.confirm_day}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>当前可用份额</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.money_total}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>在途份额</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.zaitu_money}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>下一赎回开放月份</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.next_open_month}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>下一结算月份</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.next_profit_month}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Leijishouyi')}} style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>已累计收益</Text>
                            <Text style={styles.userlistRightText}>{this.state.clear_money_total}</Text>
                            <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => RouterHelper.navigate('', 'JijinGonggao', 3)} style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>基金公告</Text>
                            <Image source={Images.icon_user_arrow} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Order')}} style={GlobalStyle.submit}>
                        <Text style={GlobalStyle.btna}>订单列表</Text>
                    </TouchableOpacity>                
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'FundDetail')}} style={[GlobalStyle.submit, {marginTop: 0}]}>
                        <Text style={GlobalStyle.btna}>认申购</Text>
                    </TouchableOpacity>            
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Shuhui')}} style={[GlobalStyle.submit, {marginTop: 0}]}>
                        <Text style={GlobalStyle.btna}>赎回</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Zhuanrang')}} style={[GlobalStyle.submit, {marginTop: 0}]}>
                        <Text style={GlobalStyle.btna}>转让卖出</Text>
                    </TouchableOpacity>*/}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    userlistRightText: {
        position: 'absolute',
        right: 20,
        color: GlobalStyle.themeColor,
    },
    right0: {
        right: 0
    }
});
