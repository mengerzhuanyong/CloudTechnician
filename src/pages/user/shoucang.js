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
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'
import ActivityIndicatorItem from '../../components/common/ActivityIndicatorItem'
import FooterComponent from '../../components/common/footerComponent'
import EmptyComponent from '../../components/common/emptyComponent'
export default class Fund extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            loginState: global.user.loginState,
            user: global.user.userData,
            ready: false,
            showFoot: 0,
            error: false,
            errorInfo: "",
            loadMore: false,
            refreshing: false,
            fundListData: [],
        }
    }

    /**
     * 初始化状态
     * @type {Boolean}
     */
    page = 1;
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

    updateState = (state) => {
        if (!this) { return };
        this.setState(state);
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    loadNetData = (page) => {
        let url = NetApi.collection_list+"?page="+this.state.page+"&token="+global.user.userData.token;

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
        this.totalPage = result.data.all_page;
        // // console.log(result);
        let foot = 0;
        if (this.page >= this.totalPage) {
            // // console.log(this.totalPage);
            foot = 1; //listView底部显示没有更多数据了
        }
        this.updateState({
            showFoot: foot,
            fundListData: this.state.fundListData.concat(result.data.list)
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
                fundListData: result.data.list
            })
        }
    }

    onPushNavigator = (compent) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {

        })
    }

    onPushToFundDetail = (compent, fund_id, title, datum_rate, buy_end_day, buy_end_money, time_limit, start_buy_money, end_people, is_collection) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            fund_id: fund_id,
            title: title,
            datum_rate: datum_rate,
            buy_end_day: buy_end_day,
            buy_end_money: buy_end_money,
            time_limit: time_limit,
            start_buy_money: start_buy_money,
            end_people: end_people,
            is_collection: is_collection,
            onCallBack:()=>{
                this.freshNetData();
            }
        })
    }

    renderCompanyItem = ({item}) => {
        let content_url=item.article_url;
        let content_id=item.article_id;
        let is_collection=item.is_collection;
        return (
            <TouchableOpacity key={item.id} onPress={() => {
                this.toWebview(content_url,content_id,is_collection, 'NewsWebDetail')
            }} style={[GlobalStyle.fundList,{margin:10}]}>
                <View style={[GlobalStyle.fundTop, GlobalStyle.flexRowBetween]}>
                    <Text style={GlobalStyle.fundTitle}>{item.title}</Text>
                    {/*<Text style={GlobalStyle.fundDakuan}>截止打款{data[i].buy_end_day}天</Text>*/}
                </View>
                <View style={GlobalStyle.fundMid}>
                    <Image source={{uri: item.thumb}} style={[GlobalStyle.fundThumb]}/>
                </View>

                <View style={[GlobalStyle.fundBot, GlobalStyle.flexRowBetween]}>
                    <View style={GlobalStyle.userlistleft}>
                        <Image source={Images.icon_shoucang_item} style={styles.icon} />
                    </View>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={GlobalStyle.userlisttext}>{item.views}</Text>
                        <Text  style={styles.text} >{item.create_time}</Text>
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
        const { ready, error, refreshing, fundListData } = this.state;
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'我的收藏'}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'default'}
                />
                
                {this.funList(ready, error, refreshing, fundListData)}
                
            </View>
        );
    }

    funList = (ready, error, refreshing, fundListData) => {
        if(this.state.loginState){
            if(ready){
                return (
                    <View style={[GlobalStyle.whiteModule, {marginTop: 10, flex: 1}]}>
                        <View style={[GlobalStyle.fundModule, {paddingLeft: 0, paddingRight: 0, flex: 1}]}>
                            <FlatList
                                style = {styles.shopListView}
                                keyExtractor = { item => item.id}
                                data = {fundListData}
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
                        </View>
                    </View>
                )
            }else{
                return (
                    <ActivityIndicatorItem />
                )
            }
        }else{
            return (
                <View style={styles.fundLogin}>
                    <Image source={Images.image_fund_login} style={styles.fundLoginImg} />
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Login')}} style={[GlobalStyle.submit, styles.submitbot]}><Text style={GlobalStyle.btna}>登录后查看</Text></TouchableOpacity>
                </View>
            )    
        }
    }

    toWebview = (link,content_id,is_collection, compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            link: link,
            content_id:content_id,
            is_collection:is_collection

        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    topBar: {
        height: 45,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    topLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topLeftIco: {
        height: 24,
        width: 24,
        marginRight: 5
    },
    topLeftText: {
        fontSize: 15,
        color: '#666',
        height: 20,
        lineHeight: 20,
    },
    shuxian: {
        position: 'absolute',
        height: 24,
        width: 1.5,
        backgroundColor: '#ececec',
    },
    fundLogin: {
        width: GlobalStyle.width,
        flex: 1,
        paddingBottom: 30,
        backgroundColor: '#fff'
    },
    fundLoginImg: {
        width: GlobalStyle.width,
        height: GlobalStyle.width*860/660,
    },
    submitbot: {
        position: 'absolute',
        bottom: 0,
        width: GlobalStyle.width - 30,
        borderRadius: 0,
        height: 42        
    },
    text :{
        width:80,
    },
    icon:{
        width:18,
        height:18
    }
});
