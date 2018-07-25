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
    StyleSheet,
} from 'react-native'

export default class Mine extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Mine</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f60',
    },
    textStyle: {
        fontSize: 16,
        color: '#fff',
    }
});