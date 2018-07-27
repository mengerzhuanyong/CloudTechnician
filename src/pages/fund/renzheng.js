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
import NetRequest from '../../utils/utilsRequest'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NetApi } from '../../constants/GlobalApi'
import GlobalStyle from '../../constants/GlobalStyle'
import NavigationBar from '../../components/common/NavigationBar'
import UtilsView from '../../utils/utilsView'
import { Toast.toastShort, consoleLog } from '../../utils/utilsToast'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown'
import SYImagePicker from 'react-native-syan-image-picker'
// 技术支持：https://github.com/syanbo/react-native-syan-image-picker
const options = {
    imageCount: 6,             // 最大选择图片数目，默认6
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

// 只能选择一张图片
const options1 = {
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
export default class Renzheng extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            user: global.user.userData,
            loginState: global.user.loginState,
            investInfo: global.invest.investInfo,
            investType: global.invest.investInfo.special_type,
            card_type: [
                {
                    id: 1,
                    name: '身份证'
                },
                {
                    id: 2,
                    name: '港澳通行证'
                },
                {
                    id: 3,
                    name: '护照'
                },
                {
                    id: 4,
                    name: '台湾居民来往大陆通行证'
                },
                {
                    id: 5,
                    name: '其他'
                },
            ],
            nationality: [
                {
                    id: 1,
                    name: '中国'
                },
                {
                    id: 2,
                    name: '中国香港'
                },
                {
                    id: 3,
                    name: '中国澳门'
                },
                {
                    id: 4,
                    name: '中国台湾省'
                },
                {
                    id: 5,
                    name: '其他'
                },
            ],
            sex: [
                {
                    id: 1,
                    name: '男'
                },
                {
                    id: 2,
                    name: '女'
                }
            ],
            card_id: global.invest.investInfo.card_id,
            nationality_id: global.invest.investInfo.nationality_id,
            sex_id: global.invest.investInfo.sex_id,
            assets: global.invest.investInfo.assets,
            experience: global.invest.investInfo.experience,
            experience1: global.invest.investInfo.experience1,
            experience2: global.invest.investInfo.experience2,
            experience3: global.invest.investInfo.experience3,
            experience4: global.invest.investInfo.experience4,
            isTongyi: global.user.userData.is_investor,  //是否同意协议
            selectedGuimoPhotos: [],
            selectedJingliPhotos: [],
            card_img_front: global.invest.investInfo.card_img_front,
            card_img_back: global.invest.investInfo.card_img_back,
            assets_img: global.invest.investInfo.assets_img,
            experience_img: global.invest.investInfo.experience_img,
            guimoReady: false,  //防止频繁调用资产规模上传接口
            jingliReady: false,
            back_msg: params.back_msg,
            editable: global.invest.investInfo.editable,
            investData: [],
            isDateTimePickerVisible: false,
            birth_time: global.invest.investInfo.birth_time,
            is_investor: params.is_investor,
            renzhengKey: params.renzhengKey,
        }
    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.state.params.onCallBack();
        if(this.state.is_investor !== 0){
            this.props.navigation.goBack(this.state.renzhengKey);
        }else{
            this.props.navigation.goBack();
        }
        
    }

    componentWillUnmount = () => {
        this.onBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        
    }

    saveLocalStorage = () => {
        if(global.invest.investInfo.editable){
            // console.log(global.invest.investInfo);

            storage.save({
                key: 'investInfo',
                data: {
                    id: global.user.userData.id,
                    birth_time: global.invest.investInfo.birth_time,
                    business: global.invest.investInfo.business,
                    card_id: global.invest.investInfo.card_id,
                    card_num: global.invest.investInfo.card_num,
                    card_type: global.invest.investInfo.card_type,
                    nationality: global.invest.investInfo.nationality,
                    nationality_id: global.invest.investInfo.nationality_id,
                    profession: global.invest.investInfo.profession,
                    sex: global.invest.investInfo.sex,
                    sex_id: global.invest.investInfo.sex_id,
                    truename: global.invest.investInfo.truename,
                    assets: global.invest.investInfo.assets,
                    experience: global.invest.investInfo.experience,
                    experience1: global.invest.investInfo.experience1,
                    experience2: global.invest.investInfo.experience2,
                    experience3: global.invest.investInfo.experience3,
                    experience4: global.invest.investInfo.experience4,
                    card_img_front: global.invest.investInfo.card_img_front,
                    card_img_back: global.invest.investInfo.card_img_back,
                    assets_img: global.invest.investInfo.assets_img,
                    experience_img: global.invest.investInfo.experience_img,
                    control_people: global.invest.investInfo.control_people,
                    beneficiary: global.invest.investInfo.beneficiary,
                    beneficiary_desc: global.invest.investInfo.beneficiary_desc,
                    bad_record: global.invest.investInfo.bad_record,
                    special_img: '',
                    special_type: global.invest.investInfo.special_type,
                    editable: global.invest.investInfo.editable,
                },
            });

            global.invest.investInfo = {
                id: global.user.userData.id,
                birth_time: global.invest.investInfo.birth_time,
                business: global.invest.investInfo.business,
                card_id: global.invest.investInfo.card_id,
                card_num: global.invest.investInfo.card_num,
                card_type: global.invest.investInfo.card_type,
                nationality: global.invest.investInfo.nationality,
                nationality_id: global.invest.investInfo.nationality_id,
                profession: global.invest.investInfo.profession,
                sex: global.invest.investInfo.sex,
                sex_id: global.invest.investInfo.sex_id,
                truename: global.invest.investInfo.truename,
                assets: global.invest.investInfo.assets,
                experience: global.invest.investInfo.experience,
                experience1: global.invest.investInfo.experience1,
                experience2: global.invest.investInfo.experience2,
                experience3: global.invest.investInfo.experience3,
                experience4: global.invest.investInfo.experience4,
                card_img_front: global.invest.investInfo.card_img_front,
                card_img_back: global.invest.investInfo.card_img_back,
                assets_img: global.invest.investInfo.assets_img,
                experience_img: global.invest.investInfo.experience_img,
                control_people: global.invest.investInfo.control_people,
                beneficiary: global.invest.investInfo.beneficiary,
                beneficiary_desc: global.invest.investInfo.beneficiary_desc,
                bad_record: global.invest.investInfo.bad_record,
                special_img: '',
                special_type: global.invest.investInfo.special_type,
                editable: global.invest.investInfo.editable,
            };
        }
    };

    onPushNavigator = (compent) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
        })
    }


    Subziliao = () => {
        if(global.invest.investInfo.editable){
            if(this.state.isTongyi !== 0) {
                let url = NetApi.put_investor_info;
                // console.log(global.invest.investInfo.special_type);
                if(global.invest.investInfo.special_type === 0){
                    if(global.invest.investInfo.card_id === 1){
                        let data = {
                            member_id: global.user.userData.id,
                            token: global.user.userData.token,
                            mobile: global.user.userData.account,
                            truename: global.invest.investInfo.truename,
                            card_type: global.invest.investInfo.card_id,
                            card_num: global.invest.investInfo.card_num,
                            card_img_front: global.invest.investInfo.card_img_front,
                            card_img_back: global.invest.investInfo.card_img_back,
                            nationality: global.invest.investInfo.nationality_id,
                            profession: global.invest.investInfo.profession,
                            business: global.invest.investInfo.business,
                            assets: global.invest.investInfo.assets,
                            assets_img: global.invest.investInfo.assets_img,
                            experience: global.invest.investInfo.experience,
                            experience_img: global.invest.investInfo.experience_img,
                            control_people: global.invest.investInfo.control_people,
                            beneficiary: global.invest.investInfo.beneficiary,
                            beneficiary_desc: global.invest.investInfo.beneficiary_desc,
                            bad_record: global.invest.investInfo.bad_record,
                            special_img: '',
                            special_type: global.invest.investInfo.special_type,
                        };

                        Services.Post(url, data, true)
                            .then( result => {
                                if (result && result.code === 1) {
                                    console.log(result);
                                    Toast.toastShort(result.msg);
                                    // RouterHelper.navigate('', 'Renshengou');
                                    this.onBack();
                                }else{
                                    // Toast.toastShort(result.msg);
                                }
                            })
                            .catch( error => {
                                Toast.toastShort('服务器请求失败，请稍后重试！');
                            })
                    }else{
                        let data = {
                            member_id: global.user.userData.id,
                            token: global.user.userData.token,
                            sex: global.invest.investInfo.sex_id,
                            mobile: global.user.userData.account,
                            truename: global.invest.investInfo.truename,
                            card_type: global.invest.investInfo.card_id,
                            card_num: global.invest.investInfo.card_num,
                            card_img_front: global.invest.investInfo.card_img_front,
                            card_img_back: global.invest.investInfo.card_img_back,
                            birth_time: global.invest.investInfo.birth_time,
                            nationality: global.invest.investInfo.nationality_id,
                            profession: global.invest.investInfo.profession,
                            business: global.invest.investInfo.business,
                            assets: global.invest.investInfo.assets,
                            assets_img: global.invest.investInfo.assets_img,
                            experience: global.invest.investInfo.experience,
                            experience_img: global.invest.investInfo.experience_img,
                            control_people: global.invest.investInfo.control_people,
                            beneficiary: global.invest.investInfo.beneficiary,
                            beneficiary_desc: global.invest.investInfo.beneficiary_desc,
                            bad_record: global.invest.investInfo.bad_record,
                            special_img: '',
                            special_type: global.invest.investInfo.special_type,
                        };

                        Services.Post(url, data, true)
                            .then( result => {
                                if (result && result.code === 1) {
                                    console.log(result);
                                    Toast.toastShort(result.msg);
                                    // RouterHelper.navigate('', 'Renshengou');
                                    this.onBack();
                                }else{
                                    // Toast.toastShort(result.msg);
                                }
                            })
                            .catch( error => {
                                Toast.toastShort('服务器请求失败，请稍后重试！');
                            })
                    }
                        

                    
                }else {
                    if(global.invest.investInfo.card_id === 1){
                        let data = {
                            member_id: global.user.userData.id,
                            token: global.user.userData.token,
                            mobile: global.user.userData.account,
                            truename: global.invest.investInfo.truename,
                            card_type: global.invest.investInfo.card_id,
                            card_num: global.invest.investInfo.card_num,
                            card_img_front: global.invest.investInfo.card_img_front,
                            card_img_back: global.invest.investInfo.card_img_back,
                            nationality: global.invest.investInfo.nationality_id,
                            profession: global.invest.investInfo.profession,
                            business: global.invest.investInfo.business,
                            special_type: global.invest.investInfo.special_type,
                        };

                        Services.Post(url, data)
                            .then( result => {
                                if (result && result.code === 1) {
                                    // console.log(result);
                                    Toast.toastShort(result.msg);
                                    // RouterHelper.navigate('', 'Renshengou');
                                    this.onBack();
                                }else{
                                    // Toast.toastShort(result.msg);
                                }
                            })
                            .catch( error => {
                                Toast.toastShort('服务器请求失败，请稍后重试！');
                            })
                    }else{
                        let data = {
                            member_id: global.user.userData.id,
                            token: global.user.userData.token,
                            sex: global.invest.investInfo.sex_id,
                            mobile: global.user.userData.account,
                            truename: global.invest.investInfo.truename,
                            card_type: global.invest.investInfo.card_id,
                            card_num: global.invest.investInfo.card_num,
                            card_img_front: global.invest.investInfo.card_img_front,
                            card_img_back: global.invest.investInfo.card_img_back,
                            birth_time: global.invest.investInfo.birth_time,
                            nationality: global.invest.investInfo.nationality_id,
                            profession: global.invest.investInfo.profession,
                            business: global.invest.investInfo.business,
                            special_type: global.invest.investInfo.special_type,
                        };

                        Services.Post(url, data)
                            .then( result => {
                                if (result && result.code === 1) {
                                    // console.log(result);
                                    Toast.toastShort(result.msg);
                                    // RouterHelper.navigate('', 'Renshengou');
                                    this.onBack();
                                }else{
                                    // Toast.toastShort(result.msg);
                                }
                            })
                            .catch( error => {
                                Toast.toastShort('服务器请求失败，请稍后重试！');
                            })
                    }
                        
                }
                    
                
            }else{
                Toast.toastShort('请勾选以上责任声明！');
            }
        }
    }

    selGuimoPhoto = () => {    
        if(global.invest.investInfo.editable){
            SYImagePicker.showImagePicker(options, (err, selectedGuimoPhotos) => {
                 if (err) {
                     // 取消选择
                     // console.log('您已取消选择');
                     return;
                 }
                 // 选择成功
                 // console.log('您已选择成功');
                 // console.log(selectedGuimoPhotos);
                 this.setState({
                     assets_img: selectedGuimoPhotos,
                     guimoReady: true
                 })
            }) 
        }            
    }

    selJingliPhoto = () => {
        if(global.invest.investInfo.editable){
            SYImagePicker.showImagePicker(options, (err, selectedJingliPhotos) => {
                 if (err) {
                     // 取消选择
                     // console.log('您已取消选择');
                     return;
                 }
                 // 选择成功
                 // console.log('您已选择成功');
                 // console.log(selectedJingliPhotos);
                 this.setState({
                     experience_img: selectedJingliPhotos,
                     jingliReady: true
                 })
            }) 
        }
    }

    selSfzPhoto = () => {
        if(global.invest.investInfo.editable){
            SYImagePicker.showImagePicker(options1, (err, selectedSfzPhotos) => {
                 if (err) {
                     // 取消选择
                     // console.log('您已取消选择');
                     return;
                 }
                 // 选择成功
                 // console.log('您已选择成功');
                 // console.log(selectedSfzPhotos);
                 this.photoSfzResult(selectedSfzPhotos);
            }) 
        }
    }

    selSffPhoto = () => {
        if(global.invest.investInfo.editable){
            SYImagePicker.showImagePicker(options1, (err, selectedSffPhotos) => {
                 if (err) {
                     // 取消选择
                     // console.log('您已取消选择');
                     return;
                 }
                 // 选择成功
                 // console.log('您已选择成功');
                 // console.log(selectedSffPhotos);
                 this.photoSffResult(selectedSffPhotos);
            }) 
        }
    }


    photoSfzResult = (datas) => {
        let photoList = [],
            selectedPhotos = datas;

        // 图片base64转码
        let url = NetApi.base64,
            thisSelectedPhoto = selectedPhotos[0].base64;
        let data = {
            img: thisSelectedPhoto
        };
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    global.invest.investInfo.card_img_front = result.data;
                    this.saveLocalStorage();
                    this.setState({
                        card_img_front: result.data
                    })
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }

    photoSffResult = (datas) => {
        let photoList = [],
            selectedPhotos = datas;

        // 图片base64转码
        let url = NetApi.base64,
            thisSelectedPhoto = selectedPhotos[0].base64;
        let data = {
            img: thisSelectedPhoto
        };
        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    global.invest.investInfo.card_img_back = result.data;
                    this.saveLocalStorage();
                    this.setState({
                        card_img_back: result.data
                    })
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }



    setAssets = (num) => {
        if(global.invest.investInfo.editable){
            this.setState({
                assets: num,
                guimoReady: false,
                jingliReady: false,
            })
            global.invest.investInfo.assets = num;
            this.saveLocalStorage();
        }
    }

    setExperience1 = (num) => {
        if(global.invest.investInfo.editable){
            this.setState({
                experience1: num,
                guimoReady: false,
                jingliReady: false,
            })
            global.invest.investInfo.experience1 = num;
            global.invest.investInfo.experience = num + ',' + this.state.experience2 + ',' + this.state.experience3 + ',' + this.state.experience4;
            this.saveLocalStorage();
        }
    }

    setExperience2 = (num) => {
        if(global.invest.investInfo.editable){
            this.setState({
                experience2: num,
                guimoReady: false,
                jingliReady: false,
            })
            global.invest.investInfo.experience2 = num;
            global.invest.investInfo.experience = this.state.experience1 + ',' + num + ',' + this.state.experience3 + ',' + this.state.experience4;
            this.saveLocalStorage();
        }
    }

    setExperience3 = (num) => {
        if(global.invest.investInfo.editable){
            this.setState({
                experience3: num,
                guimoReady: false,
                jingliReady: false,
            })
            global.invest.investInfo.experience3 = num;
            global.invest.investInfo.experience = this.state.experience1 + ',' + this.state.experience2 + ',' + num + ',' + this.state.experience4;
            this.saveLocalStorage();
        }
    }

    setExperience4 = (num) => {
        if(global.invest.investInfo.editable){
            this.setState({
                experience4: num,
                guimoReady: false,
                jingliReady: false,
            })
            global.invest.investInfo.experience4 = num;
            global.invest.investInfo.experience = this.state.experience1 + ',' + this.state.experience2 + ',' + this.state.experience3 + ',' + num;
            this.saveLocalStorage();
        }
    }

    setTongyi = (num) => {
        if(global.invest.investInfo.editable){
            this.setState({
                isTongyi: num,
                guimoReady: false,
                jingliReady: false,
            })
        }
    }

    // 性别
    renderSexRow = (rowData) => {
        return (
            <View style = {GlobalStyle.dropdownRow}>
                <Text style = {GlobalStyle.dropdownRowText}>{rowData.name}</Text>
            </View>
        );
    }

    renderSexButtonText = (rowData) => {
        const {id, name} = rowData;
        global.invest.investInfo.sex_id = id;
        global.invest.investInfo.sex = name;
        this.setState({
            sex_id: id
        })
        this.saveLocalStorage();
        return name;
    }

    // 证件类型
    renderCardRow = (rowData) => {
        return (
            <View style = {GlobalStyle.dropdownRow}>
                <Text style = {GlobalStyle.dropdownRowText}>{rowData.name}</Text>
            </View>
        );
    }

    renderCardButtonText = (rowData) => {
        const {id, name} = rowData;
        global.invest.investInfo.card_id = id;
        global.invest.investInfo.card_type = name;
        this.setState({
            card_id: id
        })
        this.saveLocalStorage();
        return name;
    }

    // 国籍
    renderNationRow = (rowData) => {
        return (
            <View style = {GlobalStyle.dropdownRow}>
                <Text style = {GlobalStyle.dropdownRowText}>{rowData.name}</Text>
            </View>
        );
    }

    renderNationButtonText = (rowData) => {
        const {id, name} = rowData;
        global.invest.investInfo.nationality_id = id;
        global.invest.investInfo.nationality = name;
        this.setState({
            nationality_id: id
        })
        this.saveLocalStorage();
        return name;
    }

    _showDateTimePicker = () => {
        if(global.invest.investInfo.editable){
            this.setState({ 
                isDateTimePickerVisible: true 
            })
        }
    }

    _hideDateTimePicker = () => {
        this.setState({ 
            isDateTimePickerVisible: false 
        });
    }

    _handleDatePicked = (date) => {
        // console.log(date);
        let DateFormat =  moment(date).format("YYYY-MM-DD");
        global.invest.investInfo.birth_time = DateFormat;
        this.setState({
            birth_time: DateFormat
        });
        console.log(DateFormat);
        this.birthTimesCompleted(DateFormat);
        this._hideDateTimePicker();
    };

    birthTimesCompleted = (DateFormat) => {
        this.setState({
            birth_time: DateFormat
        })
        console.log(DateFormat);
        global.invest.investInfo.birth_time = DateFormat;
        this.saveLocalStorage();
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
                    title = {'专业投资者认证'}
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
                <KeyboardAwareScrollView>
                    <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                        <Text style={GlobalStyle.defaultText}>依照相关法律法规规定，进行私募基金投资前，必须进行实名登记并通过专业投资者认证，请您保证填写资料的完整性和准确性，我们的客服工作人员将在一个工作日内为您审核。</Text>
                    </View>

                    {this.state.back_msg ? 
                        <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                            <Text style={[GlobalStyle.defaultText, {color: '#f00'}]}>{this.state.back_msg}</Text>
                        </View>
                        : 
                        null
                    }

                    <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                        <View style={[GlobalStyle.titleModule,GlobalStyle.flexRowBetween]}>
                            <View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStart]}>
                                <Text style={GlobalStyle.titleText}>个人基本信息</Text>
                            </View>
                        </View>
                        <View style={GlobalStyle.mcell}>
                            <View style={GlobalStyle.cellItem}>
                                <Text style={GlobalStyle.cellLeft}>姓名</Text>
                                <View style={GlobalStyle.cellRight}>
                                    <TextInput
                                        placeholder={global.invest.investInfo.truename ? global.invest.investInfo.truename : '请填写真实姓名' }
                                        onChangeText={(text) => {
                                            global.invest.investInfo.truename = text;
                                            this.saveLocalStorage();
                                        }}
                                        style={[GlobalStyle.cellInput, GlobalStyle.cellTextColor, __IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        editable={global.invest.investInfo.editable ? true : false}
                                    >
                                    </TextInput>
                                </View>
                            </View>
                            <View style={GlobalStyle.cellItem}>
                                <Text style={GlobalStyle.cellLeft}>证件类型</Text>
                                <View style={GlobalStyle.cellRight}>
                                    <ModalDropdown
                                        style = {[GlobalStyle.selectView, {width: 160}]}
                                        textStyle = {[GlobalStyle.textStyle, {width: 160}]}
                                        dropdownStyle = {[GlobalStyle.dropdownStyle, {width: 160, height: 200}]}
                                        defaultValue = {global.invest.investInfo.card_type ? global.invest.investInfo.card_type : '请选择'} 
                                        renderRow={this.renderCardRow.bind(this)}
                                        options = {this.state.card_type}
                                        renderButtonText = {(rowData) => this.renderCardButtonText(rowData)}
                                        disabled={global.invest.investInfo.editable ? false : true}
                                    >
                                        <View style={[GlobalStyle.selectViewWrap, {width: 160}]}>
                                            <View style={[GlobalStyle.paymentMethodTitleView, {width: 160}]}>
                                                <Text style={GlobalStyle.cargoAttributesTitle}>{global.invest.investInfo.card_type ? global.invest.investInfo.card_type : '请选择'}</Text>
                                            </View>
                                        </View>
                                    </ModalDropdown>
                                </View>
                            </View>
                            <View style={GlobalStyle.cellItem}>
                                <Text style={GlobalStyle.cellLeft}>证件号</Text>
                                <View style={GlobalStyle.cellRight}>
                                    <TextInput
                                        placeholder={global.invest.investInfo.card_num ? global.invest.investInfo.card_num : '请填写证件号' }
                                        onChangeText={(text) => {
                                            global.invest.investInfo.card_num = text;
                                            this.saveLocalStorage();
                                        }}
                                        style={[GlobalStyle.cellInput, GlobalStyle.cellTextColor, __IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        editable={global.invest.investInfo.editable ? true : false}
                                    >
                                    </TextInput>
                                </View>
                            </View>
                            {global.invest.investInfo.card_id === 1 ? 
                                null
                            :
                                <View>
                                    <View style={GlobalStyle.cellItem}>
                                        <Text style={GlobalStyle.cellLeft}>性别</Text>
                                        <View style={GlobalStyle.cellRight}>
                                            <ModalDropdown
                                                style = {GlobalStyle.selectView}
                                                textStyle = {GlobalStyle.textStyle}
                                                dropdownStyle = {[GlobalStyle.dropdownStyle, {height: 80}]}
                                                defaultValue = {global.invest.investInfo.sex ? global.invest.investInfo.sex : '请选择'} 
                                                renderRow={this.renderSexRow.bind(this)}
                                                options = {this.state.sex}
                                                renderButtonText = {(rowData) => this.renderSexButtonText(rowData)}
                                                disabled={global.invest.investInfo.editable ? false : true}
                                            >
                                                <View style={GlobalStyle.selectViewWrap}>
                                                    <View style={GlobalStyle.paymentMethodTitleView}>
                                                        <Text style={GlobalStyle.cargoAttributesTitle}>{global.invest.investInfo.sex ? global.invest.investInfo.sex : '请选择'}</Text>
                                                    </View>
                                                </View>
                                            </ModalDropdown>
                                        </View>
                                    </View>
                                    <View style={GlobalStyle.cellItem}>
                                        <Text style={GlobalStyle.cellLeft}>出生日期</Text>
                                        <TouchableOpacity onPress={() => {this._showDateTimePicker()}} style={[GlobalStyle.cellRight, GlobalStyle.flexRowStart]} >
                                            <Text style={styles.cellRightText}>{global.invest.investInfo.birth_time ? global.invest.investInfo.birth_time : '点击选择您的出生日期'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            <View style={GlobalStyle.cellItem}>
                                <Text style={GlobalStyle.cellLeft}>国籍</Text>
                                <View style={GlobalStyle.cellRight}>
                                    <ModalDropdown
                                        style = {GlobalStyle.selectView}
                                        textStyle = {GlobalStyle.textStyle}
                                        dropdownStyle = {[GlobalStyle.dropdownStyle, {height: 200}]}
                                        defaultValue = {global.invest.investInfo.nationality ? global.invest.investInfo.nationality : '请选择'} 
                                        renderRow={this.renderNationRow.bind(this)}
                                        options = {this.state.nationality}
                                        renderButtonText = {(rowData) => this.renderNationButtonText(rowData)}
                                        disabled={global.invest.investInfo.editable ? false : true}
                                    >
                                        <View style={GlobalStyle.selectViewWrap}>
                                            <View style={GlobalStyle.paymentMethodTitleView}>
                                                <Text style={GlobalStyle.cargoAttributesTitle}>{global.invest.investInfo.nationality ? global.invest.investInfo.nationality : '请选择'}</Text>
                                            </View>
                                        </View>
                                    </ModalDropdown>
                                </View>
                            </View>
                            <View style={GlobalStyle.cellItem}>
                                <Text style={GlobalStyle.cellLeft}>职业</Text>
                                <View style={GlobalStyle.cellRight}>
                                    <TextInput
                                        placeholder={global.invest.investInfo.profession ? global.invest.investInfo.profession : '请填写职业' }
                                        onChangeText={(text) => {
                                            global.invest.investInfo.profession = text;
                                            this.saveLocalStorage();
                                        }}
                                        style={[GlobalStyle.cellInput, GlobalStyle.cellTextColor, __IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        editable={global.invest.investInfo.editable ? true : false}
                                    >
                                    </TextInput>
                                </View>
                            </View>
                            <View style={GlobalStyle.cellItem}>
                                <Text style={GlobalStyle.cellLeft}>职务</Text>
                                <View style={GlobalStyle.cellRight}>
                                    <TextInput
                                        placeholder={global.invest.investInfo.business ? global.invest.investInfo.business : '请填写职务' }
                                        onChangeText={(text) => {
                                            global.invest.investInfo.business = text;
                                            this.saveLocalStorage();
                                        }}
                                        style={[GlobalStyle.cellInput, GlobalStyle.cellTextColor, __IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        editable={global.invest.investInfo.editable ? true : false}
                                    >
                                    </TextInput>
                                </View>
                            </View>
                        </View> 
                        <View style={[styles.sfpicList, GlobalStyle.flexRowBetween]}>
                            <View style={[styles.zhengjianItem, GlobalStyle.flexColumnStart]}>
                                <TouchableOpacity onPress={() => {this.selSfzPhoto()}} style={styles.sfpicItem}>
                                    {global.invest.investInfo.card_img_front ? 
                                        <Image source={{uri: global.invest.investInfo.card_img_front}} style={styles.sfpicImg} />
                                    :
                                        <View style={[styles.sfpicText, GlobalStyle.flexColumnCenter]}>
                                            <Text style={styles.sfpiczi}>上传证件</Text>
                                            <Text style={styles.sfpiczi}>(正面)</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                                <Text style={styles.zhengjianText}>证件正面</Text>
                            </View>
                            <View style={[styles.zhengjianItem, GlobalStyle.flexColumnStart]}>
                                <TouchableOpacity onPress={() => {this.selSffPhoto()}} style={styles.sfpicItem}>
                                    {global.invest.investInfo.card_img_back ? 
                                        <Image source={{uri: global.invest.investInfo.card_img_back}} style={styles.sfpicImg} />
                                    :
                                        <View style={[styles.sfpicText, GlobalStyle.flexColumnCenter]}>
                                            <Text style={styles.sfpiczi}>上传证件</Text>
                                            <Text style={styles.sfpiczi}>(反面)</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                                <Text style={styles.zhengjianText}>证件反面</Text>
                            </View>
                        </View>

                    </View>

                    {global.invest.investInfo.special_type === 0 ? 
                    <View style={styles.teshutouzi}>
                        <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                            <View style={[GlobalStyle.titleModule,GlobalStyle.flexRowBetween]}>
                                <View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStartStart]}>
                                    <Text style={GlobalStyle.titleText}>资产规模</Text>
                                </View>
                            </View>
                            <View style={[GlobalStyle.mradio, {width: GlobalStyle.width - 60}]}>
                                
                                {this.state.assets === '1' ?
                                    <TouchableOpacity onPress={() => {this.setAssets(1)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.radioLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                            <Image source={Images.icon_gouxuan} style={[GlobalStyle.gouxuanIco]} />
                                        </View>
                                        <Text style={GlobalStyle.radioRightThemeColor}>最近三年年均收入不低于人民币50万元</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => {this.setAssets(1)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.radioLeft, {borderColor: '#666', }]}></View>
                                        <Text style={GlobalStyle.radioRight}>最近三年年均收入不低于人民币50万元</Text>
                                    </TouchableOpacity>
                                }
                                {this.state.assets === 2 ?
                                    <TouchableOpacity onPress={() => {this.setAssets(2)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.radioLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                            <Image source={Images.icon_gouxuan} style={[GlobalStyle.gouxuanIco]} />
                                        </View>
                                        <Text style={GlobalStyle.radioRightThemeColor}>金融资产不低于人民币500万元</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => {this.setAssets(2)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.radioLeft, {borderColor: '#666', }]}></View>
                                        <Text style={GlobalStyle.radioRight}>金融资产不低于人民币500万元</Text>
                                    </TouchableOpacity>
                                }
                                {this.state.assets === 3 ?
                                    <TouchableOpacity onPress={() => {this.setAssets(3)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.radioLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                            <Image source={Images.icon_gouxuan} style={[GlobalStyle.gouxuanIco]} />
                                        </View>
                                        <Text style={GlobalStyle.radioRightThemeColor}>最近20个交易日，金融资产不低于300万元</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => {this.setAssets(3)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.radioLeft, {borderColor: '#666', }]}></View>
                                        <Text style={GlobalStyle.radioRight}>最近20个交易日，金融资产不低于300万元</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <Text style={GlobalStyle.defaultText}>注：金融资产指本外币个人存款、国债、基金、证券集合理财银行理财产品，金融资产指本外币个人存款、国债、基金、证券集合理财</Text>
                            <View style={[styles.setPhoto, GlobalStyle.flexRowStart]}>
                                <TouchableOpacity onPress={() => {this.selGuimoPhoto()}} style={[styles.selPic, GlobalStyle.flexRowCenter]}>
                                    <Text style={styles.selPicText}>上传证明资料</Text>
                                </TouchableOpacity>
                                <View style={[styles.selPhotoList, GlobalStyle.flexRowStart]}>
                                    <ScrollView 
                                        horizontal={true}
                                        stickyHeaderIndices={[0]}
                                        style={styles.photoScroll}
                                    >
                                        {this.photoGuimoResult(this.state.assets_img)}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                            <View style={[GlobalStyle.titleModule,GlobalStyle.flexRowBetween]}>
                                <View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStartStart]}>
                                    <Text style={GlobalStyle.titleText}>投资经历</Text>
                                </View>
                            </View>
                            <View style={[GlobalStyle.mradio, {width: GlobalStyle.width - 60}]}>
                                {this.state.experience1 === 1 ?
                                    <TouchableOpacity onPress={() => {this.setExperience1(0)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.checkboxLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                            <Image source={Images.icon_gouxuan} style={[GlobalStyle.gouxuanIco]} />
                                        </View>
                                        <Text style={GlobalStyle.radioRightThemeColor}>具有2年以上证券、基金、期货、黄金、外汇等投资经历</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => {this.setExperience1(1)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.checkboxLeft, {borderColor: '#666', }]}></View>
                                        <Text style={GlobalStyle.radioRight}>具有2年以上证券、基金、期货、黄金、外汇等投资经历</Text>
                                    </TouchableOpacity>
                                }
                                {this.state.experience2 === 1 ?
                                    <TouchableOpacity onPress={() => {this.setExperience2(0)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.checkboxLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                            <Image source={Images.icon_gouxuan} style={[GlobalStyle.gouxuanIco]} />
                                        </View>
                                        <Text style={GlobalStyle.radioRightThemeColor}>具有2年以上金融产品设计、投资、风险管理及相关工作经历</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => {this.setExperience2(1)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.checkboxLeft, {borderColor: '#666', }]}></View>
                                        <Text style={GlobalStyle.radioRight}>具有2年以上金融产品设计、投资、风险管理及相关工作经历</Text>
                                    </TouchableOpacity>
                                }
                                {this.state.experience3 === 1 ?
                                    <TouchableOpacity onPress={() => {this.setExperience3(0)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.checkboxLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                            <Image source={Images.icon_gouxuan} style={[GlobalStyle.gouxuanIco]} />
                                        </View>
                                        <Text style={GlobalStyle.radioRightThemeColor}>获得职业资格认证的从事金融相关业务的注册会计师和律师</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => {this.setExperience3(1)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.checkboxLeft, {borderColor: '#666', }]}></View>
                                        <Text style={GlobalStyle.radioRight}>获得职业资格认证的从事金融相关业务的注册会计师和律师</Text>
                                    </TouchableOpacity>
                                }
                                {this.state.experience4 === 1 ?
                                    <TouchableOpacity onPress={() => {this.setExperience4(0)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.checkboxLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                            <Image source={Images.icon_gouxuan} style={[GlobalStyle.gouxuanIco]} />
                                        </View>
                                        <Text style={GlobalStyle.radioRightThemeColor}>经有关金融监管部门批准设立的金融机构的高级管理人员</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => {this.setExperience4(1)}} style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                        <View style={[GlobalStyle.checkboxLeft, {borderColor: '#666', }]}></View>
                                        <Text style={GlobalStyle.radioRight}>经有关金融监管部门批准设立的金融机构的高级管理人员</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <Text style={GlobalStyle.defaultText}>注：金融机构包括证券公司、期货公司、基金管理公司及其子公司、商业银行、保险公司、信托公司、财务公司等；经行业协会备案或者登记的证券公司子公司、期货公司子公司、私募基金管理人</Text>
                            <View style={[styles.setPhoto, GlobalStyle.flexRowStart]}>
                                <TouchableOpacity onPress={() => {this.selJingliPhoto()}} style={[styles.selPic, GlobalStyle.flexRowCenter]}>
                                    <Text style={styles.selPicText}>上传证明资料</Text>
                                </TouchableOpacity>
                                <View style={[styles.selPhotoList, GlobalStyle.flexRowStart]}>
                                    <ScrollView 
                                        horizontal={true}
                                        stickyHeaderIndices={[0]}
                                        style={styles.photoScroll}
                                    >
                                        {this.photoJingliResult(this.state.experience_img)}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyle.whiteModule, {marginTop: 10}]}>
                            <View style={[GlobalStyle.titleModule,GlobalStyle.flexRowBetween]}>
                                <View style={[GlobalStyle.titleLeft, GlobalStyle.flexRowStartStart]}>
                                    <Text style={GlobalStyle.titleText}>特殊说明</Text>
                                </View>
                            </View> 
                            <View style={[GlobalStyle.mradio, {width: GlobalStyle.width - 60}]}>
                                <View style={[GlobalStyle.radioItem, GlobalStyle.flexColumnStart]}>
                                    <Text style={GlobalStyle.radioRight}>1.存在实际控制关系</Text>
                                    <TextInput
                                        placeholder={global.invest.investInfo.control_people ? global.invest.investInfo.control_people : '如存在，请填写实际控制人' }
                                        onChangeText={(text) => {
                                            global.invest.investInfo.control_people = text;
                                            this.saveLocalStorage();
                                        }}
                                        style={[styles.spacialText, GlobalStyle.cellTextColor, __IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        editable={global.invest.investInfo.editable ? true : false}
                                    >
                                    </TextInput>
                                </View>
                                <View style={[GlobalStyle.radioItem, GlobalStyle.flexColumnStart]}>
                                    <Text style={GlobalStyle.radioRight}>2.交易的实际受益人，非您本人</Text>
                                    <TextInput
                                        placeholder={global.invest.investInfo.beneficiary ? global.invest.investInfo.beneficiary : '如存在，请填写实际受益人' }
                                        onChangeText={(text) => {
                                            global.invest.investInfo.beneficiary = text;
                                            this.saveLocalStorage();
                                        }}
                                        style={[styles.spacialText, GlobalStyle.cellTextColor, __IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        editable={global.invest.investInfo.editable ? true : false}
                                    >
                                    </TextInput>
                                    <TextInput
                                        placeholder={global.invest.investInfo.beneficiary_desc ? global.invest.investInfo.beneficiary_desc : '如存在，请填写实际受益人关系' }
                                        onChangeText={(text) => {
                                            global.invest.investInfo.beneficiary_desc = text;
                                            this.saveLocalStorage();
                                        }}
                                        style={[styles.spacialText, GlobalStyle.cellTextColor, __IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        editable={global.invest.investInfo.editable ? true : false}
                                    >
                                    </TextInput>
                                </View>
                                <View style={[GlobalStyle.radioItem, GlobalStyle.flexColumnStart]}>
                                    <Text style={GlobalStyle.radioRight}>3.有不良诚信记录</Text>
                                    <TextInput
                                        placeholder={global.invest.investInfo.bad_record ? global.invest.investInfo.bad_record : '如存在，请填写具体的不良诚信记录' }
                                        onChangeText={(text) => {
                                            global.invest.investInfo.bad_record = text;
                                            this.saveLocalStorage();
                                        }}
                                        style={[styles.spacialText, GlobalStyle.cellTextColor, __IOS__ ? null : styles.inputAndroid]} 
                                        underlineColorAndroid={'transparent'}
                                        editable={global.invest.investInfo.editable ? true : false}
                                    >
                                    </TextInput>
                                </View>
                            </View> 
                        </View> 
                    </View> 
                    : null }

                    {this.renzhengfooter()}
                        
                    
                </KeyboardAwareScrollView>

                <DateTimePicker
                    titleIOS={'选择时间'}
                    confirmTextIOS='确认'
                    cancelTextIOS='取消'
                    datePickerModeAndroid='calendar'
                    mode='date'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        );
    }


    renzhengfooter = () => {
        if(global.user.userData.is_investor === 1){
            return null;
        }else{
            return (
                <View style={[GlobalStyle.whiteModule, {marginTop: 0}]}>
                    {this.state.isTongyi !== 0 ?
                        <TouchableOpacity onPress={() => {this.setTongyi(0)}} style={[GlobalStyle.mradio, {width: GlobalStyle.width - 60, marginTop: 20, marginBottom: -15}]}>
                            <View style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                <View style={[GlobalStyle.checkboxLeft, {borderColor: GlobalStyle.themeColor, backgroundColor: GlobalStyle.themeColor}]}>
                                    <Image source={Images.icon_gouxuan} style={[GlobalStyle.gouxuanIco]} />
                                </View>
                                <Text style={GlobalStyle.radioRightThemeColor}>本人保证资金来源的合法性和所提供资料的真实性、有效性、准确性、完整性，并对其承担责任。</Text>
                            </View>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={() => {this.setTongyi(1)}} style={[GlobalStyle.mradio, {width: GlobalStyle.width - 60, marginTop: 20, marginBottom: -15}]}>
                            <View style={[GlobalStyle.radioItem, GlobalStyle.flexRowStartStart]}>
                                <View style={[GlobalStyle.checkboxLeft, {borderColor: '#666', }]}></View>
                                <Text style={GlobalStyle.radioRightThemeColor}>本人保证资金来源的合法性和所提供资料的真实性、有效性、准确性、完整性，并对其承担责任。</Text>
                            </View>
                        </TouchableOpacity>
                    }


                    {global.user.userData.is_investor === 2 ?
                        <TouchableOpacity onPress={()=>this.Subziliao()} style={[GlobalStyle.submit, {marginBottom: 15, backgroundColor: '#ddd'}]}>
                            <View style={GlobalStyle.btn}>
                                <Text style={GlobalStyle.btna}>提交</Text>   
                            </View>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={()=>this.Subziliao()} style={[GlobalStyle.submit, {marginBottom: 15}]}>
                            <View style={GlobalStyle.btn}>
                                <Text style={GlobalStyle.btna}>提交</Text>   
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            )
        }
    }



    photoGuimoResult = (datas) => {
        // console.log(datas);
        if(this.state.guimoReady){
            // 上传之前先清空
            global.invest.investInfo.assets_img = '';

            let photoList = [],
                selectedPhotos = datas;

            for (var i = 0; i < selectedPhotos.length; i++) {
                // 图片base64转码
                let url = NetApi.base64,
                    thisSelectedPhoto = selectedPhotos[i].base64;
                let data = {
                    img: thisSelectedPhoto
                };
                Services.Post(url, data)
                    .then( result => {
                        if (result && result.code === 1) {
                            // console.log(result);
                            thisSelectedPhoto = result.data;
                            // 拼接字符串
                            global.invest.investInfo.assets_img += thisSelectedPhoto + ',';
                            this.saveLocalStorage();
                        }else{
                            Toast.toastShort(result.msg);
                        }
                    })
                    .catch( error => {
                        Toast.toastShort('服务器请求失败，请稍后重试！');
                    })

                // 渲染页面
                 let photoItem = (
                    <Image key={i} source={{uri: thisSelectedPhoto}} style={styles.selPhotoItem} />
                 )
                 photoList.push(photoItem);

                 
                 
            }

            return photoList;
            
            
            this.setState({
                assets_img: assets_img,
            })
        }else {
            let selectedPhotos = global.invest.investInfo.assets_img, photoList = [];
            // console.log(selectedPhotos);
            if(selectedPhotos){
                // console.log(selectedPhotos);
                selectedPhotos = selectedPhotos.split(',');
                // console.log(selectedPhotos);

                for (var i = 0; i < selectedPhotos.length-1; i++) {
                    // 渲染页面
                     let photoItem = (
                        <Image key={i} source={{uri: selectedPhotos[i]}} style={styles.selPhotoItem} />
                     )
                     photoList.push(photoItem);
                     
                }
                
                return photoList;
                
                this.setState({
                    assets_img: assets_img,
                })
            }
                
        }
            
    }




    photoJingliResult = (datas) => {
        if(this.state.jingliReady){
            // 上传之前先清空
            global.invest.investInfo.experience_img = '';

            let photoList = [],
                selectedPhotos = datas;

            for (var i = 0; i < selectedPhotos.length; i++) {
                // 图片base64转码
                let url = NetApi.base64,
                    thisSelectedPhoto = selectedPhotos[i].base64;
                let data = {
                    img: thisSelectedPhoto
                };
                Services.Post(url, data)
                    .then( result => {
                        if (result && result.code === 1) {
                            // console.log(result);
                            thisSelectedPhoto = result.data;
                            // 拼接字符串
                            global.invest.investInfo.experience_img += thisSelectedPhoto + ',';
                            this.saveLocalStorage();
                        }else{
                            Toast.toastShort(result.msg);
                        }
                    })
                    .catch( error => {
                        Toast.toastShort('服务器请求失败，请稍后重试！');
                    })

                // 渲染页面
                 let photoItem = (
                    <Image key={i} source={{uri: thisSelectedPhoto}} style={styles.selPhotoItem} />
                 )
                 photoList.push(photoItem);
            }
            
            return photoList;
            
            this.setState({
                experience_img: experience_img,
            })
        }else {
            let selectedPhotos = global.invest.investInfo.experience_img, photoList = [];
            // console.log(selectedPhotos);
            if(selectedPhotos){
                // console.log(selectedPhotos);
                selectedPhotos = selectedPhotos.split(',');
                // console.log(selectedPhotos);

                for (var i = 0; i < selectedPhotos.length-1; i++) {
                    // 渲染页面
                     let photoItem = (
                        <Image key={i} source={{uri: selectedPhotos[i]}} style={styles.selPhotoItem} />
                     )
                     photoList.push(photoItem);
                     
                }
                
                return photoList;
                
                this.setState({
                    experience_img: experience_img,
                })
            }
                
        }
            
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    sfpicList: {
        padding: 15,
        paddingTop: 0
    },
    sfpicItem: {
        width: (GlobalStyle.width-40)/2,
        height: ((GlobalStyle.width-40)/2)*54/85.6,
        backgroundColor: '#929292',
        borderRadius: 5,
    },
    sfpicImg: {
        width: (GlobalStyle.width-40)/2,
        height: ((GlobalStyle.width-40)/2)*54/85.6,
        borderRadius: 5,
    },
    sfpicText: {
        height: ((GlobalStyle.width-40)/2)*54/85.6,
    },
    sfpiczi: {
        fontSize: 16,
        margin: 3,
        color: '#fff'
    },
    spacialText: {
        height:40,
        fontSize:15,
        textAlign:'left',
        color:'#525252',
        borderBottomWidth:1,
        borderBottomColor:'#ececec',
        marginTop: 5
    },
    setPhoto: {
        marginLeft: 15,
        marginBottom: 15,
        marginTop: 5
    },
    photoScroll: {
        // width: GlobalStyle - 100,
        marginRight: 100
    },
    selPic: {
        backgroundColor: '#999',
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10
    },
    selPicText: {
        color: '#fff',
    },
    selPhotoList: {
        
    },
    selPhotoItem: {
        width: 100,
        height: 100,
        borderRadius: 2,
        marginRight: 6
    },
    cellRightText: {
        color: '#bbbbc1'
    },
    zhengjianItem: {
        
    },
    zhengjianText: {
        marginTop: 10,
        textAlign: 'center',
        color: '#666',
        fontSize: 15
    },
});
