/**
 * 云技师 - MineCollect
 * https://menger.me
 * @大梦
 */


'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, Image,
} from 'react-native'

import NavigationBar from '../../component/system/NavigationBar'
import {HorizontalLine, VerticalLine} from "../../component/common/CommonLine";
import FlatListView from "../../component/list/FlatListView";
import CardItem from "../../component/item/CardItem";

export default class MineCollect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: 'desc',
            listData: [1,2],
        };
        this.page = 1;
        this.pageSize = 10;
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.requestDataSource(this.page);
        })
    };

    componentWillUnmount() {};

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    requestDataSource = async (page) => {
        let {sort} = this.state;
        let data = {
            page,
            cate_id: 1,
            desc: sort,
            page_size: this.pageSize,
        };

        let result = await Services.Post(ServicesApi.getArticleList, data, true);
        let endStatus = false;
        if (result && result.code === 1) {
            endStatus = result.data.list_data.length < data.page_size;
        } else {
            endStatus = true;
        }
        this.flatListRef && this.flatListRef.stopRefresh();
        this.flatListRef && this.flatListRef.stopEndReached({allLoad: endStatus});
    };

    _onRefresh = (stopRefresh) => {
        this.page = 1;
        this.requestDataSource(this.page);
    };

    _onEndReached = (stopEndReached) => {
        this.page++;
        this.requestDataSource(this.page);
    };

    _renderSeparator = () => {
        return <HorizontalLine style={styles.horLine} />;
    };

    _renderListItem = ({item}) => {
        return (
            <CardItem
                item={item}
                onPress={() => RouterHelper.navigate(item.title, 'CommonWebPage', {url: item.article_url})}
                {...this.props}
            />
        );
    };

    render() {
        let {listData} = this.state;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'云社区'}
                    leftButton = {null}
                />
                <View style={[styles.sortBtnView, GlobalStyle.flexRowBetween]}>
                    <TouchableOpacity
                        style={styles.sortBtnItem}
                        onPress={() => RouterHelper.navigate('登录', 'Login', {id: '测试一下能不能用'}) }
                    >
                        <Image source={Images.icon_bell} style={styles.sortBtnIcon} />
                        <Text style={styles.sortBtnName}>去登录</Text>
                    </TouchableOpacity>
                    <VerticalLine lineStyle={styles.sortVerLine}/>
                    <TouchableOpacity
                        style={styles.sortBtnItem}
                        onPress={() => RouterHelper.navigate('登录', 'Login', {id: '测试一下能不能用'}) }
                    >
                        <Image source={Images.icon_bell} style={styles.sortBtnIcon} />
                        <Text style={styles.sortBtnName}>去登录</Text>
                    </TouchableOpacity>
                </View>
                <FlatListView
                    style={styles.listContent}
                    initialRefresh={false}
                    ref={this._captureRef}
                    removeClippedSubviews={false}
                    data={listData}
                    renderItem={this._renderListItem}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this._onEndReached}
                    onRefresh={this._onRefresh}
                    // ItemSeparatorComponent={this._renderSeparator}
                    // ListHeaderComponent={this._renderHeaderComponent}
                />
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
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortBtnView: {
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    sortVerLine: {
        height: 15,
        marginHorizontal: 15,
        backgroundColor: '#333',
    },
    sortBtnItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortBtnIcon: {
        width: 25,
        height: 25,
        marginRight: 5,
        resizeMode: 'contain',
    },
    sortBtnName: {
        fontSize: 16,
        color: '#333',
    },
    listContent: {
        flex: 1,
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
});