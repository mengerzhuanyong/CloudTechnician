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
export default class FundDetailDeal extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            ready: false,
            loadMore: false,
            refreshing: false,
            companyListData: this.props.thisData,
        }
    }

    // 加上这个才能接受到值
    componentWillReceiveProps(nextProps) {
        // consoleLog('poup', nextProps);
        this.setState({
            companyListData: nextProps.thisData,
        });
    }

    componentDidMount(){
        this.loadNetData();
        setTimeout(() => {
            this.updateState({
                ready: true
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

    loadNetData = () => {
    }

    dropLoadMore = () => {
        this.loadNetData();
    }

    freshNetData = () => {
        this.loadNetData();
    }

    toWebview = (title, link, compent) => {
        const { navigate } = this.props.navigation;
        navigate(compent, {
            title: title,
            link: link,
        })
    }

    renderCompanyItem = ({item}) => {
        let url = item.url;
        return (
            <TouchableOpacity onPress={() => {this.toWebview(item.name, url, 'NewsWebDetail')}} style={[styles.gonggaoList, GlobalStyle.flexRowStart]}>
                <Image source={Images.icon_fund_xieyi} style={styles.gonggaoico} />
                <Text style={styles.gonggaotext} >{item.name}</Text>
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
        return <FooterComponent />;
    }
    
    renderEmptyView = () => {
        return <EmptyComponent />;
    }

    renderSeparator = () => {
        return <View style={GlobalStyle.horLine} />;
    }

    render(){
        const { ready, refreshing, companyListData } = this.state;
        return (
            <View style={styles.container}>
            
                <ScrollView style={[GlobalStyle.whiteModule, {marginTop: 0, flex: 1}]}>
                    

                    <View style={[GlobalStyle.newsModule, {marginTop: 10, flex: 1}]}>
                        {ready ?
                            <FlatList
                                style = {styles.shopListView}
                                keyExtractor = { item => item.name}
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
    // shopListView: {
    //     flex: 1,
    //     backgroundColor: '#fff'
    // },
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
