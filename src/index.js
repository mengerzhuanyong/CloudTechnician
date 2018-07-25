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
        // this._handleLoginState(); // 处理登陆状态
    }

    componentWillUnmount() {};

    _handleLoginState = async () => {
        const {loginStore} = this.props;
        const {token} = loginStore.userInfo;
        const localRes = await StorageManager.load(Constant.USER_INFO_KEY);
        if (localRes.code === 1) {
            if (localRes.data.token === undefined || localRes.data.token === '') {
                // 未登录
                // RouterHelper.reset('Login');
            } else {
                // 已经登录
                loginStore.saveUserInfo(localRes.data);
                RouterHelper.reset('Tab');
            }
        } else {
            // 第一次安装app
            // RouterHelper.reset('Login');
        }
        SplashScreen.hide();
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