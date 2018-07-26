/**
 * 校园空兼 - CommonWebPage
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {Component, PureComponent} from 'react'
import {
    Text,
    View,
    WebView,
    ScrollView,
    StyleSheet,
} from 'react-native'
import NavigationBar from "../../component/system/NavigationBar";

export default class CommonWebPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 1000);
    }

    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }

    render() {
        let {loading} = this.state;
        let {params} = this.props.navigation.state;
        let url = params && params.url ? params.url : '';
        let style = params && params.style ? params.style : '';
        let pageTitle = params && params.pageTitle ? params.pageTitle : '详情页';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBar={{
                        barStyle: 'dark-content'
                    }}
                    titleStyle={{color: '#333'}}
                />
                {!loading ?
                    <WebView
                        source={{uri: url}}
                        startInLoadingState={false}
                        style={[styles.webContainer, style]}
                    />
                    : null
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f2f3',
    },
    webContainer: {
        flex: 1,
        backgroundColor: '#f1f2f3',
    },
});