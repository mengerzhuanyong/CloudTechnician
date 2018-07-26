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
    FlatList
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'
import ActivityIndicatorItem from '../../components/common/ActivityIndicatorItem'

import EmptyComponent from '../../components/common/emptyComponent'
export default class jifenQuanbu extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state =  {
            ready:true ,
            showFoot: 0,
            error: false,
            errorInfo: "",
            loadMore: false,
            refreshing: false,
            companyListData: params.fund_list,
        }
    }

    /**
     * 初始化状态
     * @type {Boolean}
     */
    page = 0;
    totalPage = 1;
    loadMore = false;
    refreshing = false;

    async componentDidMount(){
        setTimeout(() => {
            this.updateState({
                ready: true,
                showFoot: 2 // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            })
        },0)
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    freshNetData = async () => {

        let result = await this.loadNetData(1);
        if (result && result.code === 1) {
            this.page = 1;
            this.updateState({
                showFoot: 1
            })

        }
    }

    renderCompanyItem = ({item}) => {
        return (
            <TouchableOpacity style={[GlobalStyle.fundList,{backgroundColor:'#ffffff'}]}>
                <View style={[GlobalStyle.fundBot, GlobalStyle.flexRowBetween]}>
                    <View style={[GlobalStyle.fundCenter, GlobalStyle.flexColumnCenter]}>
                        <Text style={GlobalStyle.fundLeftKey}>{item.create_time}</Text>
                    </View>
                    <View style={[GlobalStyle.fundCenter, GlobalStyle.flexColumnCenter]}>
                        <Text style={GlobalStyle.fundCenterKey}>{item.remark}</Text>
                    </View>
                    <View style={[GlobalStyle.fundCenter, GlobalStyle.flexColumnCenter]}>
                        <Text style={GlobalStyle.fundRightKey}>{item.money}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    renderHeaderView = () => {
        return (
            <View style={styles.shopListViewTitle}>

            </View>
        )
    }

    renderFooterView = () => {
        return <FooterComponent status = {this.state.showFoot} />;
    }

    renderEmptyView = () => {
        return this.state.showFoot === 0 && <EmptyComponent emptyTips = {'暂无数据！'} />;
    }

    renderSeparator = () => {
        return <View style={GlobalStyle.horLine} />;
    }

    render(){
        const { ready, error, refreshing, companyListData } = this.state;
        return (
            <View style={styles.container}>

                {
                    <FlatList
                        style = {styles.shopListView}
                        keyExtractor = { item => item.id}
                        data = {companyListData}
                        extraData = {this.state}
                        renderItem = {(item) => this.renderCompanyItem(item)}
                        onEndReachedThreshold = {0.1}
                        onEndReached = {(info) => this.dropLoadMore(info)}
                        onRefresh = {this.freshNetData}
                        refreshing = {refreshing}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent = {this.renderHeaderView}
                        ListFooterComponent = {this.renderFooterView}
                        ListEmptyComponent = {this.renderEmptyView}
                    />

                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    jflist: {
        borderBottomColor:'#f2f2f2',
        borderBottomWidth: 1,
        height: 60,
        paddingLeft: 15,
        paddingRight: 15,
    },
    jfleft: {

    },
    jfType: {
        color: '#929292',
        fontSize: 16,
        lineHeight: 28,
    },
    jfTime: {
        color: '#929292',
        fontSize: 13,
        lineHeight: 24
    },
    jfNum: {
        color: GlobalStyle.themeColor,
        fontSize: 18,
    },
});
