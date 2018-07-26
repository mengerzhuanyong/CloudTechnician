/**
 * 云技师 - Login
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

export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        const {params} = this.props.navigation.state;
        const pageTitle = params && params.pageTitle ? params.pageTitle : '登录';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {pageTitle}
                />
                <View style={styles.content}>
                    <Text
                        style={styles.textStyle}
                        onPress={() => RouterHelper.goBack() }
                    >{params.id}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f60',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: '#fff',
    }
});