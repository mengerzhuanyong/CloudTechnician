/**
 * 奶牛金服 - CommonLine
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import GlobalStyle from '../../constant/GlobalStyle'

export class VerticalLine extends Component {

    static defaultProps = {
        lineStyle: {},
    };

    render(){
        let {lineStyle} = this.props;
        return (
            <View style={[styles.verLine, lineStyle]} />
        );
    }
}

export class HorizontalLine extends Component {

    static defaultProps = {
        lineStyle: {},
    };

    render(){
        let {lineStyle} = this.props;
        return (
            <View style={[styles.horLine, lineStyle]} />
        );
    }
}

const styles = StyleSheet.create({
    verLine: {
        width: GlobalStyle.minPixel,
        backgroundColor: '#f5f5f5'
    },
    horLine: {
        height: GlobalStyle.minPixel,
        backgroundColor: '#f5f5f5'
    },
});