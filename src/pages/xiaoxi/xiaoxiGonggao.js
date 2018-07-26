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

import FooterComponent from '../../components/common/footerComponent'
import EmptyComponent from '../../components/common/emptyComponent'
export default class XiaoxiGonggao extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            ready: false,
            showFoot: 0,
            error: false,
            errorInfo: "",
            loadMore: false,
            refreshing: false,
            companyListData: [],
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
        await this.dropLoadMore();
        setTimeout(() => {
            this.updateState({
                ready: true,
                showFoot: 0 // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
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

    loadNetData = (page) => {
        let url = NetApi.getMessageList+"?token="+global.user.userData.token;

        return Services.Get(url)
            .then( result => {
                // console.log(result);
                return result;
            })
            .catch( error => {
                // consoleLog('链接服务器出错，请稍后重试', error);
                this.updateState({
                    ready: true,
                    error: true,
                    errorInfo: error
                })
            })
    }

    dropLoadMore = async () => {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        if ((this.page != 1) && (this.page >= this.totalPage)) {
            return;
        } else {
            this.page++;
        }
        this.updateState({
            showFoot: 2
        })
        let result = await this.loadNetData(this.page);
        // // console.log(this.totalPage);
        this.totalPage = result.data.message_list.length;
        // // console.log(result);
        let foot = 0;
        if (this.page >= this.totalPage) {
            // // console.log(this.totalPage);
            foot = 1; //listView底部显示没有更多数据了
        }
        this.updateState({
            showFoot: foot,
            companyListData: this.state.companyListData.concat(result.data.message_list)
        })
    }

    freshNetData = async () => {

        let result = await this.loadNetData(1);
        if (result && result.code === 1) {
            this.page = 1;
            this.updateState({
                showFoot: 0
            })
            this.updateState({
                companyListData: result.data.message_list
            })
        }
    }

    toWebview = (title, id, link, compent) => {
        const { navigate } = this.props.navigation;
        navigate(compent, {
            title: title,
            id: id,
            link: link,
        })
    }

    renderCompanyItem = ({item}) => {
        let url = item.article_url;
        return (
            <TouchableOpacity  style={[styles.gonggaoList, GlobalStyle.flexRowStart]}>
                <Image source={{uri:url}} style={styles.gonggaoico} />
                <Text style={styles.gonggaotext} >{item.title}</Text>
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

                <View style={[GlobalStyle.newsModule, {backgroundColor: '#fff', flex: 1, marginTop: 10}]}>
                    {ready ?
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
                        : <ActivityIndicatorItem />
                    }
                </View>
                    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    gonggaoList: {
        // borderBottomColor: '#f2f2f2',
        // borderBottomWidth: 1
        height: 40,
        marginTop: 5
        
    },
    gonggaoico: {
        width: 24,
        height: 24,
        marginRight: 6
    },
    gonggaotext: {
        color: '#666',
        fontSize: 14.5,
        lineHeight: 20,
    },
});
