/**
 * 云技师 - Home
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

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let result = await Services.Get(ServicesApi.index);
        if (result) {
            // Toast.toastShort(result.msg);
        }
    };

    componentWillUnmount() {};

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'云技师'}
                    leftButton = {null}
                />
                <View style={styles.content}>
                    <Text
                        style={styles.textStyle}
                        onPress={() => RouterHelper.navigate('登录', 'Login', {id: '测试一下能不能用'}) }
                    >{ServicesApi.index}</Text>
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