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

import OrderRenshengou from './orderRenshengou'
import OrderShuhui from './orderShuhui'
import OrderZhuanrang from './orderZhuanrang'


export default class Invest extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            fund_id: params.fund_id,
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
                    title = {'订单列表'}
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
                      <SegmentedView.Sheet title='认申购' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                          <OrderRenshengou {...this.props}/>
                      </SegmentedView.Sheet>
                      <SegmentedView.Sheet title='赎回' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <OrderShuhui {...this.props}/>
                      </SegmentedView.Sheet>
                      {/*<SegmentedView.Sheet title='转让' titleStyle={{color: '#666', fontSize: 15, fontWeight: 'bold', }} activeTitleStyle={{color: GlobalStyle.themeColor, fontSize: 15, fontWeight: 'bold', }} style={{backgroundColor: '#fff', flex: 1, }}>
                        <OrderZhuanrang {...this.props}/>
                      </SegmentedView.Sheet>*/}
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
