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

import ActivityIndicatorItem from '../../components/common/ActivityIndicatorItem'
import FooterComponent from '../../components/common/footerComponent'
import EmptyComponent from '../../components/common/emptyComponent'


export default class Fund extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginState: global.user.loginState,
            user: global.user.userData,
            ready: false,
            showFoot: 0,
            error: false,
            errorInfo: "",
            loadMore: false,
            refreshing: false,
            fundListData: [],
            order_type: 0,
            fund_type: 0,
            risk_level: 0,
            rate_start: '',
            rate_end: '',
            paixuShow: false,
            shaixuanShow: false,
            yinyingShow: false,
            desc:'asc'
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

    async componentDidMount() {
        await this.dropLoadMore();
        setTimeout(() => {
            this.updateState({
                ready: true,
                showFoot: 0 // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            })
        }, 0)
    }

    updateState = (state) => {
        if (!this) {
            return
        }
        ;
        this.setState(state);
    }

    loadNetData = (page, num,desc) => {
        let url = NetApi.ArticleList+"?cate_id="+num+"&page="+page+"&desc="+desc+"&token="+global.user.userData.token;
        // let data = {
        //     cate_id: num,
        //     page: page,
        //     desc:'asc'
        // }
        return Services.Get(url)
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => {
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
        let result = await this.loadNetData(this.page, this.state.order_type,this.state.desc);
        // // console.log(this.totalPage);
        this.totalPage = result.data.count;
        // // console.log(result);
        let foot = 0;
        if (this.page >= this.totalPage) {
            // // console.log(this.totalPage);
            foot = 1; //listView底部显示没有更多数据了
        }
        this.updateState({
            showFoot: foot,
            fundListData: this.state.fundListData.concat(result.data.article_list)
        })
    }

    freshNetData = async (num) => {
        if (!num) {
            num = this.state.order_type;
        }
        let result = await this.loadNetData(1, num,this.state.desc);
        if (result && result.code === 1) {
             this.page = 1;
            this.updateState({
                showFoot: 0
            })
            this.updateState({
                fundListData: result.data.article_list
            })
        }
    }

    onPushNavigator = (compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {})
    }

    onPushToFundDetail = (compent, fund_id, title, datum_rate, buy_end_day, buy_end_money, time_limit, start_buy_money, end_people, is_collection) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            fund_id: fund_id,
            title: title,
            datum_rate: datum_rate,
            buy_end_day: buy_end_day,
            buy_end_money: buy_end_money,
            time_limit: time_limit,
            start_buy_money: start_buy_money,
            end_people: end_people,
            is_collection: is_collection,
            onCallBack: () => {
                this.freshNetData(this.state.order_type);
            }
        })
    }

    renderCompanyItem = ({item}) => {
        let content_url=item.article_url;
        let content_id=item.article_id;
        let is_collection=item.is_collection;
        return (
            <TouchableOpacity onPress={() => {
                this.toWebview(content_url,content_id,is_collection, 'NewsWebDetail')
            }} style={[GlobalStyle.fundList, {marginLeft: 15, marginRight: 15}]}>
                <View style={[GlobalStyle.fundTop, GlobalStyle.flexRowBetween]}>
                    <Text style={GlobalStyle.fundTitle}>{item.title}</Text>
                    {/*<Text style={GlobalStyle.fundDakuan}>截止打款{item.buy_end_day}天</Text>*/}
                </View>
                <View style={GlobalStyle.fundMid}>
                    <Image source={{uri: item.thumb}} style={GlobalStyle.fundThumb}/>
                </View>

                <View style={[GlobalStyle.fundBot, GlobalStyle.flexRowBetween]}>
                    <View style={GlobalStyle.userlistleft}>
                        <Image source={require('../../assets/images/icons/icon_shoucang_item.png')} style={styles.icon} />
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
        return <FooterComponent status={this.state.showFoot} {...this.props} />;
    }

    renderEmptyView = () => {
        return this.state.showFoot === 0 && <EmptyComponent emptyTips={'抱歉，没有符合条件的结果显示'}/>;
    }

    renderSeparator = () => {
        return <View style={GlobalStyle.horLine}/>;
    }

    //发送网络请求
    paixu = () => {
       //发送网络请求
        if(this.state.desc=="desc"){
            this.updateState({
                desc:'asc'
            })
        }else{
            this.updateState({
                desc:'desc'
            })
        }
        this.freshNetData(this.state.order_type)

    }

    toWebview = (link,content_id,is_collection, compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            link: link,
            content_id:content_id,
            is_collection:is_collection

        })
    }
    shaixuan = () => {
        if (this.state.shaixuanShow) {
            this.updateState({
                paixuShow: false,
                shaixuanShow: false,
                yinyingShow: false
            })
        } else {
            this.updateState({
                paixuShow: false,
                shaixuanShow: true,
                yinyingShow: true,
            })
        }

    }

    yinying = () => {
        this.updateState({
            paixuShow: false,
            shaixuanShow: false,
            yinyingShow: false,
        })
    }

    setPaixu = (num) => {
        this.updateState({
            order_type: num,
            paixuShow: false,
            shaixuanShow: false,
            yinyingShow: false,
        })
        this.freshNetData(num);
    }


    submit = () => {
        this.updateState({
            paixuShow: false,
            shaixuanShow: false,
            yinyingShow: false,
        })
        this.freshNetData(this.state.order_type);
    }

    render() {
        const {ready, error, refreshing, fundListData} = this.state;
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'云社区'}
                    style={navigationBar}
                    titleStyle={{color: '#333333'}}
                    // leftButton = {UtilsView.getLeftXiaoxiBlackButton(() => RouterHelper.navigate('', 'Xiaoxi'))}
                    rightButton={UtilsView.getRightKefuBlackButton(() => RouterHelper.navigate('', 'Kefu'))}
                />
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent={true}
                    barStyle={'light-content'}
                />
                <View style={styles.topBar}>
                    {this.state.loginState ?
                        <TouchableOpacity onPress={() => {
                            this.paixu()
                        }} style={styles.topLeft}>
                            <Image source={require('../../assets/images/icons/icon_paixu.png')}
                                   style={styles.topLeftIco}/>
                            <Text style={styles.topLeftText}>排序</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.topLeft}>
                            <Image source={require('../../assets/images/icons/icon_paixu.png')}
                                   style={styles.topLeftIco}/>
                            <Text style={styles.topLeftText}>排序</Text>
                        </View>
                    }
                    <View style={styles.shuxian}></View>
                    {this.state.loginState ?
                        <TouchableOpacity onPress={() => {
                            // this.shaixuan()
                        }} style={styles.topLeft}>
                            <Image source={require('../../assets/images/icons/icon_shaixuan.png')}
                                   style={styles.topLeftIco}/>
                            <Text style={styles.topLeftText}>筛选</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.topLeft}>
                            <Image source={require('../../assets/images/icons/icon_shaixuan.png')}
                                   style={styles.topLeftIco}/>
                            <Text style={styles.topLeftText}>筛选</Text>
                        </View>
                    }

                </View>

                {this.state.yinyingShow ? <TouchableOpacity onPress={() => {
                    this.yinying()
                }} style={styles.yinying}></TouchableOpacity> : null}


                {this.funList(ready, error, refreshing, fundListData)}


            </View>
        );
    }

    funList = (ready, error, refreshing, fundListData) => {
        let data = [["C", "Java", "JavaScript"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
        if (this.state.loginState) {
            if (ready) {
                return (
                    <View style={[GlobalStyle.whiteModule, {marginTop: 0, zIndex: 1}]}>
                        <View style={[GlobalStyle.fundModule, {paddingLeft: 0, paddingRight: 0, marginBottom: 110}]}>
                            <FlatList
                                style={styles.shopListView}
                                keyExtractor={item => item.id}
                                data={fundListData}
                                extraData={this.state}
                                renderItem={(item) => this.renderCompanyItem(item)}
                                onEndReachedThreshold={0.1}
                                // onEndReached={(info) => this.dropLoadMore(info)}
                                onRefresh={this.freshNetData}
                                refreshing={refreshing}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListHeaderComponent={this.renderHeaderView}
                                ListFooterComponent={this.renderFooterView}
                                ListEmptyComponent={this.renderEmptyView}
                            />
                        </View>
                    </View>
                )
            } else {
                return (
                    <ActivityIndicatorItem/>
                )
            }
        } else {
            return (
                <View style={styles.fundLogin}>
                    <Image source={require('../../assets/images/images/image_fund_login.png')}
                           style={styles.fundLoginImg}/>
                    <TouchableOpacity onPress={() => {
                        RouterHelper.navigate('', 'Login')
                    }} style={[GlobalStyle.submit, styles.submitbot]}><Text
                        style={GlobalStyle.btna}>登录后查看</Text></TouchableOpacity>
                </View>
            )
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBar: {
        height: 55,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 999,
        borderBottomWidth: 10,
        borderBottomColor: GlobalStyle.bgColor
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
        top: 10
    },
    fundLogin: {
        width: GlobalStyle.width,
        flex: 1,
        paddingBottom: 30,
        backgroundColor: '#fff'
    },
    fundLoginImg: {
        width: GlobalStyle.width,
        height: GlobalStyle.width * 860 / 660,
    },
    submitbot: {
        position: 'absolute',
        bottom: 0,
        width: GlobalStyle.width - 30,
        borderRadius: 0,
        height: 42
    },
    paixuList: {
        width: GlobalStyle.width,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        position: 'absolute',
        top: 40,
        left: 0,
        marginTop: 10,
        // borderTopWidth: 1,
        // borderTopColor: '#f2f2f2',
    },
    paixuItem: {
        height: 45,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    paixuText: {
        color: '#666'
    },
    paixuItemActive: {},
    paixuTextActive: {
        color: GlobalStyle.themeColor
    },
    gouxuanIco: {
        width: 20,
        height: 20,
    },
    yinying: {
        backgroundColor: 'rgba(0,0,0,.3)',
        position: 'absolute',
        width: GlobalStyle.width,
        height: GlobalStyle.height - 64 - 55 - 10,
        bottom: 0,
        top: 64 + 55 + 10,
        zIndex: 99,
    },
    shaixuanList: {
        width: GlobalStyle.width,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        position: 'absolute',
        top: 40,
        left: 0,
        marginTop: 10,

    },
    sxItem: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        paddingBottom: 12,
        marginBottom: 12,
    },
    sxItembot: {
        marginBottom: 12,
    },
    sxTitle: {
        fontSize: 15,
        color: '#666',
        marginBottom: 10,
        // marginTop: 5,
    },
    sxCon: {
        // backgroundColor: '#000'
    },
    sxKuang: {
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 7,
        paddingRight: 7,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        marginRight: 10
    },
    sxKuangText: {
        color: '#333',
        fontSize: 15
    },
    sxKuangActive: {
        borderColor: GlobalStyle.themeColor,
        backgroundColor: GlobalStyle.themeColor,
    },
    sxKuangTextActive: {
        color: '#fff',
    },
    cellInput: {
        borderRadius: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        color: '#666',
        width: 50,
        textAlign: 'center'
    },
    jizhunxian: {
        marginLeft: 10,
        marginRight: 10,
    },
    baifenhao: {
        marginLeft: 10,
        color: GlobalStyle.themeColor,
        fontWeight: 'bold'
    },
    sxbtn: {
        width: (GlobalStyle.width - 30) / 2 - 10,
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#f2f2f2',
    },
    sxbtna: {
        color: GlobalStyle.themeColor,
        fontSize: 16
    },
    sxbtnn: {
        width: (GlobalStyle.width - 30) / 2 - 10,
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        backgroundColor: GlobalStyle.themeColor,
    },
    sxbtnna: {
        color: '#fff',
        fontSize: 16
    },
    text :{
        width:80,
    },
    icon:{
        width:18,
        height:18
    }

});
