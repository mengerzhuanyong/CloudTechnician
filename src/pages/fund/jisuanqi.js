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
import ModalDropdown from 'react-native-modal-dropdown'
export default class Jisuanqi extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            type: [
                {
                    id: 1,
                    name: '投资收益'
                },
                {
                    id: 2,
                    name: '投资收益率'
                },
                {
                    id: 3,
                    name: '投资年限'
                },
            ],
            typeid: 1,
            typename: '投资收益',
            money: null,
            rate: null,
            year: null,
            total_money: null,
            tzsy_year: '',
            tzsy_money: '',
            tzsy_total_money: '',
            tzsyl_rate: '',
            tznx_year: ''
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

    // 选择类型
    renderRow = (rowData) => {
        return (
            <View style = {styles.dropdownRow}>
                <Text style = {styles.dropdownRowText}>{rowData.name}</Text>
            </View>
        );
    }

    renderButtonText = (rowData) => {
        const {id, name} = rowData;
        this.setState({
            typeid: id,
            typename: name,
            tzsy_year: '',
            tzsy_money: '',
            tzsy_total_money: '',
            tzsyl_rate: '',
            tznx_year: '',
            year: null,
            rate: null,
            total_money: null,
        })
        return name;
    }

    submit = () => {
        let url = NetApi.calculator;
        let data = {
            money: this.state.money,
            rate: this.state.rate,
            year: this.state.year,
            total_money: this.state.total_money,
        }

        Services.Post(url, data, true)
            .then( result => {
                if (result && result.code === 1) {
                    console.log(result);
                    this.updateState({
                        tzsy_year: this.state.year,
                        tzsy_money: result.data.reslut,
                        tzsy_total_money: result.data.total_money,
                        tzsyl_rate: result.data.reslut,
                        tznx_year:result.data.reslut,
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
                    title = {'收益计算'}
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
                <ScrollView>
                    <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                        <View style={GlobalStyle.userlist}>
                            <View style={[GlobalStyle.userlistright, GlobalStyle.flexRowBetween]}>
                                <Text style={GlobalStyle.userlisttext}>计算类型</Text>
                                <View style={[styles.cellRight, GlobalStyle.flexRowStart, { }]}>
                                    <ModalDropdown
                                        style = {[styles.selectView]}
                                        textStyle = {[styles.textStyle]}
                                        dropdownStyle = {[styles.dropdownStyle, {height: 120}]}
                                        defaultValue = {'投资收益'} 
                                        renderRow={this.renderRow.bind(this)}
                                        options = {this.state.type}
                                        renderButtonText = {(rowData) => this.renderButtonText(rowData)}
                                    >
                                        <View style={[styles.selectViewWrap]}>
                                            <View style={[styles.paymentMethodTitleView]}>
                                                <Text style={styles.cargoAttributesTitle}>{this.state.typename ? this.state.typename : '请选择'}</Text>
                                            </View>
                                        </View>
                                    </ModalDropdown>
                                    <Image source={Images.icon_user_arrow} style={styles.userlistmore} />
                                </View>
                            </View>
                        </View>  
                        <View style={GlobalStyle.userlist}>
                            <View style={GlobalStyle.userlistright}>
                                <Text style={GlobalStyle.userlisttext}>初始投资金额</Text>
                                <View style={GlobalStyle.flexRowEnd}>
                                    <TextInput
                                        placeholder={'请填写投资金额'}
                                        defaultValue={this.state.money}
                                        onChangeText={(text) => {
                                            this.setState({
                                                money: text
                                            })
                                        }}
                                        style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', color: '#bbbbc1', fontSize: 14, width: 210, }]} 
                                        underlineColorAndroid={'transparent'}
                                    >
                                    </TextInput>
                                    <Text style={GlobalStyle.userlistrightDanwei}>元</Text>
                                </View>                                    
                            </View>
                        </View> 
                        {this.state.typeid === 3 ? null :     
                        <View style={GlobalStyle.userlist}>
                            <View style={GlobalStyle.userlistright}>
                                <Text style={GlobalStyle.userlisttext}>投资年限</Text>
                                <View style={GlobalStyle.flexRowEnd}>
                                    <TextInput
                                        placeholder={'请填写投资年限' }
                                        defaultValue={this.state.year}
                                        onChangeText={(text) => {
                                            this.setState({
                                                year: text
                                            })
                                        }}
                                        style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', color: '#bbbbc1', fontSize: 14, width: 210, }]} 
                                        underlineColorAndroid={'transparent'}
                                    >
                                    </TextInput>
                                    <Text style={GlobalStyle.userlistrightDanwei}>年</Text>
                                </View>
                            </View>
                        </View>  }
                        {this.state.typeid === 1 ? null :      
                        <View style={GlobalStyle.userlist}>
                            <View style={GlobalStyle.userlistright}>
                                <Text style={GlobalStyle.userlisttext}>本金加收益</Text>
                                <View style={GlobalStyle.flexRowEnd}>
                                    <TextInput
                                        placeholder={'请填写本金加收益'}
                                        defaultValue={this.state.total_money}
                                        onChangeText={(text) => {
                                            this.setState({
                                                total_money: text
                                            })
                                        }}
                                        style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', color: '#bbbbc1', fontSize: 14, width: 210, }]} 
                                        underlineColorAndroid={'transparent'}
                                    >
                                    </TextInput>
                                    <Text style={GlobalStyle.userlistrightDanwei}>元</Text>
                                </View>
                            </View>
                        </View> }   
                        {this.state.typeid === 2 ? null :     
                        <View style={GlobalStyle.userlist}>
                            <View style={GlobalStyle.userlistright}>
                                <Text style={GlobalStyle.userlisttext}>年投资收益率</Text>
                                <View style={GlobalStyle.flexRowEnd}>
                                    <TextInput
                                        placeholder={'请填写年投资收益率'}
                                        defaultValue={this.state.rate}
                                        onChangeText={(text) => {
                                            this.setState({
                                                rate: text
                                            })
                                        }}
                                        style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', color: '#bbbbc1', fontSize: 14, width: 210, }]} 
                                        underlineColorAndroid={'transparent'}
                                    >
                                    </TextInput>
                                    <Text style={GlobalStyle.userlistrightDanwei}>%</Text>
                                </View>
                            </View>
                        </View> }
                    </View>
                    

                    <TouchableOpacity onPress={() => {this.submit()}} style={GlobalStyle.submit}>
                        <Text style={GlobalStyle.btna}>计算</Text>
                    </TouchableOpacity>

                    <View style={styles.jisuanjieguo}>
                        <Text style={styles.resultTitle}>计算结果</Text>
                        {this.state.typeid === 1 ?  
                        <View style={styles.tzsy}>
                            <View style={GlobalStyle.userlist}>
                                <View style={GlobalStyle.userlistright}>
                                    <Text style={GlobalStyle.userlisttext}>您在</Text>
                                    <Text style={[GlobalStyle.userlistRightText, {color: '#333'}]}>
                                    <Text style={{color: GlobalStyle.themeColor}}>{this.state.tzsy_year}</Text>年后</Text>
                                </View>
                            </View>
                            <View style={GlobalStyle.userlist}>
                                <View style={GlobalStyle.userlistright}>
                                    <Text style={GlobalStyle.userlisttext}>投资收益</Text>
                                    <Text style={[GlobalStyle.userlistRightText, {color: '#333'}]}><Text style={{color: GlobalStyle.themeColor}}>{this.state.tzsy_money}</Text>元</Text>
                                </View>
                            </View>
                            <View style={GlobalStyle.userlist}>
                                <View style={GlobalStyle.userlistright}>
                                    <Text style={GlobalStyle.userlisttext}>本金与收益共</Text>
                                    <Text style={[GlobalStyle.userlistRightText, {color: '#333'}]}><Text style={{color: GlobalStyle.themeColor}}>{this.state.tzsy_total_money}</Text>元</Text>
                                </View>
                            </View>
                        </View> : null }
                        {this.state.typeid === 2 ? 
                        <View style={styles.tzsyl}>
                            <View style={GlobalStyle.userlist}>
                                <View style={GlobalStyle.userlistright}>
                                    <Text style={GlobalStyle.userlisttext}>您的年平均收益率为</Text>
                                    <Text style={[GlobalStyle.userlistRightText, {color: '#333'}]}><Text style={{color: GlobalStyle.themeColor}}>{this.state.tzsyl_rate}</Text>%</Text>
                                </View>
                            </View>
                        </View> : null }
                        {this.state.typeid === 3 ? 
                        <View style={styles.tznx}>
                            <View style={GlobalStyle.userlist}>
                                <View style={GlobalStyle.userlistright}>
                                    <Text style={GlobalStyle.userlisttext}>你需要</Text>
                                    <Text style={[GlobalStyle.userlistRightText, {color: '#333'}]}><Text style={{color: GlobalStyle.themeColor}}>{this.state.tznx_year}</Text>年后才能达成目标</Text>
                                </View>
                            </View>
                        </View> : null }

                        <Text style={styles.wxts}>注：计算结果仅供参考，并不构成任何形式的法律或金融意见和承诺</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    cellRight:{
        height: 50,
    },
    cellRightText: {
        
    },
    cellInput:{
        height:50,
        fontSize:15,
        textAlign:'left',
        color:'#525252',
    },
    inputAndroid:{
        padding: 0,
    },
    selectView: {
        position: 'absolute',
        top: 0,
        right: 15,
        width: 100,
        height: 50,
        // backgroundColor: '#000'
    },
    selectViewWrap: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
        // backgroundColor: '#f90'
    },
    paymentMethodTitleView: {
        width: 100,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cargoAttributesTitle: {
        textAlign: 'right',
        fontSize: 14,
        color: '#bbbbc1',
        paddingLeft: 0
    },
    dropdownStyle: {
        width: 100,
        marginRight: 0,
    },
    dropdownRow: {
        height: 40,
        justifyContent: 'center',
    },
    dropdownRowText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
        marginLeft: 3
    },
    userlistmore: {
        // position: 'absolute',
        // right: 0,
        width: 12*28/47,
        height: 12
    },
    jisuanjieguo: {
        // backgroundColor: '#fff',
        // padding: 15,
    },
    resultTitle: {
        padding: 15,
        color: '#333',
        fontWeight: 'bold'
    },
    tzsy: {
        backgroundColor: '#fff',
    },
    tzsyl: {
        backgroundColor: '#fff',
    },
    tznx: {
        backgroundColor: '#fff',
    },
    wxts: {
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        lineHeight: 18,
        color: '#585858',
        fontSize: 13
    },
});
