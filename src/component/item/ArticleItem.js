/**
 * 云技师 - ArticleItem
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


export default class ArticleItem extends Component {

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
        separator: false,
    };
    
    render() {
        let {item, onPress, separator} = this.props;
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[styles.articleItemStyle, GlobalStyle.flexRowBetween, separator && styles.topSeparator]}
            >
                <View style={[styles.articleThumbView]}>
                    <Image source={item.thumb ? {uri: item.thumb} : Images.img_logo} style={styles.articleThumbImg}/>
                </View>
                <View style={[styles.articleContentItem]}>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
                    <View style={[styles.itemInfoCon, GlobalStyle.flexRowBetween]}>
                        <Text style={styles.infoText}>{item.create_time}</Text>
                        <Text style={styles.infoText}>{item.views}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    articleItemStyle: {
        flex: 1,
        paddingVertical: 10,
    },
    topSeparator: {
        borderColor: '#ddd',
        borderTopWidth: GlobalStyle.minPixel,
    },
    articleThumbView: {
        marginRight: 15,
        borderRadius: 8,
        overflow: 'hidden',
        width: ScaleSize(160),
        height: ScaleSize(100),
    },
    articleThumbImg: {
        borderRadius: 8,
        resizeMode: 'contain',
        width: ScaleSize(160),
        height: ScaleSize(100),
    },
    articleContentItem: {
        flex: 1,
        height: ScaleSize(100),
        // backgroundColor: '#123',
        justifyContent: 'space-around',
    },
    itemInfoView: {
        flex: 1,
    },
    itemTitleView: {},
    itemTitle: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
    },
    itemInfoCon: {},
    infoIcon: {},
    infoText: {
        fontSize: 13,
        color: '#666',
    },
});