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
    FlatList,
    Button
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'

import ActivityIndicatorItem from '../../components/common/ActivityIndicatorItem'

import FooterComponent from '../../components/common/footerComponent'
import EmptyComponent from '../../components/common/emptyComponent'

/**
 * 新派遣界面
 */
export default class NewSend extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    async componentDidMount() {
        await this.dropLoadMore();
        setTimeout(() => {
            this.updateState({
                ready: true,
                showFoot: 0 // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            })
        }, 0)
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

    loadNetData = (page) => {
        let url = NetApi.get_list + "?token=" + global.user.userData.token;
        let data = {
            status: 0,
            page: page
        };

        return Services.Post(url, data, true)
            .then(result => {
                // console.log(result);

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
            companyListData: this.state.companyListData.concat(result.data.order_list)
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
                companyListData: result.data.order_list
            })
        }
    }

    toWebview = (title, id, link, compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            title: title,
            id: id,
            link: link,
        })
    }

    toPage = (id, compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            id:id,
        })
    }

    renderCompanyItem = ({item}) => {
        let id=item.id
        return (
            <TouchableOpacity style={{backgroundColor:'#fff',padding:15,marginTop:10}} onPress={() => {this.toPage(id,'OrderDetail')}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{}}>
                            <Text style={{padding:3,color:'#617995',fontSize:18,fontWeight:'bold'}}>{item.server_type_name}</Text>
                            <Text style={{padding:3,color:'#000',marginTop:5}}>时间：{item.server_time}</Text>
                            <Text style={{padding:3,color:'#000',width:250}}>地点：{item.server_address}</Text>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => {this.takeOrder(item)}}>
                            <Text style={{textAlign:'center',paddingTop:5,paddingBottom:5,paddingLeft:8,paddingRight:8,backgroundColor:'#5c7091',borderRadius:5, color:'#fff'}}>接 单</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.cancleOrder(item)}}>
                            <Text style={{textAlign:'center',paddingTop:5,paddingBottom:5,paddingLeft:8,paddingRight:8,borderWidth:1,borderRadius:5,borderColor:'#5c7091', color:'#5c7091',marginTop:5}}>拒 绝</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                {/*</View>*/}
            </TouchableOpacity>
        )
    }

    takeOrder = (item)=>{

        let url = NetApi.changeOrderStatus + "?token=" + global.user.userData.token;
        let data = {
            id: item.id,
            status: '1'
        };

        return Services.Post(url, data, true)
            .then(result => {
                // console.log(result);
                if(result.code==1){
                    this.freshNetData()
                }


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

    cancleOrder=(item)=>{
        let url = NetApi.changeOrderStatus + "?token=" + global.user.userData.token;
        let data = {
            id: item.id,
            status: '-1'
        };

        return Services.Post(url, data, true)
            .then(result => {
                // console.log(result);
                if(result.code==1){
                    this.freshNetData()
                }


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




    renderHeaderView = () => {
        return (
            <View style={styles.shopListViewTitle}>

            </View>
        )
    }

    renderFooterView = () => {
        return <FooterComponent status={this.state.showFoot}/>;
    }

    renderEmptyView = () => {
        // Toast.toastShort("暂无数据")
        return this.state.showFoot === 0 && <EmptyComponent emptyTips={'抱歉，没有符合条件的结果显示'}/>;
    }

    renderSeparator = () => {
        return <View style={GlobalStyle.horLine}/>;
    }

    render() {
            const {ready, error, refreshing, companyListData} = this.state;
        return (
            <View style={styles.container}>

                <View style={[ {backgroundColor: '#f5f5f5', flex: 1}]}>
                    {ready ?
                        <FlatList
                            style={styles.shopListView}
                            keyExtractor={item => item.id}
                            data={companyListData}
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
                        : <ActivityIndicatorItem/>
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
    btn: {
        padding: 2,
        color: '#ffffff',
        backgroundColor: '#597290',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#597290',
    },
    btnsec: {
        padding: 2,
        color: '#597290',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        borderColor: '#597290',
        borderWidth: 1
    },
});
