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

export default class OrderZhuanrangDetail extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            order_id: params.order_id,
            status: params.status,
            fund_id: '',
            order_sn: '',
            create_time: '',
            status: '',
            status_msg: '',
            money: '',
            rate_money: '',
            title: '',
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
        let url = NetApi.get_redeem_order_detaile;
        let data = {
            order_id: this.state.order_id,
        }
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.setState({
                        fund_id: result.data.fund_id,
                        order_sn: result.data.order_sn,
                        create_time: result.data.create_time,
                        status: result.data.status,
                        status_msg: result.data.status_msg,
                        money: result.data.money,
                        rate_money: result.data.rate_money,
                        title: result.data.title,
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
            fund_id: this.state.fund_id,
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
                    title = {'订单详情'}
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
                            <Text style={[GlobalStyle.userlisttext]}>订单号</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.order_sn}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>基金名称</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.title}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>创建时间</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.create_time}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>订单状态</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.status_msg}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>赎回金额</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.money}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>赎回手续费</Text>
                            <Text style={[styles.userlistRightText, styles.right0]}>{this.state.rate_money}</Text>
                        </View>
                    </View>
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
    },
    botBar: {
        height: 54,
        backgroundColor: GlobalStyle.themeColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    botLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
    },
    botLeftText: {
        fontSize: 18,
        color: '#fff',
    },
    botRight: {
        flex: 1,
        backgroundColor: '#fff',
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
    },
    botRightText: {
        color: '#666',
        fontSize: 18,
    },
});
