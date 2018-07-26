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
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'

import SYImagePicker from 'react-native-syan-image-picker'
import ActionsManager from '../../utils/area/ActionsManager'

const options = {
    imageCount: 1,             // 最大选择图片数目，默认6
    isCamera: true,            // 是否允许用户在内部拍照，默认true
    isCrop: false,             // 是否允许裁剪，默认false
    CropW: ~~(GlobalStyle.width * 0.6),    // 裁剪宽度，默认屏幕宽度60%
    CropH: ~~(GlobalStyle.width * 0.6),    // 裁剪高度，默认屏幕宽度60%
    isGif: false,              // 是否允许选择GIF，默认false，暂无回调GIF数据
    showCropCircle: false,     // 是否显示圆形裁剪区域，默认false
    circleCropRadius: GlobalStyle.width/2,  // 圆形裁剪半径，默认屏幕宽度一半
    showCropFrame: true,       // 是否显示裁剪区域，默认true
    showCropGrid: false,       // 是否隐藏裁剪区域网格，默认false
    quality: 0,                // 压缩质量
    enableBase64: true
};
/**
 * 个人信息页面
 */
export default class Gerenxinxi extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            is_investor: params.is_investor,
            investor_msg: params.investor_msg,
            back_msg: params.back_msg,
            is_risk: params.is_risk,
            is_bank_card: params.is_bank_card,
            is_modify_truename: params.is_modify_truename,
            is_special_investor: params.is_special_investor,
            is_pay_auth: params.is_pay_auth,
            is_pay_auth_msg: params.is_pay_auth_msg,
            wx_number:'请输入微信号',
            true_name:'请输入真实姓名',
            address:'',
            areainfo:'',
            telephone:''
        }
    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        // this.props.navigation.state.params.onCallBack();
        this.props.navigation.goBack();
        DeviceEventEmitter.emit('customName', {

        })
    }

    componentWillUnmount = () => {
        this.onBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        let url = NetApi.get_member_info+"?token="+global.user.userData.token;

        Services.Get(url)
            .then( result => {
                if (result && result.code === 1) {
                    this.updateState({
                        is_investor: result.data.is_investor,
                        investor_msg: result.data.investor_msg,
                        back_msg: result.data.back_msg,
                        is_risk: result.data.is_risk,
                        is_bank_card: result.data.is_bank_card,
                        is_modify_truename: result.data.is_modify_truename,
                        is_special_investor: result.data.is_special_investor,
                        is_pay_auth: result.data.is_pay_auth,
                        is_pay_auth_msg: result.data.is_pay_auth_msg,
                        special_type: result.data.special_type,
                        wx_number:result.data.wx_number,
                        true_name:result.data.true_name,
                        areainfo:result.data.province+"-"+result.data.city+"-"+result.data.district,
                        telephone:result.data.telephone,
                    })
                    // console.log(result);
                    global.user = {
                        loginState: true,
                        userData: {
                            id: global.user.userData.id,
                            account: result.data.telephone,
                            nickname: result.data.nickname,
                            head_img: result.data.img_url,
                            sex: global.user.userData.sex,
                            integral: global.user.userData.integral,
                            money: global.user.userData.money,
                            email: global.user.userData.email,
                            addr: global.user.userData.addr,
                            bank_num: global.user.userData.bank_num,
                            is_investor: result.data.is_investor,
                            investor_msg: result.data.investor_msg,
                            back_msg: result.data.back_msg,
                            token:global.user.userData.token,
                            wx_number:result.data.wx_number,
                            true_name:result.data.true_name,
                            areainfo:result.data.province+"-"+result.data.city+"-"+result.data.district
                        }
                    };

                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    onPushNavigator = (compent, back_msg) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            back_msg: back_msg,
        })
    }
    //保存图片
    saveLocalStorage = () => {

        global.user = {
            loginState: true,
            userData: {
                nickname: global.user.userData.nickname,
                head_img: global.user.userData.head_img,
                token:global.user.userData.token,
                account:global.user.userData.account,
            }
        };

    }
    //保存昵称
    saveLocalStorage2 = () => {
        storage.save({
            key: 'loginState',
            data: {
                nickname: global.user.userData.nickname,
                // head_img: global.user.userData.head_img,
            },
        });

        global.user = {
            loginState: true,
            userData: {
                nickname: global.user.userData.nickname,
                head_img: global.user.userData.head_img,
                token:global.user.userData.token,
                account:global.user.userData.account,
            }
        };

    }

    submit = () => {
        let url = NetApi.put_member_info+"?token="+global.user.userData.token ;
        let data = {
            nickname: global.user.userData.nickname,
            img_url: global.user.userData.head_img,
            wx_number:this.state.wx_number,
            address:this.state.areainfo,
            true_name:this.state.true_name
        };

        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    global.user={
                        loginState: true,
                        userData: {
                            nickname: global.user.userData.nickname,
                            head_img: global.user.userData.head_img,
                            token:global.user.userData.token,
                            account: global.user.userData.account,
                            wx_number:global.user.userData.wx_number,
                            true_name:global.user.userData.true_name,
                            areainfo:global.user.userData.areainfo
                        }
                    }
                    this.onBack(),
                    Toast.toastShort(result.msg);
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    setPhoto = () => {
        SYImagePicker.showImagePicker(options, (err, selectedPhotos) => {
             if (err) {
                 // 取消选择
                 // console.log('您已取消选择');
                 return;
             }
             // 选择成功
             // console.log('您已选择成功');
             // console.log(selectedPhotos);
             this.photoResult(selectedPhotos);
        }) 
    }

    photoResult = (datas) => {
        let photoList = [],
            selectedPhotos = datas;

        // 图片base64转码
        let url = NetApi.base64,
            thisSelectedPhoto = selectedPhotos[0].base64;
        let data = {
            base64: thisSelectedPhoto
        };
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    global.user.userData.head_img = result.data.img_url;
                    this.saveLocalStorage();
                    this.setState({
                        head_img: result.data.img_url
                    })
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }

    chooseArea=()=>{
        ActionsManager.showArea((info)=>{
            this.updateState({
                areainfo:info
            })
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
                    title = {'个人信息'}
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

                <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                    <TouchableOpacity onPress={() => {this.setPhoto()}} style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>头像</Text>
                            {global.user.userData.head_img ? 
                                <Image source={{uri: global.user.userData.head_img}} style={styles.userPhoto} />
                                : null}
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>昵称</Text>
                            <TextInput
                                placeholder={global.user.userData.nickname }
                                onChangeText={(text) => {
                                    global.user.userData.nickname = text;
                                    this.saveLocalStorage2();
                                }}
                                style={[GlobalStyle.userlistRightText, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', color: '#bbbbc1', fontSize: 14, width: 210}]}
                                underlineColorAndroid={'transparent'}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>手机号</Text>
                            <Text style={GlobalStyle.userlistRightText}>{this.state.telephone}</Text>
                        </View>
                    </View>
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>微信号</Text>
                            <TextInput
                                defaultValue={this.state.wx_number?this.state.wx_number:'请输入微信号'}
                                // value={this.state.wx_number}
                                onChangeText={(text) => {
                                    this.state.wx_number = text;
                                }}
                                style={[GlobalStyle.userlistRightText, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', color: '#bbbbc1', fontSize: 14, width: 210}]}
                                underlineColorAndroid={'transparent'}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>真实姓名</Text>
                            <TextInput
                                defaultValue={this.state.true_name?this.state.true_name:"请输入真实姓名"}
                                // value={this.state.true_name}
                                onChangeText={(text) => {
                                    this.state.true_name = text;
                                }}
                                style={[GlobalStyle.userlistRightText, __IOS__ ? null : styles.inputAndroid, {textAlign: 'right', color: '#bbbbc1', fontSize: 14, width: 210}]}
                                underlineColorAndroid={'transparent'}
                            >
                            </TextInput>
                        </View>
                    </View>

                    <View style={GlobalStyle.userlist}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={GlobalStyle.userlisttext}>所在区域</Text>
                            <TouchableOpacity onPress={()=>this.chooseArea()}>
                            <Text style={GlobalStyle.userlistRightText}>{
                                this.state.areainfo?this.state.areainfo:"请选择业务区域"
                            }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                

                {/*<View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>*/}
                    {/*{this.invest()}*/}
                {/*</View>*/}

                <TouchableOpacity onPress={() => {this.submit()}} style={GlobalStyle.submit}>
                    <Text style={GlobalStyle.btna}>保存信息</Text>
                </TouchableOpacity>
            </View>
        );
    }


    invest = () => {
        if(this.state.is_investor === -2){
            global.invest.investInfo.editable = true;
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Renzheng');Toast.toastShort(this.state.back_msg)}} style={[GlobalStyle.userlist]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext]}>专业投资者认证</Text>
                        <Text style={[styles.userlistRightText, {color: '#f00'}]}>{this.state.investor_msg}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }else if(this.state.is_investor === -1){
            global.invest.investInfo.editable = true;
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Renzheng',this.state.back_msg)}} style={[GlobalStyle.userlist]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext]}>专业投资者认证</Text>
                        <Text style={[styles.userlistRightText, {color: '#f00'}]}>{this.state.investor_msg}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }else if(this.state.is_investor === 0){
            global.invest.investInfo.editable = true;
            if(global.invest.investInfo.special_type > -1){
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'RenzhengType')}} style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>专业投资者认证</Text>
                            <Text style={styles.userlistRightText}>{this.state.investor_msg}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'RenzhengType')}} style={[GlobalStyle.userlist]}>
                        <View style={GlobalStyle.userlistright}>
                            <Text style={[GlobalStyle.userlisttext]}>专业投资者认证</Text>
                            <Text style={styles.userlistRightText}>{this.state.investor_msg}</Text>
                            <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                        </View>
                    </TouchableOpacity>
                )
            }
        }else if(this.state.is_investor === 1){
            global.invest.investInfo.editable = false;
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Renzheng');Toast.toastShort(this.state.back_msg)}} style={[GlobalStyle.userlist]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext]}>专业投资者认证</Text>
                            <Text style={styles.userlistRightText}>{this.state.investor_msg}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }else if(this.state.is_investor === 2){
            global.invest.investInfo.editable = false;
            return (
                <TouchableOpacity onPress={() => {RouterHelper.navigate('', 'Renzheng');Toast.toastShort(this.state.back_msg)}} style={[GlobalStyle.userlist]}>
                    <View style={GlobalStyle.userlistright}>
                        <Text style={[GlobalStyle.userlisttext]}>专业投资者认证</Text>
                        <Text style={[styles.userlistRightText, {color: '#f00'}]}>{this.state.investor_msg}</Text>
                        <Image source={require('../../assets/images/icons/icon_user_arrow.png')} style={GlobalStyle.userlistmore} />
                    </View>
                </TouchableOpacity>
            )
        }
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
    }
});
