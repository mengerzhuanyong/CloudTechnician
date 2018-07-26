/**
 * 云技师 - BannerComponent
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Platform,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import {Carousel} from "teaset";
import GlobalStyle from "../../constant/GlobalStyle";
// import SpinnerLoading from "../loading/SpinnerLoading";

export default class BannerComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            swiperShow: false,
            bannerData: this.props.bannerData,
        };
    }

    static defaultProps = {
        bannerData: [],
    };

    componentDidMount() {
        this.timer =  setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            bannerData: nextProps.bannerData
        });
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouterHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    renderBanner = (row) => {
        if (this.state.swiperShow) {
            if (row.length <= 0) {
                // return <SpinnerLoading isVisible={this.state.swiperShow}/>;
                return null;
            }
            let banners = row.map((item, index) => {
                return (
                    <TouchableOpacity
                        style={styles.bannerViewWrap}
                        key={"banner_" + index}
                        activeOpacity={1}
                        onPress={() => {
                            item.link && this.onPushToNextPage(item.title, 'CommonWebPage', {url: item.link});
                        }}
                    >
                        <ImageBackground
                            style={styles.headBackImage}
                            resizeMode={'cover'}
                            source={item.images ? {uri: item.images} : Images.img_banner}
                        />
                    </TouchableOpacity>
                )
            });
            // 这里不能输出信息，否则会陷入死循环
            return banners;
        }
    };

    render(){
        const { bannerData } = this.state;
        return (
            <ScrollView style={[styles.container]}>
                <Carousel
                    style={styles.headBackCarousel}
                    control={
                        <Carousel.Control
                            style={styles.carouselControlView}
                            dot={<View style={styles.carouselControl}/>}
                            activeDot={<View style={[styles.carouselControl, styles.carouselControlCur]}/>}
                        />
                    }
                >{this.renderBanner(bannerData)}</Carousel>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: __IOS__ ? 0 : -20,
        backgroundColor: GlobalStyle.themeColor,
    },
    bannerViewWrap: {},

    carouselControlView: {
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    carouselControl: {
        marginRight: 5,
        width: ScaleSize(25),
        height: ScaleSize(10),
        borderRadius: ScaleSize(8),
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    carouselControlCur: {
        backgroundColor: '#fff',
    },
    headBackCarousel: {
        overflow: 'hidden',
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.5,
    },
    headBackImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.5,
    },
});