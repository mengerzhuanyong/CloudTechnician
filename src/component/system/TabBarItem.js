/**
 * 云技师 - TabBarItem
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native'


export default class TabBarItem extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let {focused, selectedImage, normalImage} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    source = {focused ? selectedImage : normalImage}
                    style = {[styles.tabBarIcon, focused && {tintColor: GlobalStyle.themeColor}]}
                />  
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        position: 'relative',
    },
    tabBarIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});