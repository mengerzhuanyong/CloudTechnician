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

import {SegmentedView, Label} from 'teaset';

import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

import NewSend from './newsend'
import OnProcess from './onprocess'
import Finish from './finish'
import Judge from "./Judge";


export default class OrderManage extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            user: global.user.userData,
            loginState: global.user.loginState,

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

    loadNetData = () => {1

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
                    title = {'订单管理'}
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
                <SegmentedView style={{flex: 1, }} type='carousel' barStyle={{height: 45, borderBottomColor: '#f2f2f2', borderBottomWidth: 1, }} indicatorPositionPadding={0}>
                    <SegmentedView.Sheet title='新派遣' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <NewSend {...this.props}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='进行中' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <OnProcess {...this.props}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='已完成' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <Finish {...this.props}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='已评价' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <Judge {...this.props}/>
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
