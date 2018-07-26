/**
 * 云技师 - NavigationBar
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Platform,
    StatusBar,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import UtilsView from "../../util/utilsView";

const NAV_BAR_HEIGHT_IOS = GlobalStyle.statusBar_Height_Ios;
const NAV_BAR_HEIGHT_ANDROID = GlobalStyle.statusBar_Height_Android;
const STATUS_BAR_HEIGHT = 20;

const ButtonShape = {
    title: PropTypes.string.isRequired,
    style: PropTypes.any,
    handler: PropTypes.func,
};
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default', 'dark-content']),
    networkActivityIndicatorVisible: PropTypes.bool,
    showHideTransition: PropTypes.oneOf(['fade', 'slide']),
    hidden: PropTypes.bool,
    translucent: PropTypes.bool,
    backgroundColor: PropTypes.string,
    animated: PropTypes.bool
};

export default class NavigationBar extends Component {

    static propTypes = {
        style: PropTypes.object,
        titleLayoutStyle: PropTypes.object,
        navigator: PropTypes.object,
        leftButtonTitle: PropTypes.string,
        popEnabled: PropTypes.bool,
        onLeftButtonClick: PropTypes.func,
        title: PropTypes.string,
        titleView: PropTypes.element,
        rightButtonView: PropTypes.element,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),
        rightButton2: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),
        leftButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),
    };

    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
            translucent: false,
            animated: false,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            popEnabled: true,
            hide: false
        };
    }

    leftView() {
        const leftView = this.props.leftButtonTitle ?
            <Text style={styles.title}>{this.props.leftButtonTitle}</Text> : null;
        return (
            <TouchableOpacity
                onPress={() => this.onLeftButtonClick()}>
                <View style={{width: 50, alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    {this.props.leftView ? this.props.leftView : leftView}
                </View>
            </TouchableOpacity>
        )
    }

    onLeftButtonClick() {
        if (this.props.onLeftButtonClick) {
            this.props.onLeftButtonClick();
        } else {
            RouterHelper.goBack();
        }
    }

    getButtonElement(type, data = {}, style) {
        let showLeftBtn = data === {} || data === null || data === undefined;
        if (type === 'leftBtn' && !showLeftBtn) {
            data = UtilsView.getLeftButton(() => RouterHelper.goBack());
        }
        if (data === null) {
            return null;
        }
        return (
            <View style={styles.navBarButton}>
                {(data.props) ? data : (
                    <NavBarButton
                        title={data.title}
                        style={[data.style, style]}
                        tintColor={data.tintColor}
                        disabled={data.disabled}
                        handler={data.handler}
                    />
                )}
            </View>
        );
    }

    renderStatusBar = () => {
        let {statusBar} = this.props;
        if (statusBar.hidden) {
            return null;
        }
        let barStyle = statusBar.barStyle ? statusBar.barStyle : 'light-content';
        return (
            <View style={styles.statusBar}>
                <StatusBar
                    {...this.props.statusBar}
                    translucent={true}
                    barStyle={barStyle}
                    style={styles.statusBar}
                    backgroundColor={'transparent'}
                />
            </View>
        );
    };

    renderTitleView = () => {
        let {title, titleView, titleStyle, titleLayoutStyle} = this.props;
        if (titleView) {
            return (
                <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>{titleView}</View>
            );
        }
        return (
            <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={[styles.title, titleStyle]}
                >{title}</Text>
            </View>
        );

    };

    renderContent = () => {
        let {hide, leftButton, rightButton} = this.props;
        if (hide) {
            return null;
        }
        return (
            <View style={styles.navBar}>
                {this.getButtonElement('leftBtn', leftButton)}
                {this.renderTitleView()}
                <View style={styles.navButton}>
                    {this.getButtonElement('rightBtn', rightButton, {})}
                </View>
            </View>
        );
    };

    render() {
        let {style} = this.props;
        return (
            <View style={[styles.container, style]}>
                {this.renderStatusBar()}
                {this.renderContent()}
            </View>
        );
    }
}

class NavBarButton extends Component {

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        tintColor: PropTypes.string,
        title: PropTypes.string,
        handler: PropTypes.func,
    };

    static defaultProps = {
        style: {},
        title: '',
        tintColor: '#0076ff',
        onPress: () => ({}),
    };

    render() {
        const {style, tintColor, title, handler, disabled} = this.props;
        let status = (disabled === undefined || disabled === null || !disabled) ? false : true;
        return (
            <TouchableOpacity
                style={styles.navBarButton}
                onPress={handler}
                disabled={status}
            >
                <View style={style}>
                    <Text style={[styles.navBtnTitle, {color: tintColor}]}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        backgroundColor: GlobalStyle.themeColor,
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: __IOS__ ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 70,
        right: 70,
        bottom: 0,
    },
    title: {
        fontSize: 18,
        color: '#fff',
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    navBarButton: {
        alignItems: 'center',
    },
    navBtnTitle: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
    },
    statusBar: {
        height: __IOS__ ? STATUS_BAR_HEIGHT : 0,
    },
});