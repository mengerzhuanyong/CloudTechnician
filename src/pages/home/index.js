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
    StatusBar,
    Modal,
} from 'react-native'


import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';


import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'

import Video from 'react-native-video';
import BannerView from '../../components/common/Banner'
import OrderManage from "../invest/OrderManage";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            homeData: [],
            about_us: [],
            fund: [],
            notice: [],
            article: [],
            banner: [],
            loginState: false,
            videoSource: '',
            isPlay: false,
            modalVisible: false,
            token: '',
            new_number:'',
            working_number:'',
            all_number:''
        }
    }

    async componentWillMount() {
        try {
            let result = await storage.load({
                key: 'loginState',
            });
            // console.log(result);
            // this.getInvestData(result.id, result.token);
            // this.loadNetData(result.id);
            this.updateState({
                loginState: true,
                token: result.token,
            })
            //获取轮播图数据
            await this.loadBannerData(result.token);
            //获取培训内容
            await this.loadTrainData(result.token);
            //获取产品内容
            await this.loadProductArticleData(result.token);
            //获取工作台数据
            await this.loadWorkPlatformData(result.token);
            //获取走近我们数据
            await this.loadWalkinUs(result.token)


        } catch (error) {
            // console.log(error);
            this.updateState({
                loginState: false
            })
        }

    }

    async componentDidMount() {
        // this.loadNetData();
        //获取轮播图数据
        // await  this.loadBannerData(this.state.token);
        // await this.loadProductArticleData(this.state.token);
        // await this.loadTrainData(result.token)
        setTimeout(() => {
            this.updateState({
                ready: true,
            })
        }, 0);


    }

    //获取bannner图数据
    loadBannerData = (token) => {
        let url = NetApi.BannerList;
        let data = {
            token: token,
        };
        Services.Get(url, data)
            .then(result => {

                this.updateState({
                    banner: result.data.ad_list,
                });
            })
            .catch(error => {
                // consoleLog('链接服务器出错，请稍后重试', error);
            })
    }
    //获取产品内容数据
    loadProductArticleData = (token) => {
        let url = NetApi.ArticProductlList+"?token="+global.user.userData.token;
        Services.Get(url)
            .then(result => {

                this.updateState({
                    article: result.data.article_list,
                });
            })
            .catch(error => {
                // consoleLog('链接服务器出错，请稍后重试', error);
            })

    }

    //获取培训内容数据
    loadTrainData = (token) => {
        let url = NetApi.TrainList+"?token="+global.user.userData.token;
        Services.Get(url)
            .then(result => {

                this.updateState({
                    fund: result.data.article_list,
                });
            })
            .catch(error => {
                // consoleLog('链接服务器出错，请稍后重试', error);
            })

    }

    loadWorkPlatformData=(token)=>{
        let url = NetApi.getOrderNumber+"?token="+global.user.userData.token;
        Services.Get(url)
            .then(result => {

                this.updateState({
                    new_number: result.data.new_number,
                    working_number:result.data.working_number,
                    all_number:result.data.all_number
                });
            })
            .catch(error => {
                // consoleLog('链接服务器出错，请稍后重试', error);
            })
    }
    //获取走进我们数据
    loadWalkinUs=(token)=>{

        let url = NetApi.getUsChoose+"?token="+global.user.userData.token;
        Services.Get(url)
            .then(result => {

                this.updateState({
                    about_us: result.data.article_list,
                });
            })
            .catch(error => {
                consoleLog('链接服务器出错，请稍后重试', error);
            })

    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState = (state) => {
        if (!this) {
            return
        }
        ;
        this.setState(state);
    }


    componentWillUnmount = () => {
        this.updateState({
            isPlay: false
        })
    }

    videoPlay = () => {
        this.updateState({
            isPlay: !this.state.isPlay
        })
    }

    onPushNavigator = (compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            onCallBack: () => {
                this.loadBannerData(result.token);
                // this.loadProductArticleData(result.token);
            }
        })
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
                // this.loadNetData(global.user.userData.id);
                this.loadBannerData(result.token);
                // this.loadProductArticleData(result.token);
            }
        })
    }

    toWebview = (link,content_id,is_collection, compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            link: link,
            content_id:content_id,
            is_collection:is_collection

        })
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent={true}
                    barStyle={'light-content'}
                />

                <ScrollView>
                    <BannerView bannerData={this.state.banner} {...this.props} />

                    <TouchableOpacity onPress={() => {
                        // this.toWebview(this.state.notice.notice_url, 'NewsWebDetail')
                    }} style={[styles.gonggao, GlobalStyle.flexRowStart]}>
                        <Image source={Images.icon_gonggao}
                               style={styles.gonggaoimg}/>
                        <Text style={styles.gonggaotext}>新版本即将于5月31日上线</Text>
                    </TouchableOpacity>

                    <View style={GlobalStyle.whiteModule}>
                        <View style={[GlobalStyle.titleModule, GlobalStyle.flexRowBetween]}>
                            <View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStart]}>
                                <Image source={Images.icon_index_jijinjingxuan}
                                       style={GlobalStyle.titleIcon}/>
                                <Text style={GlobalStyle.titleText}>工作台</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                RouterHelper.navigate('', 'OrderManage')
                            }} style={[GlobalStyle.titleRight, GlobalStyle.flexRowStart]}>
                                <Text style={GlobalStyle.titleMoreText}>更多</Text>
                                <Image source={Images.icon_index_more}
                                       style={GlobalStyle.titleMoreIcon}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={GlobalStyle.firstMiddle}>
                            <View style={[GlobalStyle.fundBot, GlobalStyle.flexRowBetween]}>
                                <View style={[GlobalStyle.fundLeft, GlobalStyle.flexColumnCenter]}>
                                    <Text style={[GlobalStyle.fundLeftValue]}>新派遣<Text
                                        style={{fontSize: 14}}></Text></Text>
                                    <Text style={[GlobalStyle.fundLeftKey, styles.selffont]}>{this.state.new_number}</Text>
                                </View>
                                <View style={[GlobalStyle.fundCenter, GlobalStyle.flexColumnCenter]}>
                                    <Text style={GlobalStyle.fundCenterValue}>进行中</Text>
                                    <Text style={[GlobalStyle.fundCenterKey, styles.selffont]}>{this.state.working_number}</Text>
                                </View>
                                <View style={[GlobalStyle.fundRight, GlobalStyle.flexColumnCenter]}>
                                    <Text style={[GlobalStyle.fundCenterValue]}>总订单</Text>
                                    <Text style={[GlobalStyle.fundRightKey, styles.selffont]}>{this.state.all_number}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={GlobalStyle.whiteModule}>
                        <View style={[GlobalStyle.titleModule, GlobalStyle.flexRowBetween]}>
                            <View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStart]}>
                                <Image source={Images.icon_peixun}
                                       style={GlobalStyle.titleIcon}/>
                                <Text style={GlobalStyle.titleText}>培训内容精选</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                RouterHelper.navigate('', 'Fund')
                            }} style={[GlobalStyle.titleRight, GlobalStyle.flexRowStart]}>
                                <Text style={GlobalStyle.titleMoreText}>更多</Text>
                                <Image source={Images.icon_index_more}
                                       style={GlobalStyle.titleMoreIcon}/>
                            </TouchableOpacity>
                        </View>
                        {this.homeFund(this.state.fund)}
                    </View>

                    <View style={GlobalStyle.whiteModule}>
                        <View style={[GlobalStyle.titleModule, GlobalStyle.flexRowBetween]}>
                            <View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStart]}>
                                <Image source={Images.icon_product}
                                       style={GlobalStyle.titleIcon}/>
                                <Text style={GlobalStyle.titleText}>产品资料精选</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                RouterHelper.navigate('', 'Fund')
                            }} style={[GlobalStyle.titleRight, GlobalStyle.flexRowStart]}>
                                <Text style={GlobalStyle.titleMoreText}>更多</Text>
                                <Image source={Images.icon_index_more}
                                       style={GlobalStyle.titleMoreIcon}/>
                            </TouchableOpacity>
                        </View>
                        {this.homeInvest(this.state.article)}
                    </View>

                    <View style={GlobalStyle.whiteModule}>
                        <View style={[GlobalStyle.titleModule, GlobalStyle.flexRowBetween]}>
                            <View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStart]}>
                                <Image source={Images.icon_goin}
                                       style={GlobalStyle.titleIcon}/>
                                <Text style={GlobalStyle.titleText}>走进我们</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.toWebview('http://yuntu.3todo.com/index/article/info/id/3', '', '', 'NewsWebDetail')
                            }} style={[GlobalStyle.titleRight, GlobalStyle.flexRowStart]}>
                                <Text style={GlobalStyle.titleMoreText}>更多</Text>
                                <Image source={Images.icon_index_more}
                                       style={GlobalStyle.titleMoreIcon}/>
                            </TouchableOpacity>
                        </View>
                        {this.homeAbout(this.state.about_us)}
                    </View>

                    {/*<Modal*/}
                    {/*animationType={"none"}*/}
                    {/*transparent={false}*/}
                    {/*visible={this.state.modalVisible}*/}
                    {/*>*/}
                    {/*<TouchableOpacity style={styles.modalCeng} onPress={() => {*/}
                    {/*this.setModalVisible(false)*/}
                    {/*}}>*/}
                    {/*<Image source={Images.modal} resizeMode="stretch"*/}
                    {/*style={styles.modalpic}/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</Modal>*/}


                </ScrollView>
            </View>
        );
    }


    homeFund(data) {
        // console.log(global.user.loginState);
        if (this.state.loginState) {
            // console.log(data);
            if (data.length > 0) {
                let fundList = [];
                for (var i = 0; i < data.length; i++) {
                    // let id = data[i].id;
                    // let title = data[i].title;
                    // let datum_rate = data[i].datum_rate;
                    // let buy_end_day = data[i].buy_end_day;
                    // let buy_end_money = data[i].buy_end_money;
                    // let time_limit = data[i].time_limit;
                    // let start_buy_money = data[i].start_buy_money;
                    // let end_people = data[i].end_people;
                    // let is_collection = data[i].is_collection;
                    // consoleLog('id', id);
                    let content_url = data[i].article_url;
                    let content_id=data[i].id;
                    let is_collection=data[i].is_collection;
                    let fundItem = (
                        <TouchableOpacity key={i} onPress={() => {
                            this.toWebview(content_url,content_id,is_collection, 'NewsWebDetail')
                        }} style={GlobalStyle.fundList}>
                            <View style={[GlobalStyle.fundTop, GlobalStyle.flexRowBetween]}>
                                <Text style={GlobalStyle.fundTitle}>{data[i].title}</Text>
                                {/*<Text style={GlobalStyle.fundDakuan}>截止打款{data[i].buy_end_day}天</Text>*/}
                            </View>
                            <View style={GlobalStyle.fundMid}>
                                <Image source={{uri: data[i].thumb}} style={GlobalStyle.fundThumb}/>
                            </View>
                            <View style={[GlobalStyle.fundBot, GlobalStyle.flexRowBetween]}>
                                <View style={GlobalStyle.userlistleft}>
                                    <Image source={Images.icon_shoucang_item} style={styles.icon} />
                                </View>
                                <View style={GlobalStyle.userlistright}>
                                    <Text style={GlobalStyle.userlisttext}>{data[i].views}</Text>
                                    <Text  style={styles.text} >{data[i].create_time}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                    fundList.push(fundItem);
                }
                return (
                    <View style={GlobalStyle.fundModule}>
                        {fundList}
                    </View>
                );
            } else {
                return <View style={[GlobalStyle.whiteModule, {height: 360}]}></View>
            }
        } else {
            if (data.length > 0) {
                let fundList = [];
                for (var i = 0; i < data.length; i++) {
                    let fundItem = (
                        <TouchableOpacity key={i} onPress={() => {
                            this.onPushToFundDetail('Login')
                        }} style={GlobalStyle.fundList}>
                            <View style={[GlobalStyle.fundTop, GlobalStyle.flexRowBetween]}>
                                <Text style={GlobalStyle.fundTitle}>{data[i].title}</Text>
                                <Image source={Images.image_index_mohu1}
                                       style={GlobalStyle.fundMohu1}/>
                            </View>
                            <View style={GlobalStyle.fundMid}>
                                <Image source={{uri: data[i].photo}} style={GlobalStyle.fundThumb}/>
                            </View>
                            <View style={[GlobalStyle.fundBot, GlobalStyle.flexRowBetween]}>
                                <Image source={Images.image_index_mohu}
                                       style={GlobalStyle.fundMohu}/>
                            </View>
                        </TouchableOpacity>
                    )
                    fundList.push(fundItem);
                }
                return (
                    <View style={GlobalStyle.fundModule}>
                        {fundList}
                    </View>
                );
            } else {
                return <View style={[GlobalStyle.whiteModule, {height: 360}]}></View>
            }
        }
    }

//{/*<Image source={Images.images_index_video} style={GlobalStyle.videoImg} />*/}
    homeAbout(data) {
        let aboutList = [];
        for (var i = 0; i < data.length; i++) {
            let content_url = data[i].article_url;
            let id=data[i].id;
            let isCollection=data[i].is_collection;
            let aboutItem = (
                <TouchableOpacity key={i} onPress={() => {
                    this.toWebview(content_url,id,isCollection, 'NewsWebDetail')
                }} style={[GlobalStyle.newsList, GlobalStyle.flexRowStart]}>
                    <View style={GlobalStyle.newsLeft}>
                        <Image source={{uri: data[i].thumb}} style={GlobalStyle.newsThumb}/>
                    </View>
                    <View style={[GlobalStyle.newsRight, GlobalStyle.flexColumnBetweenStart]}>
                        <Text style={GlobalStyle.newsTitle}>{data[i].title}</Text>
                        <Text style={GlobalStyle.newsDesc}>{data[i].remark}</Text>
                        <View style={[GlobalStyle.newsInfo, GlobalStyle.flexRowBetween]}>
                            <Text style={GlobalStyle.newsDate}>{data[i].create_time}</Text>
                            <View style={[GlobalStyle.newsClick, GlobalStyle.flexRowStart]}>
                                <Text style={GlobalStyle.newsClickNum}>{data[i].views}</Text>
                                <Text style={GlobalStyle.newsClickText}>阅读</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
            aboutList.push(aboutItem);
        }
        return (
            <View style={GlobalStyle.newsModule}>
                {aboutList}
            </View>
        )

    }


    homeInvest(data) {
        let investList = [];
        for (var i = 0; i < data.length; i++) {
            let content_url = data[i].article_url;
            let content_id=data[i].id;
            let is_collection=data[i].is_collection
            let investItem = (
                <TouchableOpacity key={i} onPress={() => {
                    this.toWebview(content_url,content_id,is_collection, 'NewsWebDetail')
                }} style={[GlobalStyle.newsList, GlobalStyle.flexRowStart,]}>
                    <View style={GlobalStyle.newsLeft}>
                        <Image source={{uri: data[i].thumb}} style={GlobalStyle.newsThumb}/>
                    </View>
                    <View style={[GlobalStyle.newsRight, GlobalStyle.flexColumnBetweenStart]}>
                        <Text style={GlobalStyle.newsTitle}>{data[i].title}</Text>
                        <Text style={GlobalStyle.newsDesc}>{data[i].remark}</Text>
                        <View style={[GlobalStyle.newsInfo, GlobalStyle.flexRowBetween]}>
                            <Text style={GlobalStyle.newsDate}>{data[i].create_time}</Text>
                            <View style={[GlobalStyle.newsClick, GlobalStyle.flexRowStart]}>
                                <Text style={GlobalStyle.newsClickText}>阅读</Text>
                                <Text style={GlobalStyle.newsClickNum}>{data[i].views}</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
            investList.push(investItem);
        }
        return (
            <View style={GlobalStyle.newsModule}>
                {investList}
            </View>
        )

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    gonggao: {
        backgroundColor: '#fff',
        height: 45,
        paddingLeft: 15,
        paddingRight: 15,
    },
    gonggaoimg: {
        width: 19,
        height: 19 * 60 / 64,
        marginRight: 10
    },
    gonggaotext: {
        flex: 1,
        color: '#888888',
        fontSize: 15
    },
    fundLogin: {
        width: GlobalStyle.width,
        flex: 1,
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
    backgroundVideo: {
        width: GlobalStyle.width - 30,
        height: (GlobalStyle.width - 30) * 460 / 800,
        backgroundColor: '#000',
        borderRadius: 3
    },
    play: {
        position: 'absolute',
        top: (GlobalStyle.width - 30) * 460 / 800 / 2,
        left: (GlobalStyle.width - 30) / 2,
        marginLeft: -35,
        marginTop: -35,
        width: 70,
        height: 70
    },
    playico: {
        width: 70,
        height: 70,
    },
    video: {
        margin: 15,
        marginBottom: 5,
        borderRadius: 3
    },
    modalpic: {
        width: GlobalStyle.width,
        height: GlobalStyle.height
    },
    modalCeng: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: GlobalStyle.width,
        height: GlobalStyle.height,
    },
    selffont: {
        fontSize: 20,
        color: "#597290"
    },
    selfimage :{
        width:15,
        height:15,
        margin:5
    },
    text :{
        width:80,
    },
    icon:{
        width:18,
        height:18
    }
});