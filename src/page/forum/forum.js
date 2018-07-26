/**
 * 云技师 - Forum
 * https://menger.me
 * @大梦
 */


'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import NavigationBar from '../../component/system/NavigationBar'
import {HorizontalLine} from "../../component/common/CommonLine";
import FlatListView from "../../component/list/FlatListView";
import CardItem from "../../component/item/CardItem";

export default class Forum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1,2],
        };
    }

    async componentDidMount() {
        // let result = await Services.Get(ServicesApi.index);
        // if (result) {
        //     Toast.toastShort(result.msg);
        // }
    };

    componentWillUnmount() {};

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    requestDataSource = async (page) => {
        let data = {
            page,
            sort: 2,
            position: 0,
            sort_column: 1,
            page_size: this.pageSize,
        };

        let result = await Services.Post(ServicesApi.jobs, data);
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
                    title = {'云技师'}
                    leftButton = {null}
                />
                <View style={styles.content}>
                    <Text
                        style={styles.textStyle}
                        onPress={() => RouterHelper.navigate('登录', 'Login', {id: '测试一下能不能用'}) }
                    >去登录</Text>
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
        backgroundColor: '#fff',
    },
    content: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: '#333',
    },
    listContent: {
        flex: 1,
        padding: 15,
    },
});