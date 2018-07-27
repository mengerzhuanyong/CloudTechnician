/**
 * 云技师 - MemberCenter
 * https://menger.me
 * @大梦
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet, Image, ScrollView,
} from 'react-native'
import {ListRow} from "teaset";
import NavigationBar from "../../component/system/NavigationBar";

export default class MemberCenter extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    };

    componentWillUnmount() {
    };

    render() {
        const {params} = this.props.navigation.state;
        const pageTitle = params && params.pageTitle ? params.pageTitle : '会员中心';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.contentItem}>
                        <ListRow
                            icon={Images.icon_bell}
                            title={'个人信息'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('个人信息', '')}
                        />
                        <ListRow
                            icon={Images.icon_bell}
                            title={'银行卡管理'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('银行卡管理', '')}
                        />
                        <ListRow
                            icon={Images.icon_bell}
                            title={'修改密码'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('修改密码', '')}
                        />
                        <ListRow
                            icon={Images.icon_bell}
                            title={'关于我们'}
                            // detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'none'}
                            onPress={() => RouterHelper.navigate('关于我们', 'CommonWebPage', {url: ''})}
                        />
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
    textStyle: {
        fontSize: 16,
        color: '#fff',
    },
    userInfoView: {
        height: 100,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: GlobalStyle.themeColor,
    },
    userAvatarView: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    userAvatarIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    userInfoCon: {},
    userInfoItem: {},
    userInfoName: {
        fontSize: 15,
        color: '#fff',
        lineHeight: 24,
    },
    userInfoText: {
        fontSize: 13,
    },

    contentItem: {
        marginTop: 10,
    },
    contentItemTitle: {
        color: '#333',
    },
    contentItemCon: {
        padding: 15,
        backgroundColor: '#fff',
    },
});