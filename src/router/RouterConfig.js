/**
 * 云技师 - RouterConfig
 * https://menger.me
 * @大梦
 */

'use strict';

import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import {configRouter, tabOptions} from './RouterTool'

import Home from '../page/home/home'
import Mine from '../page/mine/mine'
import Forum from '../page/forum/forum'

import Login from '../page/login/login'
import Register from '../page/login/register'
import RetrievePassword from '../page/login/retrievePassword'

import CommonWebPage from '../page/common/commonWebPage'

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: tabOptions({
            title: '首页',
            normalIcon: Images.icon_tabbar_home,
            selectedIcon: Images.icon_tabbar_home_cur
        })
    },
    Forum: {
        screen: Forum,
        navigationOptions: tabOptions({
            title: '云社区',
            normalIcon: Images.icon_tabbar_forum,
            selectedIcon: Images.icon_tabbar_forum_cur
        })
    },
    Mine: {
        screen: Mine,
        navigationOptions: tabOptions({
            title: '我的',
            normalIcon: Images.icon_tabbar_mine,
            selectedIcon: Images.icon_tabbar_mine_cur
        })
    },
}, {
    initialRouteName: 'Home',
    tabBarOptions: {
        showIcon: true,
        indicatorStyle: {height: 0},
        activeTintColor: GlobalStyle.themeColor,
        style: {
            backgroundColor: '#fff'
        },
        tabStyle: {
            margin: 2,
        },
    },
    lazy: true, //懒加载
    swipeEnabled: false,
    animationEnabled: false, //关闭安卓底栏动画
    tabBarPosition: 'bottom',
});

const StackNavigator = createStackNavigator(configRouter({
    Tab: {screen: TabNavigator},
    CommonWebPage: {screen: CommonWebPage},

    Login: {screen: Login},
    Register: {screen: Register},
    RetrievePassword: {screen: RetrievePassword},
}), {
    initialRouteName: 'Login',
    cardStyle: {
        shadowOpacity: 0,
        shadowRadius: 0,
        backgroundColor: GlobalStyle.pageBackgroundColor,
    },
    navigationOptions: {
        header: null,
        gesturesEnabled: true
    },
    transitionConfig: () => {
        return {
            screenInterpolator: (sceneProps) => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps)
            },
        }
    }
});

export {StackNavigator};
