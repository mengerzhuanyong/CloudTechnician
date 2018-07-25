/**
 * 校园空兼 - RouterTool
 * https://menger.me
 * @大梦
 */

'use strict';
import React from 'react'
import {Image, StyleSheet} from 'react-native'
import RouterHelper from './RouterHelper'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const tabOptions = (params) => {
    return {
        title: params.title,
        tabBarIcon: ({focused, tintColor}) => (
            <Image
                resizeMode="contain"
                style={[styles.iconStyle]}
                source={!focused ? params.normalIcon : params.selectedIcon}
            />
        )
    }
};

export const configRouter = (routeConfig) => {
    for (let name in routeConfig) {
        let Component = routeConfig[name].screen;
        routeConfig[name].screen = createNavigationContainer(Component);
    }
    return routeConfig;
};

// 高阶组件
export const createNavigationContainer = (OldComponent) => {

    class NewComponent extends React.PureComponent {

        static displayName = `addToRouteStack(${OldComponent.displayName ||
        OldComponent.name})`;

        componentDidMount() {
            InteractionManager.runAfterInteractions(() => {
                this._handleNavigation()
            })
        };

        componentWillUnmount() {
            requestAnimationFrame(() => {
                // console.log('componentWillUnmount');
                RouterHelper.remove(this.props.navigation);
                this.subscriptions.forEach(sub => sub.remove());
            })
        };

        _handleNavigation = () => {
            // console.log('_handleNavigation');
            RouterHelper.addStack(this.props.navigation);
            this.subscriptions = [
                this.props.navigation.addListener('willBlur', (payload) => {
                    this._oldComponentRef && this._oldComponentRef.componentWillBlur && this._oldComponentRef.componentWillBlur(payload)
                }),
                this.props.navigation.addListener('willFocus', (payload) => {
                    this._oldComponentRef && this._oldComponentRef.componentWillFocus && this._oldComponentRef.componentWillFocus(payload)
                }),
                this.props.navigation.addListener('didFocus', (payload) => {
                    this._oldComponentRef && this._oldComponentRef.componentDidFocus && this._oldComponentRef.componentDidFocus(payload)
                }),
                this.props.navigation.addListener('didBlur', (payload) => {
                    this._oldComponentRef && this._oldComponentRef.componentDidBlur && this._oldComponentRef.componentDidBlur(payload)
                }),
            ]
        };

        _captureRef = (v) => {
            this._oldComponentRef = v
        };

        onPushToNextPage = (pageTitle, component, params = {}) => {
            RouterHelper.navigate(component, {
                pageTitle: pageTitle,
                ...params
            })
        };

        render() {
            return (
                <OldComponent
                    ref={this._captureRef}
                    {...this.props}
                />
            )
        }
    }

    return hoistNonReactStatics(NewComponent, OldComponent);
};

const styles = StyleSheet.create({
    iconStyle: {
        width: ScaleSize(40),
        height: ScaleSize(40),
    }
});