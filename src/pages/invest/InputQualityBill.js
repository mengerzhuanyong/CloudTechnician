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
 * 质保单录入页面
 */
export default class InputQualityBill extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            product_name:'',
            product_number:'',
            zhibao_number:'',
            server_time:'',
            zhibao_time:'',
            client_name:'',
            client_telephone:'',
            car_type:'',
            car_number:'',
            server_address:'',
            server_order_id:params.id,
        }
    }

    componentDidMount() {
    }

    onBack = () => {
        // this.props.navigation.state.params.onCallBack();
        this.props.navigation.goBack();
    }

    componentWillUnmount = () => {
        this.onBack();
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
            back_msg: back_msg,
        })
    }

    submit=()=>{
        let url = NetApi.addZhibao + "?token=" + global.user.userData.token;
        // this.setState({})
        let data ={
            server_order_id:this.state.server_order_id,
            product_name:this.state.product_name,
            product_number:this.state.product_number,
            zhibao_number:this.state.zhibao_number,
            server_time:this.state.server_time,
            zhibao_time:this.state.zhibao_time,
            client_name:this.state.client_name,
            client_telephone:this.state.client_telephone,
            car_type:this.state.car_type,
            car_number:this.state.car_number,
            server_address:this.state.server_address
        }
        Services.Post(url,data)
            .then(result => {
                // console.log(result.code);
                    if(result.data.code==1){
                        this.onBack();
                        Toast.toastShort(result.msg)
                    }
                Toast.toastShort(result.msg)

            })
            .catch(error => {
                // Toast.toastShort('');
            })

    }

    render() {
        let navigationBar = {
            backgroundColor: '#fff',
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'添加质保信息'}
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
                <ScrollView>
                <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>

                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>产品名称</Text>
                            <TextInput
                                placeholder={'请输入产品名称'}
                                onChangeText={(text) => {
                                    this.state.product_name=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>产品码</Text>
                            <TextInput
                                placeholder={'请输入产品码'}
                                onChangeText={(text) => {
                                    this.state.product_number=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>质保编号</Text>
                            <TextInput
                                placeholder={'请输入质保编号'}
                                onChangeText={(text) => {
                                    this.state.zhibao_number=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>服务时间</Text>
                            <TextInput
                                placeholder={'请输入服务时间'}
                                onChangeText={(text) => {
                                    this.state.server_time=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>质保到期时间</Text>
                            <TextInput
                                placeholder={'请输入质保到期时间'}
                                onChangeText={(text) => {
                                    this.state.zhibao_time=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>客户名</Text>
                            <TextInput
                                placeholder={'请输入客户名'}
                                onChangeText={(text) => {
                                    this.state.client_name=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>客户手机号</Text>
                            <TextInput
                                placeholder={'请输入客户手机号'}
                                onChangeText={(text) => {
                                    this.state.client_telephone=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>车型</Text>
                            <TextInput
                                placeholder={'请输入车型'}
                                onChangeText={(text) => {
                                    this.state.car_type=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>车牌号</Text>
                            <TextInput
                                placeholder={'请输入车牌号'}
                                onChangeText={(text) => {
                                    this.state.car_number=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
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
                            <Text style={GlobalStyle.userlisttext}>施工地点</Text>
                            <TextInput
                                placeholder={'请输入施工地点'}
                                onChangeText={(text) => {
                                    this.state.server_address=text;
                                }}
                                style={[GlobalStyle.cellInput, __IOS__ ? null : styles.inputAndroid, {
                                    textAlign: 'left',
                                    color: '#bbbbc1',
                                    fontSize: 14,
                                    width: 210
                                }]}
                                underlineColorAndroid={'transparent'}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.submit()
                    }} style={[GlobalStyle.submit,{marginTop:10}]}>
                        <Text style={GlobalStyle.btna}>提现</Text>
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
