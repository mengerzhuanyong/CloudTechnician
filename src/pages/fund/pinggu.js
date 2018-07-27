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


import pingguItem from '../../assets/datajson/pingguItem.json'
import SYImagePicker from "react-native-syan-image-picker";
import ActionSheet from 'react-native-actionsheet'

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
// 弹窗
const DESTRUCTIVE_INDEX = 0
const title = '技能分类'
/**
 * 技能认证页面
 */
export default class Pinggu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            problemData: pingguItem.data,
            questionNum: pingguItem.data.length,
            problemActive: 0,
            answerActive: -1,
            resultAnswer: '',

            picAdd1: '',
            picAdd2: '',

            skillcontent: [],
            skillid:[],

            cancleindex:'',
            destructiveindex:'',
            skillitem:'',
            imgurl1:'',
            imgurl2:'',
            skillitemid:'',


            bug:0,
            advice:0,
            tucao:0,
            other:0,

            chooseall:''

        }
    }

    componentDidMount() {
        this.loadNetData();
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

    loadNetData = () => {
        // console.log(this.state.problemData);
        let url = NetApi.getAllSkill + "?token=" + global.user.userData.token;
        // this.setState({})
        Services.Get(url)
            .then(result => {
                // console.log(result.code);
                if (result) {
                    var skillid=[];
                    var skillcontent=[];
                    for (var i = 0; i < result.data.list.length; i++) {
                        skillid[i] = result.data.list[i].id;
                        skillcontent[i] = result.data.list[i].name;
                    }
                    skillid[result.data.list.length]="-1";
                    skillcontent[result.data.list.length]='取消'
                    this,this.updateState({
                        skillcontent:skillcontent,
                        skillid:skillid,
                        cancleindex:result.data.list.length,
                        destructiveindex:result.data.list.length
                    })

                }
            })
            .catch(error => {
                // Toast.toastShort('');
            })

    }


    onPushNavigator = (compent) => {
        const {navigate} = this.props.navigation;
        navigate(compent, {})
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
                    title={'技能认证'}
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
                <ScrollView style={[ {marginTop: 10,backgroundColor:'#f5f5f5'}]}>

                    <View style={{flexDirection: "column"}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: "center",
                            backgroundColor: '#fff',
                            paddingTop:15,
                            paddingBottom:15
                        }}>
                            {
                                this.state.bug==0?
                                    <TouchableOpacity style={{flex:1}} onPress={()=>{this.updateState({bug:2})}}>
                                        <Text style={{paddingTop:5,paddingBottom:5,borderRadius:5, marginLeft:15,marginRight:15,textAlign: 'center',borderWidth:1,borderColor:"#f3f3f3",}}>贴膜</Text>

                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{flex:1}} onPress={()=>{this.updateState({bug:0})}}>
                                        <Text style={{paddingTop:5,paddingBottom:5,borderRadius:5, marginLeft:15,marginRight:15,textAlign: 'center',borderWidth:1,borderColor:GlobalStyle.themeColor,}}>贴膜</Text>

                                    </TouchableOpacity>
                            }

                            {
                                this.state.advice==0?
                                    <TouchableOpacity style={{flex:1}} onPress={()=>{this.updateState({advice:3})}}>
                                        <Text style={{paddingTop:5,paddingBottom:5,borderRadius:5, marginLeft:15,marginRight:15,textAlign: 'center',borderWidth:1,borderColor:"#f3f3f3",}}>倒车影像</Text>

                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{flex:1}} onPress={()=>{this.updateState({advice:0})}}>
                                        <Text style={{paddingTop:5,paddingBottom:5,borderRadius:5, marginLeft:15,marginRight:15,textAlign: 'center',borderWidth:1,borderColor:GlobalStyle.themeColor,}}>倒车影像</Text>

                                    </TouchableOpacity>

                            }
                            {
                                this.state.tucao==0?
                                    <TouchableOpacity style={{flex:1}}onPress={()=>{this.updateState({tucao:4})}}>
                                        <Text style={{paddingTop:5,paddingBottom:5,borderRadius:5, marginLeft:15,marginRight:15,textAlign: 'center',borderWidth:1,borderColor:"#f3f3f3",}}>导航仪</Text>

                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{flex:1}}onPress={()=>{this.updateState({tucao:0})}}>
                                        <Text style={{paddingTop:5,paddingBottom:5,borderRadius:5, marginLeft:15,marginRight:15,textAlign: 'center',borderWidth:1,borderColor:GlobalStyle.themeColor,}}>导航仪</Text>

                                    </TouchableOpacity>

                            }

                            {
                                this.state.other==0?
                                    <TouchableOpacity style={{flex:1}}onPress={()=>{this.updateState({other:5})}}>
                                        <Text style={{paddingTop:5,paddingBottom:5,borderRadius:5, marginLeft:15,marginRight:15,textAlign: 'center',borderWidth:1,borderColor:"#f3f3f3",}}>美容</Text>

                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{flex:1}}onPress={()=>{this.updateState({other:0})}}>
                                        <Text style={{paddingTop:5,paddingBottom:5,borderRadius:5, marginLeft:15,marginRight:15,textAlign: 'center',borderWidth:1,borderColor:GlobalStyle.themeColor,}}>美容</Text>

                                    </TouchableOpacity>

                            }

                        </View>
                    </View>

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={title}
                        options={this.state.skillcontent}
                        cancelButtonIndex={this.state.cancleindex}
                        destructiveButtonIndex={this.state.destructiveindex}
                        onPress={this.handlePress}
                    />

                    <Text style={[GlobalStyle.defaultText, {fontSize: 15, color: '#666',backgroundColor:'#fff',
                        marginTop:15}]}>请上传证书正面照片<Text
                        style={{color: GlobalStyle.themeColor,backgroundColor:'#fff'}}></Text></Text>

                    <TouchableOpacity onPress={() => {
                        this.setPhoto()
                    }} >
                        <View style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                            {
                                this.state.picAdd1 ?
                                    <Image
                                        source={{uri: this.state.picAdd1}}
                                        style={[{ width: 60, height: 60,  },styles.picAdd]} />
                                    :
                                    <View style={[styles.picAdd]}>
                                        <Image source={Images.picAdd}
                                               style={{ width: 60, height: 60, }} />
                                        <Text >点击添加图片</Text>
                                    </View>
                            }
                        </View>
                    </TouchableOpacity>

                    <Text style={[GlobalStyle.defaultText, {fontSize: 15, color: '#666',backgroundColor:'#fff',
                        marginTop: 15}]}>请上传证书背面照片<Text
                        style={{color: GlobalStyle.themeColor}}></Text></Text>
                    <TouchableOpacity onPress={() => {
                        this.setPhoto2()
                    }} >
                        <View style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                        {
                            this.state.picAdd2 ?
                                <Image
                                    source={{uri: this.state.picAdd2}}
                                       style={[{ width: 60, height: 60,  },styles.picAdd]} />
                                :
                                <View style={[styles.picAdd]}>
                                    <Image source={Images.picAdd}
                                           style={{ width: 60, height: 60, }} />
                                    <Text >点击添加图片</Text>
                                </View>
                        }
                        </View>
                    </TouchableOpacity>

                    {/*<Text>上传证书照片</Text>*/}
                    {/*<View style={{ backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', }}>*/}
                        {/*<TouchableOpacity >*/}
                            {/*<Image style={{ width: 60, height: 60, backgroundColor: 'red', }} />*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}

                    <TouchableOpacity onPress={() => {
                        this.submit()
                    }} style={GlobalStyle.submit}>
                        <Text style={GlobalStyle.btna}>提交</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    submit=()=>{

        if(this.state.bug!=0){
            this.state.chooseall+="["+this.state.bug+"]"+","
        }
        if(this.state.advice!=0){
            this.state.chooseall+="["+this.state.advice+"]"+","
        }
        if(this.state.tucao!=0){
            this.state.chooseall+="["+this.state.tucao+"]"+","
        }
        if(this.state.other!=0){
            this.state.chooseall+="["+this.state.other+"]"+","
        }


        // console.log(this.state.problemData);
        let url = NetApi.addSkill + "?token=" + global.user.userData.token;
        let data ={
            img_url1:this.state.imgurl1,
            img_url2:this.state.imgurl2,
            skill_arr:this.state.chooseall,
        }
        // this.setState({})
        Services.Post(url,data,true)
            .then(result => {
                // console.log(result.code);
                if (result& result.code==1) {
                    Toast.toastShort(result.msg);
                    this.onBack()
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                Toast.toastShort('这是怎么了么。。');
            })

    }

    setPhoto2 = () => {
        SYImagePicker.showImagePicker(options, (err, selectedPhotos) => {
            if (err) {
                // 取消选择
                // console.log('您已取消选择');
                return;
            }
            // 选择成功
            // console.log('您已选择成功');
            // console.log(selectedPhotos);
            this.photoResult2(selectedPhotos);
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
    /**
     * 第二张图片
     * @param datas
     */
    photoResult2 = (datas) => {
        let photoList = [],
            selectedPhotos = datas;

        // 图片base64转码
        let url = NetApi.base64,
            thisSelectedPhoto = selectedPhotos[0].base64;
        let data = {
            base64: thisSelectedPhoto,
        };
        this.setState({
            picAdd2: thisSelectedPhoto
        })
        Services.Post(url, data)
            .then(result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    this.updateState({
                        imgurl2: result.data.img_url
                    })
                } else {
                    Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }
    /**
     * 第一张图片
     * @param datas
     */
    photoResult = (datas) => {
        let photoList = [],
            selectedPhotos = datas;

        // 图片base64转码
        let url = NetApi.base64,
            thisSelectedPhoto = selectedPhotos[0].base64;
        let data = {
            base64: thisSelectedPhoto,
        };
        this.setState({
            picAdd1: thisSelectedPhoto
        })
        Services.Post(url, data)
            .then(result => {
                if (result && result.code === 1) {
                    // console.log(result);

                    this.setState({
                        imgurl1: result.data.img_url,
                    })
                } else {
                    Toast.toastShort(result.msg);
                }
            })
            .catch(error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

    }


    showActionSheet = () => {
        this.ActionSheet.show()
    }

    handlePress = (i) => {

            this.setState({
                skillitem: this.state.skillcontent[i],
                skillitemid:this.state.skillid[i]
            })
            // Toast.toastShort("第一个")

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    pingguModule: {
        borderWidth: 1,
        borderColor: '#ececec',
        margin: 15,
        marginBottom: 10,
        borderRadius: 5,
        padding: 15

    },
    pingguItem: {
        display: 'none',

    },
    pingguItemActive: {
        display: 'flex'
    },
    pingguTitle: {
        color: GlobalStyle.themeColor,
        fontSize: 16,
        lineHeight: 22,
    },
    numItem: {},
    numNow: {},
    numXian: {},
    numAll: {},
    numSame: {
        color: GlobalStyle.themeColor,
        fontSize: 14,

    },
    picAdd: {
        display: 'flex',
        flexDirection: 'column',
        width: GlobalStyle.width - 60,
        marginRight: 30,
        marginLeft: 30,
        backgroundColor: '#ffffff',
        margin:10,
        borderRadius:5,
        height: 100,
        borderWidth: 2,
        borderColor: "#eeeeee",
        alignItems: 'center', justifyContent: 'center',
    },
    chooseitem:{
        backgroundColor:'#fff'
    }
});
