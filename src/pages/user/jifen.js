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
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'
import {SegmentedView, Label} from 'teaset';

import JifenQuanbu from './jifenQuanbu'
import JifenZhichu from './jifenZhichu'
import JifenShouru from './jifenShouru'

export default class Jifen extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            integral_total: '',
            integral_new: '',
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
        let url = NetApi.integral_list;
        let data = {
            member_id: global.user.userData.id,
        }

        Services.Post(url, data, true)
            .then( result => {
                if (result && result.code === 1) {
                    console.log(result.data);
                    this.updateState({
                        integral_total: result.data.integral_total,
                        integral_new: result.data.integral_new,
                    })
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
                    title = {'积分'}
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
                    <Text style={GlobalStyle.userNeiTopline1}>我的积分</Text>
                    <Text style={GlobalStyle.userNeiTopline2}>{this.state.integral_total}</Text>
                    <Text style={GlobalStyle.userNeiTopline3}>新增积分：{this.state.integral_new}</Text>
                </View>
                <SegmentedView style={{flex: 1, }} type='carousel' barStyle={{height: 45, borderBottomColor: '#f2f2f2', borderBottomWidth: 1, }} indicatorPositionPadding={0}>
                    <SegmentedView.Sheet title='全部积分' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <JifenQuanbu {...this.props}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='收入积分' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <JifenShouru {...this.props}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='支出积分' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <JifenZhichu {...this.props}/>
                    </SegmentedView.Sheet>
                </SegmentedView>

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
