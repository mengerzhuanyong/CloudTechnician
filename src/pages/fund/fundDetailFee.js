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
    TouchableOpacity
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

export default class FundDetailFee extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            ready: false,
            feeData: this.props.thisData,
            subscription: this.props.fundDetailFeeSubscription,
            apply_buy: this.props.fundDetailFeeApply_buy,
            redeem: this.props.fundDetailFeeRedeem,
            transfet_buy: this.props.fundDetailFeeTransfet_buy,
            transfet_sale: this.props.fundDetailFeeTransfet_sale,
        }
    }

    // 加上这个才能接受到值
    componentWillReceiveProps(nextProps) {
        // consoleLog('poup', nextProps);
        this.setState({
            feeData: nextProps.thisData,
            subscription: nextProps.fundDetailFeeSubscription,
            apply_buy: nextProps.fundDetailFeeApply_buy,
            redeem: nextProps.fundDetailFeeRedeem,
            transfet_buy: nextProps.fundDetailFeeTransfet_buy,
            transfet_sale: nextProps.fundDetailFeeTransfet_sale,
            ready: true
        });
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

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.feeList}>
                    {this.rengou(this.state.subscription)}
                    {this.shengou(this.state.apply_buy)}
                    {this.shuhui(this.state.redeem)}
                    {this.mairu(this.state.transfet_buy)}
                    {this.maichu(this.state.transfet_sale)}
                </View>            
            </View>
        );
    }

    rengou(data) {
        let fundList = [];
        if(data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                let fundItem = (
                    <View key={i} style={[styles.feeBot, GlobalStyle.flexRowAround]}>
                        <Text style={[styles.feeValue, styles.flexlong]}>{data[i].section}</Text>
                        <Text style={[styles.feeValue, styles.flexshort]}>{data[i].rate_value}</Text>
                        <View style={styles.feeValueClear}></View>
                    </View>
                )
                fundList.push(fundItem);
            }
            return (
                <View style={styles.feeItem}>
                    <View style={styles.feeTitleWrap}>
                        <Text style={styles.feeTitle}>认购费率</Text>
                    </View>
                    <View style={styles.feeTable}>
                        <View style={[styles.feeTop, GlobalStyle.flexRowAround]}>
                            <Text style={[styles.feeKey, styles.flexlong]}>费率区间</Text>
                            <Text style={[styles.feeKey, styles.flexshort]}>费率值</Text>
                        </View>
                        {fundList}
                    </View>
                </View>
            );
        }
            
    }

    shengou(data) {
        let fundList = [];
        if(data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                let fundItem = (
                    <View key={i} style={[styles.feeBot, GlobalStyle.flexRowAround]}>
                        <Text style={[styles.feeValue, styles.flexlong]}>{data[i].section}</Text>
                        <Text style={[styles.feeValue, styles.flexshort]}>{data[i].rate_value}</Text>
                        <View style={styles.feeValueClear}></View>
                    </View>
                )
                fundList.push(fundItem);
            }
            return (
                <View style={styles.feeItem}>
                    <View style={styles.feeTitleWrap}>
                        <Text style={styles.feeTitle}>申购费率</Text>
                    </View>
                    <View style={styles.feeTable}>
                        <View style={[styles.feeTop, GlobalStyle.flexRowAround]}>
                            <Text style={[styles.feeKey, styles.flexlong]}>费率区间</Text>
                            <Text style={[styles.feeKey, styles.flexshort]}>费率值</Text>
                        </View>
                        {fundList}
                    </View>
                </View>
            );
        }
    }

    shuhui(data) {
        let fundList = [];
        if(data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                let fundItem = (
                    <View key={i} style={[styles.feeBot, GlobalStyle.flexRowAround]}>
                        <Text style={[styles.feeValue, styles.flexlong]}>{data[i].section}</Text>
                        <Text style={[styles.feeValue, styles.flexshort]}>{data[i].rate_value}</Text>
                        <View style={styles.feeValueClear}></View>
                    </View>
                )
                fundList.push(fundItem);
            }
            return (
                <View style={styles.feeItem}>
                    <View style={styles.feeTitleWrap}>
                        <Text style={styles.feeTitle}>赎回费率</Text>
                    </View>
                    <View style={styles.feeTable}>
                        <View style={[styles.feeTop, GlobalStyle.flexRowAround]}>
                            <Text style={[styles.feeKey, styles.flexlong]}>费率区间</Text>
                            <Text style={[styles.feeKey, styles.flexshort]}>费率值</Text>
                        </View>
                        {fundList}
                    </View>
                </View>
            );
        }
    }

    mairu(data) {
        let fundList = [];
        if(data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                let fundItem = (
                    <View key={i} style={[styles.feeBot, GlobalStyle.flexRowAround]}>
                        <Text style={[styles.feeValue, styles.flexlong]}>{data[i].section}</Text>
                        <Text style={[styles.feeValue, styles.flexshort]}>{data[i].rate_value}</Text>
                        <View style={styles.feeValueClear}></View>
                    </View>
                )
                fundList.push(fundItem);
            }
            return (
                <View style={styles.feeItem}>
                    <View style={styles.feeTitleWrap}>
                        <Text style={styles.feeTitle}>买方转让费率</Text>
                    </View>
                    <View style={styles.feeTable}>
                        <View style={[styles.feeTop, GlobalStyle.flexRowAround]}>
                            <Text style={[styles.feeKey, styles.flexlong]}>费率区间</Text>
                            <Text style={[styles.feeKey, styles.flexshort]}>费率值</Text>
                        </View>
                        {fundList}
                    </View>
                </View>
            );
        }
    }

    maichu(data) {
        let fundList = [];
        if(data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                let fundItem = (
                    <View key={i} style={[styles.feeBot, GlobalStyle.flexRowAround]}>
                        <Text style={[styles.feeValue, styles.flexlong]}>{data[i].section}</Text>
                        <Text style={[styles.feeValue, styles.flexshort]}>{data[i].rate_value}</Text>
                        <View style={styles.feeValueClear}></View>
                    </View>
                )
                fundList.push(fundItem);
            }
            return (
                <View style={styles.feeItem}>
                    <View style={styles.feeTitleWrap}>
                        <Text style={styles.feeTitle}>卖方转让费率</Text>
                    </View>
                    <View style={styles.feeTable}>
                        <View style={[styles.feeTop, GlobalStyle.flexRowAround]}>
                            <Text style={[styles.feeKey, styles.flexlong]}>费率区间</Text>
                            <Text style={[styles.feeKey, styles.flexshort]}>费率值</Text>
                        </View>
                        {fundList}
                    </View>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    feeList: {
        
    },
    feeItem: {
        marginBottom: 10,
    },
    feeTitleWrap: {
        borderLeftColor: GlobalStyle.themeColor,
        borderLeftWidth: 4,
        height: 24,
        marginTop: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    feeTitle: {
        color: '#333',
        fontSize: 17,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    feeTable: {
        borderColor: GlobalStyle.themeColor,
        borderWidth: 1,
        borderBottomWidth: 0
    },
    feeTop: {
        backgroundColor: GlobalStyle.themeColor,
        height: 45,

    },
    feeKey: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    feeBot: {
        height: 45,
        backgroundColor: '#fff',
        position: 'relative',
        borderBottomColor: GlobalStyle.themeColor,
        borderBottomWidth: 1,
    },
    feeValue: {
        color: '#333',
        flex: 1,
        textAlign: 'center',
        fontSize: 15,

    },
    feeValueClear: {
        position: 'absolute',
        top: 0,
        left: (GlobalStyle.width -32)*1.8/2.8,
        width: 0.5,
        height: 45,
        backgroundColor: GlobalStyle.themeColor,
    },
    flexlong: {
        flex: 1.8
    },
    flexshort: {
        flex: 1
    },
});
