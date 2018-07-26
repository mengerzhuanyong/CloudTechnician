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

import Intocyh from './intocyh'
import Cyhnews from './cyhnews'
import Cyhcard from './cyhcard'


export default class About extends Component {

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

    loadNetData = () => {
        
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
                    title = {'走进我们'}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                    rightButton = {UtilsView.getRightKefuBlackButton(() => RouterHelper.navigate('', 'Kefu'))}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'#42b3ff'}
                    translucent = {true}
                    barStyle = {'dark-content'}
                />
                <SegmentedView style={{flex: 1, }} type='carousel' barStyle={{height: 45, borderBottomColor: '#f2f2f2', borderBottomWidth: 1, }} indicatorPositionPadding={0}>
                      <SegmentedView.Sheet title='走进创元汇' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                          <Intocyh {...this.props}/>
                      </SegmentedView.Sheet>
                      <SegmentedView.Sheet title='创元汇新闻' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <Cyhnews {...this.props}/>
                      </SegmentedView.Sheet>
                      <SegmentedView.Sheet title='创元汇公告' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <Cyhcard {...this.props}/>
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
