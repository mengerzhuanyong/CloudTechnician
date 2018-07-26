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
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

export default class Tuijian extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            info_img: '',
            qrcode: ''
        }
    }

    async componentWillMount(){
        try {
            await this.loadNetData();
        } catch (error) {
            // // console.log(error);
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
        let url = NetApi.tuiguang;
        let data = {
            member_id: global.user.userData.id
        }
        Services.Post(url, data, true)
            .then( result => {
                console.log(result);
                this.updateState({
                    info_img: result.data.info_img,
                    qrcode: result.data.qrcode
                })
            })
            .catch( error => {
                // console.log('退出失败，请重试！', error);
            })
    }

    render(){
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title = {'推荐好友'}
                    style = {navigationBar}
                    titleStyle = {{color: '#333333'}}
                    leftButton = {UtilsView.getLeftBlackButton(() => this.onBack())}
                />
                <StatusBar
                    animated = {true}
                    hidden = {false}
                    backgroundColor = {'transparent'}
                    translucent = {true}
                    barStyle = {'dark-content'}
                />
                <ScrollView>
                    <View style={styles.tjTop}>
                        {this.state.info_img ? <Image source={{uri: this.state.info_img}} style={styles.info_img} /> : null }
                        {this.state.qrcode ? <Image source={{uri: this.state.qrcode}} style={styles.qrcode} /> : null }
                    </View>

                    <View style={[styles.tjBot, GlobalStyle.hide]}>
                        <TouchableOpacity onPress={() => {}} style={[GlobalStyle.submit, {marginTop: 0}]}>
                            <Text style={GlobalStyle.btna}>已推荐列表</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={[GlobalStyle.submit, {marginTop: 0}]}>
                            <Text style={GlobalStyle.btna}>推荐给好友</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                    

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tjTop: {

    },
    info_img: {
        width: GlobalStyle.width,
        height: GlobalStyle.width*1057/779
    },
    qrcode: {
        width: GlobalStyle.width/1.5,
        height: GlobalStyle.width/1.5,
        marginTop: 30,
        marginLeft: (GlobalStyle.width - GlobalStyle.width/1.5 - 30)/2
    },
    tjBot: {

    },
});
