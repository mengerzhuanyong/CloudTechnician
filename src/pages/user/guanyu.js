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

export default class Guanyu extends Component {

    constructor(props) {
        super(props);
        this.state =  {}
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
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'关于我们'}
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
                    <View style={{padding: 15, }}>        
                        <Text style={{lineHeight: 22, color: '#666', marginBottom: 10}}>北京创元汇资本管理有限公司（以下简称“创元汇资本”或“创元汇”） 是一家专注于中国地产市场投资的私募管理公司，成立于2015年8月，于2016年6月登记成为私募基金管理人，股东包括首创置业股份有限公司和中铁信托投资有限公司。</Text>
                        <Text style={{lineHeight: 22, color: '#666', marginBottom: 10}}>创元汇资本始终秉承“同在、共赢”的经营理念，做具有投资、融资、运营一体化能力、专注于房地产行业的资产管理人。截至目前，创元汇投资一共管理6个表外项目，北京、成都、重庆各2个项目，资产管理规模逾150亿元。</Text>
                        <Text style={{lineHeight: 22, color: '#666', marginBottom: 10}}>创元汇资本是由首创置业金融事业部发展而来，主要负责发展首创置业表外业务，管理表外资产。创元汇投资管理的基金所投资项目，由首创置业作为项目管理人，项目操盘团队是由首创置业派出，在投资、运营、营销、风控、工程、集采等各个方面均纳入首创置业管控体系。造就了其具备专业性的、整体的、系统性的优势，既有创元汇资本在金融投资方面的优势，也是首创置业在项目管理方面的优势，形成了金融专业能力与项目管理专业能力的完美结合。</Text>
                        <Text style={{lineHeight: 22, color: '#666', marginBottom: 10}}>创元汇资本一直认为，在财富管理行业为客户创造价值的核心因素，一方面来源于对大类资产组合配置的精准把握，也来源于对优质资产、优秀管理人的精挑细选。因此，独立、客观、审慎的研究能力，是决定这两方面因素是否能良好运行的基础。</Text>
                        <Text style={{lineHeight: 22, color: '#666', marginBottom: 10}}>创元汇资本核心成员大都来自国内大型房企、金融机构，具备丰富的从业经验与管理经验，构建了投资研究、市场服务、合规风控等为一体的完整的公司架构。同时，创元汇资本采用合伙人制度，有利于充分激励，内部稳定，形成合力。</Text>
                        <Text style={{lineHeight: 22, color: '#666', marginBottom: 10}}>当下，创元汇资本具备团队、品牌、规模和产品结构优势，已经站上了一个新的台阶，将努力把握与行业一起再出发的机遇。</Text>
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
});
