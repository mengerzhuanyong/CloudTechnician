/**
 * 速芽物流 - 公共详情页
 * https://menger.me
 * @Meng
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    WebView,
    Dimensions,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'
import ShareUtils from '../../components/common/shareUtils'

const WEBVIEW_REF = 'webview';

export default class NewsWebDetail extends Component {

    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        this.state={
            url: params.link,
            title: params.title,
            content_id:params.content_id,
            is_collection:params.is_collection
        }
    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    onSharePress = () => {
        this.setState({
            showSharePop: !this.state.showSharePop
        })
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {

    }

    onCollect =() =>{
        let url= NetApi.collectArticle+"?article_id="+this.state.content_id+"&token="+global.user.userData.token;
        Services.Get(url,true)
            .then( result => {
                // console.log(result);
                if (result && result.code === 1) {
                    Toast.toastShort(result.msg);
                    this.updateState({
                        is_collection:1,
                    })

                }else{
                    this.updateState({
                        is_collection:0,
                    })
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }


// rightButton = {UtilsView.getRightBlackButton(() => this.onSharePress())}
    render() {
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1,
        };
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = '文章详情'
                    style = {navigationBar}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                    rightButton={
                        this.state.is_collection === 0 ?
                        <TouchableOpacity onPress={()=>{this.onCollect()}} style={styles.botLeft}>
                            <Image source={require('../../assets/images/icons/icon_shoucang_cur.png')} style={[styles.botLeftIco, {width: 24}]} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>{this.onCollect()}} style={styles.botLeft}>
                            <Image source={require('../../assets/images/icons/icon_shoucang.png')} style={[styles.botLeftIco, {width: 24}]} />
                        </TouchableOpacity>}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'dark-content'}
                />
                <WebView
                    ref={WEBVIEW_REF}
                    startInLoadingState={true}
                    source={{uri: this.state.url}}
                    style={styles.webContainer}
                />
                {this.state.showSharePop?
                    <View>
                        <ShareUtils
                            style={{position:'absolute'}}
                            show={this.state.showSharePop}
                            closeModal={(show) => {
                                this.setState({
                                    showSharePop: show
                                })
                            }}
                            title = {this.state.title}
                            description = {this.state.description}
                            thumbImage = {this.state.logo}
                            webpageUrl = {this.state.webpageUrl}
                            id = {this.state.id}
                            {...this.props}
                        />
                    </View>
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
    botLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botLeftIco: {
        height: 24,

    },
});