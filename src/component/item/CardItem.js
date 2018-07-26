/**
 * 云技师 - CardItem
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import GlobalStyle from "../../constant/GlobalStyle";


export default class CardItem extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        item: {
            id: '',
            title: '',
            thumb: '',
            create_time: '',
            is_collection: '',
            views: '',
            article_url: '',
        },
        onPress: () => {},
    };
    
    render() {
        let {item, onPress} = this.props;
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.cardItemStyle}
            >
                <View style={[styles.cardContentItem, GlobalStyle.flexRowBetween, styles.itemTitleView]}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
                <View style={[styles.cardContentItem, styles.cardThumbView]}>
                    <Image source={item.thumb ? {uri: item.thumb} : Images.img_logo} style={styles.cardThumbImg}/>
                </View>
                <View style={[styles.cardContentItem, GlobalStyle.flexRowBetween, styles.itemInfoView]}>
                    <View style={[styles.itemInfoCon, GlobalStyle.flexRowBetween]}>
                        <Image source={Images.icon_bell} style={styles.infoIcon}/>
                        <Text style={styles.infoText}>{item.views}</Text>
                    </View>
                    <View style={[styles.itemInfoCon, GlobalStyle.flexRowBetween]}>
                        <Text style={styles.text}>{item.create_time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    cardItemStyle: {
        padding: 8,
        marginTop: 10,
        borderRadius: 8,
        borderColor: '#eee',
        borderWidth: GlobalStyle.minPixel,
    },
    cardContentItem: {},
    itemTitleView: {},
    itemTitle: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
    },
    cardThumbView: {
        flex: 1,
        marginVertical: 10,
    },
    cardThumbImg: {
        resizeMode: 'cover',
        width: SCREEN_WIDTH - 46,
        height: (SCREEN_WIDTH - 46) / 2.5,
    },
    itemInfoView: {},
    itemInfoCon: {},
    infoIcon: {
        width: 18,
        height: 18,
        marginRight: 5,
        resizeMode: 'contain',
    },
    infoText: {
        fontSize: 12,
        color: '#666',
    },
});