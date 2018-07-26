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
const WEBVIEW_REF = 'webview';

export default class WebViewPage extends Component {

    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        this.state={
            url: params.link,
            title: params.title
        }
    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {this.state.title}
                    leftButton = {UtilsView.getLeftButton(() => this.onBack())}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'#42b3ff'}
                    translucent = {true}
                    barStyle = {'light-content'}
                />
                <WebView
                    ref={WEBVIEW_REF}
                    startInLoadingState={true}
                    source={{uri: this.state.url}}
                    style={styles.webContainer}
                />
                
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