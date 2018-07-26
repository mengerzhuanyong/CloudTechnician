/**
 * 云技师 - Index
 * https://menger.me
 * @大梦
 */

'use strict';
import React from 'react'
import { View, StyleSheet, NetInfo } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Navigation from './router/Navigation'

export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._handleLoginState(); // 处理登陆状态
    }

    componentWillUnmount() {};

    _handleLoginState = async () => {
        const localData = await StorageManager.load(Constant.USER_INFO_KEY);
        console.log('本地信息--->', localData);
        if (localData.code === 1) {
            if (localData.data.token === undefined || localData.data.token === '') {
                // 未登录
                RouterHelper.reset('', 'Login');
            } else {
                // 已经登录
                this.saveUserInfo(localData.data);
                RouterHelper.reset('', 'Tab');
            }
        } else {
            // 第一次安装app
            RouterHelper.reset('', 'Login');
        }
        // SplashScreen.hide();
    };

    saveUserInfo = (userInfo) => {
        global.token = userInfo.token;
        StorageManager.save(Constant.USER_INFO_KEY, userInfo);
    };

    render() {
        return (
            <View style={styles.container} >
                <Navigation />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});