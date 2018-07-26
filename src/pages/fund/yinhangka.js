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
    FlatList,
    DeviceEventEmitter
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'

import ActivityIndicatorItem from '../../components/common/ActivityIndicatorItem'

import EmptyComponent from '../../components/common/emptyComponent'

export default class Yinhangka extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            ready: false,
            loadMore: false,
            refreshing: false,
            companyListData: [],
            token: '',
            fromtixianpage:params.fromtixianpage,
        }
    }

    async componentWillMount() {
        let result = await storage.load({
            key: 'loginState',
        });
        this.updateState({
            loginState: true,
            token: result.token,
        })
        this.loadNetData();
        setTimeout(() => {
            this.updateState({
                ready: true
            })
        }, 0)
    }

    onBack = () => {
        // this.props.navigation.state.params.onCallBack();
        this.props.navigation.goBack();
    }

    componentWillUnmount = () => {
        this.onBack();

    }

    updateState = (state) => {
        if (!this) {
            return
        }
        ;
        this.setState(state);
    }


    onPushNavigator = (compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            onCallBack: () => {
                this.loadNetData();
            }
        })
    }

    loadNetData = () => {

        let url = NetApi.get_bank_card + "?token=" + global.user.userData.token;

        Services.Get(url)
            .then(result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.updateState({
                        companyListData: result.data.bank_list,
                    })
                } else {
                    // Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                // console.log(error);
                // Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    dropLoadMore = () => {
        this.loadNetData();
    }

    freshNetData = () => {
        this.loadNetData();
    }

    renderCompanyItem = ({item}) => {
        let bank_number = item.bank_number;
        let id=item.id;
        return (
            this.state.fromtixianpage==1?
                <TouchableOpacity onPress={() => {
                    DeviceEventEmitter.emit('tixianka', {num:bank_number,id:id});this.onBack()
                }}>
                    <View style={styles.bankItem}>
                        <View style={[styles.bankTop, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.bankTit}>{item.bank_name}</Text>
                            {/*<TouchableOpacity  style={[styles.bankDefault, GlobalStyle.flexRowStart]}>*/}
                            {/*<View style={[styles.bankRadio,]}>*/}
                            {/*{item.is_default === 1 ? <View style={styles.bankRadioActive}></View> : null }*/}
                            {/*</View>*/}
                            {/*<Text style={styles.bankDefaultText}>默认银行卡</Text>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        <View style={[styles.bankMid, GlobalStyle.flexRowStart]}>
                            <Text style={styles.bankNumber}>{bank_number}</Text>
                        </View>
                        <Text style={styles.bankBot}>{item.bank_addr}</Text>
                    </View>
                </TouchableOpacity>
                :
                    <View style={styles.bankItem}>
                        <View style={[styles.bankTop, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.bankTit}>{item.bank_name}</Text>
                            {/*<TouchableOpacity  style={[styles.bankDefault, GlobalStyle.flexRowStart]}>*/}
                            {/*<View style={[styles.bankRadio,]}>*/}
                            {/*{item.is_default === 1 ? <View style={styles.bankRadioActive}></View> : null }*/}
                            {/*</View>*/}
                            {/*<Text style={styles.bankDefaultText}>默认银行卡</Text>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        <View style={[styles.bankMid, GlobalStyle.flexRowStart]}>
                            <Text style={styles.bankNumber}>{bank_number}</Text>
                        </View>
                        <Text style={styles.bankBot}>{item.bank_addr}</Text>
                    </View>



        )
    }

    renderHeaderView = () => {
        return (
            <View style={styles.shopListViewTitle}>

            </View>
        )
    }

    renderFooterView = () => {
        return <FooterComponent/>;
    }

    renderEmptyView = () => {
        return <EmptyComponent/>;
    }

    renderSeparator = () => {
        return <View style={GlobalStyle.horLine}/>;
    }

    render() {
        const {ready, refreshing, companyListData} = this.state;
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'绑定银行卡'}
                    style={navigationBar}
                    titleStyle={{color: '#333333'}}
                    leftButton={UtilsView.getLeftBlackButton(() => this.onBack())}
                />
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent={true}
                    barStyle={'dark-content'}
                />
                <View style={styles.bankList}>
                    {ready ?
                        <FlatList
                            style={styles.shopListView}
                            keyExtractor={item => item.id}
                            data={companyListData}
                            extraData={this.state}
                            renderItem={(item) => this.renderCompanyItem(item)}
                            onEndReachedThreshold={0.1}
                            onEndReached={(info) => this.dropLoadMore(info)}
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
                <TouchableOpacity onPress={() => {
                    Toast.toastShort('温馨提示：暂不支持绑定信用卡，请绑定您常用的银行借记卡!', 5000);
                    RouterHelper.navigate('', 'AddBank')
                }} style={[styles.addBank, GlobalStyle.flexRowCenter]}>
                    {/*<Image source={require('../../assets/images/icons/icon_addbank.png')} style={styles.addIco} />*/}
                    <Text style={styles.addText}>添加银行卡</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    bankList: {
        paddingTop: 10,
        padding: 15,
        flex: 1,
    },
    bankItem: {
        padding: 15,
        borderRadius: 6,
        backgroundColor: GlobalStyle.themeColor,
        marginBottom: 15,
        paddingTop: 5
    },
    bankTop: {
        marginTop: 2,
        // marginBottom: 10
    },
    bankTit: {
        color: '#fff',
        fontSize: 16,
    },
    bankDefault: {
        // backgroundColor: '#000',
        padding: 10,
        paddingRight: 0
    },
    bankRadio: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10,
        marginRight: 5,
        position: 'relative',
    },
    bankRadioActive: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        top: 2,
        left: 2,

    },
    bankDefaultText: {
        color: '#fff',
        fontSize: 16,
    },
    bankMid: {
        marginBottom: 10
    },
    bankNumber: {
        color: '#fff',
        fontSize: 28,
        marginRight: 10,
    },
    bankBot: {
        color: '#fff',
        fontSize: 16
    },
    addBank: {
        backgroundColor: '#fff',
        width: GlobalStyle.width,
        borderRadius: 6,
        height: 60,
        marginTop: -10
    },
    addIco: {
        width: 26,
        height: 26,
        marginRight: 6
    },
    addText: {
        color: '#666',
        fontSize: 17,
        color: GlobalStyle.themeColor,
    },
});
