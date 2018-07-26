/**
 * 云技师 - Global
 * https://menger.me
 * @大梦
 */


'use strict';

// 项目中的图片可以通过Images.xxx 获取
import {Platform, YellowBox} from 'react-native'
import * as Tool from '../util/utilsTool'
import * as Toast from '../util/utilsToast'

import InteractionManager from '../manager/InteractionManager'
import StorageManager from '../manager/StorageManager'
import RouterHelper from '../router/RouterHelper'

import Images from './GlobalImage'
import GlobalStyle from './GlobalStyle'
import Constant from './Constant'

import ServicesApi from './GlobalApi'
import Services from '../util/utilsRequest'

import moment from 'moment'
import 'moment/locale/zh-cn'

// 本地化
moment.locale('zh-cn');

// 发布版屏蔽日志打印
if (!__DEV__) {
    global.console = {
        info: () => { },
        log: () => { },
        warn: () => { },
        debug: () => { },
        error: () => { }
    };
}

// 禁止输出警告模式
// console.disableYellowBox = true;

// 屏蔽调试警告
YellowBox.ignoreWarnings(['Remote debugger is in', 'Warning: isMounted(...)']);

// 系统是iOS
global.__IOS__ = (Platform.OS === 'ios');

// 系统是安卓
global.__ANDROID__ = (Platform.OS === 'android');

// 获取屏幕宽度
global.SCREEN_WIDTH = GlobalStyle.width;

// 获取屏幕高度
global.SCREEN_HEIGHT = GlobalStyle.height;

// 图片加载
global.Images = Images;

// 存储
global.StorageManager = StorageManager;

// 网络请求
global.Services = new Services();

// 网络接口
global.ServicesApi = ServicesApi;

// 弹窗
global.Toast = Toast;

// 时间处理
global.Moment = moment;

// 路由管理
global.RouterHelper = RouterHelper;

// 交互管理，系统的有bug,https://github.com/facebook/react-native/issues/8624
global.InteractionManager = InteractionManager;

// 全局的主题和控件的配置以及样式
global.GlobalStyle = GlobalStyle;

// 全局的主题和控件的配置以及样式
global.Constant = Constant;

// 适配字体
global.FontSize = Tool.fontSize;

// 屏幕适配
global.ScaleSize = Tool.scaleSize;

// 清楚定时器
global.ClearTimer = Tool.clearTimer;

// 清楚定时器
global.Tool = Tool;