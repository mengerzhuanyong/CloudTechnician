/**
 * 速芽物流 - WebName
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    WebView,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

const WEBVIEW_REF = 'webview';

export default class FundDetailInfo extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            content: this.props.thisData,
        }
    }

    // 加上这个才能接受到值
    componentWillReceiveProps(nextProps) {
        // consoleLog('poup', nextProps);
        this.setState({
            content: nextProps.thisData,
        });
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
        // console.log(this.state.content)
    }

    render(){
        const htmlContent = this.state.content;
        return (
            <View style={styles.container}>
                <WebView
                    ref={WEBVIEW_REF}
                    startInLoadingState={true}
                    source={{uri: this.state.content}}
                    style={styles.webContainer}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: 1000
    },
    webContainer: {
        flex: 1,
        backgroundColor: '#f1f2f3',
        height: 1000

    },
});
