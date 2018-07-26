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
    StatusBar,
    DeviceEventEmitter
} from 'react-native'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'


import SYImagePicker from 'react-native-syan-image-picker'
import Yinhangka from "../fund/yinhangka";

const options = {
    imageCount: 1,             // 最大选择图片数目，默认6
    isCamera: true,            // 是否允许用户在内部拍照，默认true
    isCrop: false,             // 是否允许裁剪，默认false
    CropW: ~~(GlobalStyle.width * 0.6),    // 裁剪宽度，默认屏幕宽度60%
    CropH: ~~(GlobalStyle.width * 0.6),    // 裁剪高度，默认屏幕宽度60%
    isGif: false,              // 是否允许选择GIF，默认false，暂无回调GIF数据
    showCropCircle: false,     // 是否显示圆形裁剪区域，默认false
    circleCropRadius: GlobalStyle.width / 2,  // 圆形裁剪半径，默认屏幕宽度一半
    showCropFrame: true,       // 是否显示裁剪区域，默认true
    showCropGrid: false,       // 是否隐藏裁剪区域网格，默认false
    quality: 0,                // 压缩质量
    enableBase64: true
};
/**
 * 提现页面
 */
export default class Tixian extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            withdrawlist: [],
            money:'',
            cardnumber:'',
            id:''
        }
    }

    componentDidMount() {
        this.loadNetData();
        // this.requestDataSource()
        DeviceEventEmitter.addListener('tixianka', this.callBack)
    }

    callBack = (params) => {
        this.updateState({
            cardnumber:params.num,
            id:params.id,
        })
    }

    onBack = () => {
        // this.props.navigation.state.params.onCallBack();
        this.props.navigation.goBack();
    }

    componentWillUnmount = () => {
        this.onBack();
        DeviceEventEmitter.removeListener('tixianka')
    }

    updateState = (state) => {
        if (!this) {
            return
        }
        ;
        this.setState(state);
    }


    onPushNavigator = (compent, back_msg) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {
            fromtixianpage: back_msg,
        })
    }


    submit = () => {
        let url = NetApi.addWithdraw + "?token=" + global.user.userData.token;
        let data = {
            money: this.state.money,
            bank_number: this.state.id,
        };

        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.loadNetData();
                    Toast.toastShort(result.msg);
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    loadNetData = () => {
        let url = NetApi.getRecentWithdrawlist + "?token=" + global.user.userData.token;
        Services.Get(url)
            .then(result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.updateState({
                        withdrawlist: result.data.list,
                    })
                    if(result.data.list.length==0){
                        Toast.toastShort("暂无提现信息");
                    }
                    // Toast.toastShort(result.msg);
                } else {
                    Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }

    render() {
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <ScrollView>
            <View style={styles.container}>
                <NavigationBar
                    title={'我的提现'}
                    style={navigationBar}
                    titleStyle={{color: '#333333'}}
                    leftButton={UtilsView.getLeftBlackButton(() => this.onBack())}
                />
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent={true}
                    barStyle={'dark-content'}
                />

                <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                    {/*<TouchableOpacity onPress={() => {this.setPhoto()}} style={GlobalStyle.userlist}>*/}
                    {/*<View style={GlobalStyle.userlistright}>*/}
                    {/*<Text style={GlobalStyle.userlisttext}>头像</Text>*/}
                    {/*{global.user.userData.head_img ? */}
                    {/*<Image source={{uri: global.user.userData.head_img}} style={styles.userPhoto} />*/}
                    {/*: null}*/}
                    {/*<Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />*/}
                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>提现金额</Text>
                            <TextInput
                                placeholder={'请输入提现金额'}
                                onChangeText={(text) => {
                                    this.state.money=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'right',
                                    color: '#bbbbc1',
                                    fontSize: 14,
                                    width: 210
                                }]}
                                underlineColorAndroid={'transparent'}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>提现银行卡</Text>
                            <TouchableOpacity onPress={() => {
                                RouterHelper.navigate('', 'Yinhangka','1')
                            }}>
                                <Text style={GlobalStyle.userlistRightText}>{
                                    this.state.cardnumber?this.state.cardnumber:'请选择'
                                }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/*<View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>*/}
                {/*{this.invest()}*/}
                {/*</View>*/}

                <TouchableOpacity onPress={() => {
                    this.submit()
                }} style={GlobalStyle.submit}>
                    <Text style={GlobalStyle.btna}>提现</Text>
                </TouchableOpacity>
                {/*<View style={styles.middle}>*/}
                    {/*<Text>提现明细</Text>*/}
                {/*</View>*/}
                {/*<View style={{*/}
                    {/*height: 40,*/}
                    {/*flexDirection: 'row',*/}
                    {/*justifyContent: 'space-around',*/}
                    {/*alignItems: "center",*/}
                    {/*backgroundColor: '#fff'*/}
                {/*}}>*/}
                    {/*<Text style={{flex: 1, textAlign: 'center'}}>时间</Text>*/}
                    {/*<Text style={{flex: 1, textAlign: 'center'}}>金额</Text>*/}
                    {/*<Text style={{flex: 1, textAlign: 'center'}}>状态</Text>*/}
                {/*</View>*/}
                {/*{this.tixianliebiao(this.state.withdrawlist)}*/}
            </View>
            </ScrollView>
        );
    }


    tixianliebiao(data) {
        let investList = [];
        for (var i = 0; i < data.length; i++) {

            let investItem = (
                <View style={{
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: "center",
                    backgroundColor: '#fff'
                }}>
                    <Text style={{flex: 1, textAlign: 'center'}}>{data[i].create_time}</Text>
                    <Text style={{flex: 1, textAlign: 'center',marginLeft:20}}>{data[i].money}</Text>
                    <Text style={{flex: 1, textAlign: 'center',marginLeft:20}}>{data[i].status_name}</Text>
                </View>
            )
            investList.push(investItem);
        }
        return (
            <View style={[GlobalStyle.newsModule, styles.backcolor]}>
                {investList}
            </View>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    userlistRightText: {
        position: 'absolute',
        right: 20,
        color: '#585858',
    },
    userPhoto: {
        width: 32,
        height: 32,
        position: 'absolute',
        right: 20,
        borderRadius: 16,
    },
    middle: {
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    backcolor: {
        backgroundColor: '#ffffff'
    }
});
