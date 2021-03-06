/**
 * 云技师 - Mine
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

export default class Mine extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    };

    componentWillUnmount() {
    };

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    style={{
                        backgroundColor: GlobalStyle.themeColor,
                    }}
                    leftButton={null}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.userInfoView}>
                        <View style={styles.userAvatarView}>
                            <Image source={Images.icon_user_touxiang} style={styles.userAvatarIcon}/>
                        </View>
                        <View style={styles.userInfoCon}>
                            <View style={styles.userInfoItem}>
                                <Text style={styles.userInfoName}>{'global.user.userData.nickname'}</Text>
                            </View>
                            <View style={styles.userInfoItem}>
                                <Text style={[styles.userInfoName, styles.userInfoText]}>等级: 技师</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentItem}>
                        <ListRow
                            icon={Images.icon_bell}
                            title={'会员中心'}
                            // detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('会员中心', 'MemberCenter')}
                        />
                        <ListRow
                            icon={Images.icon_bell}
                            title={'我的资产'}
                            // detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('我的资产', 'MineAssets')}
                        />
                        <ListRow
                            icon={Images.icon_bell}
                            title={'订单管理'}
                            // detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('订单管理', 'Order')}
                        />
                        <ListRow
                            icon={Images.icon_bell}
                            title={'日期管理'}
                            // detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'none'}
                            onPress={() => RouterHelper.navigate('日期管理', 'MineDate')}
                        />
                    </View>
                    <View style={styles.contentItem}>
                        <ListRow
                            icon={Images.icon_bell}
                            title={'我的收藏'}
                            // detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'full'}
                            onPress={() => RouterHelper.navigate('我的收藏', 'MineCollect')}
                        />
                        <ListRow
                            icon={Images.icon_bell}
                            title={'设置'}
                            // detail={'更多'}
                            titleStyle={styles.contentItemTitle}
                            bottomSeparator={'none'}
                            onPress={() => RouterHelper.navigate('设置', 'Setting')}
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