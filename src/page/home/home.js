/**
 * 云技师 - Home
 * https://menger.me
 * @大梦
 */


'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native'

import NavigationBar from '../../component/system/NavigationBar'
import BannerComponent from "../../component/carousel/BannerComponent";
import NoticeComponent from "../../component/carousel/NoticeComponent";
import GlobalStyle from "../../constant/GlobalStyle";
import {ListRow} from "teaset";
import CardItem from "../../component/item/CardItem";
import ArticleItem from "../../component/item/ArticleItem";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bannerData: [],
            noticeData: [],
            trainData: [],
            productsData: [],
            new_number: '',
            all_number: '',
            working_number: '',
            companyData: [],
        };
    }

    componentDidMount() {
        // 获取轮播图数据
        this.loadBannerData();
        // 获取培训内容
        this.loadTrainData();
        // 获取产品内容
        this.loadProductArticleData();
        // 获取工作台数据
        this.loadWorkPlatformData();
        // 获取走近我们数据
        this.loadWalkinUs();
    };

    componentWillUnmount() {};

    // 获取轮播图数据
    loadBannerData = async () => {
        let url = ServicesApi.getBannerList;
        let result = await Services.Get(url, true);
        if (result) {
            if (result.code == 1) {
                this.setState({
                    bannerData: result.data.ad_list,
                    noticeData: result.data.ad_list,
                });
            }
        }
    };

    // 获取培训内容
    loadTrainData = async () => {
        let url = ServicesApi.getTrainChoose;
        let result = await Services.Get(url, true);
        if (result) {
            if (result.code == 1) {
                this.setState({
                    trainData: result.data.article_list,
                });
            }
        }
    };

    // 获取产品内容
    loadProductArticleData = async () => {
        let url = ServicesApi.getProductChoose;
        let result = await Services.Get(url, true);
        if (result) {
            if (result.code == 1) {
                this.setState({
                    productsData: result.data.article_list,
                });
            }
        }
    };

    // 获取工作台数据
    loadWorkPlatformData = async () => {
        let url = ServicesApi.getOrderNumber;
        let result = await Services.Get(url, true);
        if (result) {
            if (result.code == 1) {
                this.setState({
                    new_number: result.data.new_number,
                    all_number: result.data.all_number,
                    working_number: result.data.working_number,
                });
            }
        }
    };

    // 获取走近我们数据
    loadWalkinUs = async () => {
        let url = ServicesApi.getUsChoose;
        let result = await Services.Get(url, true);
        if (result) {
            if (result.code == 1) {
                this.setState({
                    companyData: result.data.article_list,
                });
            }
        }
    };

    renderListItem = (data, type) => {
        if (!data || data.length < 1) {
            return null;
        }
        let listItems = data.map((item, index) => {
            if (type === 'card') {
                return (
                    <CardItem
                        key={'listItem_' + index}
                        item={item}
                        onPress={() => RouterHelper.navigate(item.title, 'CommonWebPage', {url: item.article_url})}
                        {...this.props}
                    />
                );
            }
            return (
                <ArticleItem
                    key={'listItem_' + index}
                    item={item}
                    separator={index > 0}
                    onPress={() => RouterHelper.navigate(item.title, 'CommonWebPage', {url: item.article_url})}
                    {...this.props}
                />
            );
        });
        return <View style={styles.contentItemCon}>{listItems}</View>;
    };


    render() {
        let {bannerData, noticeData, trainData, productsData, new_number, all_number, working_number, companyData} = this.state;
        return (
            <View style={styles.container}>
                <NavigationBar
                    style={{
                        backgroundColor: 'transparent',
                    }}
                    leftButton = {null}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.contentItem}>
                        <BannerComponent
                            bannerData={bannerData}
                            {...this.props}
                        />
                        <NoticeComponent
                            noticeData={noticeData}
                            {...this.props}
                        />
                    </View>
                    <View style={styles.contentItem}>
                        <ListRow
                            icon={Images.icon_bell}
                            title={'工作台'}
                            detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('工作台', '')}
                        />
                        <View style={[styles.contentItemCon, styles.workSpaceContent]}>
                            <TouchableOpacity
                                style={styles.workSpaceItem}
                                onPress={() => RouterHelper.navigate('新派遣', '', {activeIndex: 0})}
                            >
                                <Text style={styles.workSpaceItemText}>新派遣</Text>
                                <Text style={styles.workSpaceItemText}>{new_number}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.workSpaceItem}
                                onPress={() => RouterHelper.navigate('进行中', '', {activeIndex: 0})}
                            >
                                <Text style={styles.workSpaceItemText}>进行中</Text>
                                <Text style={styles.workSpaceItemText}>{working_number}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.workSpaceItem}
                                onPress={() => RouterHelper.navigate('总订单', '', {activeIndex: 0})}
                            >
                                <Text style={styles.workSpaceItemText}>总订单</Text>
                                <Text style={styles.workSpaceItemText}>{all_number}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.contentItem}>
                        <ListRow
                            icon={Images.icon_bell}
                            title={'培训内容精选'}
                            detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('培训内容精选', '')}
                        />
                        {this.renderListItem(trainData, 'card')}
                    </View>
                    <View style={styles.contentItem}>
                        <ListRow
                            icon={Images.icon_bell}
                            title={'产品资料精选'}
                            detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('产品资料精选', '')}
                        />
                        {this.renderListItem(productsData, 'row')}
                    </View>
                    <View style={styles.contentItem}>
                        <ListRow
                            icon={Images.icon_bell}
                            title={'走进我们'}
                            detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('走进我们', '')}
                        />
                        {this.renderListItem(companyData, 'row')}
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
    content: {
        flex: 1,
        marginTop: GlobalStyle.overNavigationBar,
    },
    contentItem: {
        marginBottom: 10,
    },
    contentItemTitle: {
        color: '#333',
    },
    contentItemCon: {
        padding: 15,
        backgroundColor: '#fff',
    },

    workSpaceContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    workSpaceItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    workSpaceItemText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 24,
    },
});