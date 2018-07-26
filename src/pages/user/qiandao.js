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

export default class Qiandao extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            thisScore: '',
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
        let url = NetApi.sign_in;
        let data = {
            member_id: global.user.userData.id,
            token: global.user.userData.token,
        }

        Services.Post(url, data)
            .then( result => {
                // console.log(result);
                this.updateState({
                    thisScore: result.data,
                })
                Toast.toastShort(result.msg);
            })
            .catch( error => {
                // consoleLog('链接服务器出错，请稍后重试', error);
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
                    title = {'签到'}
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
                <View style={styles.qdtop}>
                    <View style={[styles.qdinfo, GlobalStyle.flexRowStart]}>
                        <Text style={styles.qdnum}>{this.state.thisScore}</Text>
                        <Text style={styles.qdnum}>/</Text>
                        <Text style={styles.qdnum}>30</Text>
                        <Text style={styles.qdnum}>天</Text>
                    </View>
                    <ScrollView horizontal={true} style={[styles.qditem]}>
                        <View style={[styles.qdlist, styles.qdlistActive]}>
                            <Text style={[styles.dailyText, styles.dailyTextActive]}>今日领取</Text>
                            <Text style={[styles.dailyNum, styles.dailyNumActive]}>+{this.state.thisScore}</Text>
                        </View>

                        {this.qiandao()}
                        
                    </ScrollView>
                </View>
                <View style={GlobalStyle.tishiItem}>
                    <Text style={GlobalStyle.tishititle}>奖励规则</Text>
                    <Text style={GlobalStyle.tishitext}>每天登陆APP奖励积分，第一天+1积分，第二天+2积分，以此类推，坚持每天登陆创元汇，积分奖励不间断。奖励满30天开启一个新的奖励周期。</Text>
                    <Text style={GlobalStyle.tishitext}>提示：签到如有中断，则每日奖励退回第一天重新累计。</Text>
                </View>
            </View>
        );
    }

    qiandao(){
        let qiandaoList = [],
            thisScore = this.state.thisScore;
        for (var i = thisScore + 1; i <= 30; i++) {
            let qiandaoItem = (
                <View key={i} style={styles.qdlist}>
                    <Text style={styles.dailyText}>未领取</Text>
                    <Text style={styles.dailyNum}>+{i}</Text>
                </View>
            )
            qiandaoList.push(qiandaoItem);
        }
        return qiandaoList;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    qdtop: {
        backgroundColor: GlobalStyle.themeColor,
        height: 150,
        padding: 15,
    },
    qdinfo: {
        marginTop: 10,
        marginBottom: 10
    },
    qdnum: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 1,
    },
    qditem: {
        height: 60,
        marginTop: 7
    },
    qdlist: {
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        marginRight: 10,
        borderColor: '#fff',
        borderWidth: 1,

    },
    qdlistActive: {
        backgroundColor: '#fff',

    },
    dailyText: {
        color: '#fff',
        fontSize: 12.5,
        height: 20,
        marginTop: -5,
        backgroundColor: 'transparent',
    },
    dailyNum: {
        color: '#fff',
        position: 'absolute',
        fontSize: 13,
        bottom: 7,
        backgroundColor: 'transparent',
    },
    dailyTextActive: {
        color: GlobalStyle.themeColor,
        fontSize: 12,

    },
    dailyNumActive: {
        color: GlobalStyle.themeColor,
    },
});
