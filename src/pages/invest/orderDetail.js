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
 * 订单详情页面
 */
export default class OrderDetail extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            id: params.id,
            status:params.status,
            sn: '',
            type_name: '',
            server_time: '',
            server_address: '',
            goods_list:[],
            photo_list:[],
            telephone:"",
            consignee:"",
        }
    }

    componentDidMount() {
        this.loadNetData()
    }

    onBack = () => {
        // this.props.navigation.state.params.onCallBack();
        this.props.navigation.goBack();
    }

    componentWillUnmount = () => {
        this.onBack();
    }

    loadNetData = () => {
        // console.log(this.state.problemData);
        let url = NetApi.getOrderInfo + "?token=" + global.user.userData.token;
        let data = {
            id: this.state.id
        }
        // this.setState({})
        Services.Post(url, data)
            .then(result => {
                // console.log(result.code);
                if (result.code === 1) {
                    this.setState({
                        sn: result.data.sn,
                        type_name: result.data.type_name,
                        server_time: result.data.server_time,
                        server_address: result.data.server_address,
                        goods_list: result.data.goods_list,
                        photo_list:result.data.server_albums,
                        telephone:result.data.telephone,
                        consignee:result.data.consignee,

                    })
                }
            })
            .catch(error => {
                // Toast.toastShort('');
            })
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

    goodlist(data){
        let list=[];
        for(var i=0;i<data.lengt;i++) {
            let item = (
                <TouchableOpacity style={{
                    marginTop: 5, marginRight: 10, marginLeft: 10, marginBottom: 5, backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 5,
                    borderRadius: 5
                }}>
                    <View style={GlobalStyle.newsLeft}>
                        <Image source={{uri:data[i].thumb}}
                               style={GlobalStyle.newsThumb}/>
                    </View>
                    <View style={[GlobalStyle.newsRight, GlobalStyle.flexColumnBetweenStart]}>
                        <Text style={GlobalStyle.newsTitle}>商品名称</Text>
                        <Text style={GlobalStyle.newsDesc}>data[i].name</Text>
                        <View style={[GlobalStyle.newsInfo, GlobalStyle.flexRowBetween]}>
                            <Text style={GlobalStyle.newsDate}>2018-5-30</Text>
                            <View style={[GlobalStyle.newsClick, GlobalStyle.flexRowStart]}>
                                <Text style={GlobalStyle.newsClickText}>数量</Text>
                                <Text style={GlobalStyle.newsClickNum}>1234</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
            list.push(item)
        }
        return<View>{list}</View>

    }

    setPhoto = (index) => {
        SYImagePicker.showImagePicker(options, (err, selectedPhotos) => {
            if (err) {
                // 取消选择
                // console.log('您已取消选择');
                return;
            }
            // 选择成功
            // console.log('您已选择成功');
            // console.log(selectedPhotos);
            this.photoResult(selectedPhotos,index);
        })
    }

    /**
     * 第一张图片
     * @param datas
     */
    photoResult = (datas,index) => {
        let photoList = [],
            selectedPhotos = datas;

        // 图片base64转码
        let url = NetApi.addServerAlbum+"?token="+ global.user.userData.token,
            thisSelectedPhoto = selectedPhotos[0].base64;
        let data = {
            base64: thisSelectedPhoto,
            order_id:this.state.id
        };

        Services.Post(url, data)
            .then(result => {
                if (result && result.code === 1) {
                    // console.log(result);
                    let newlist=this.state.photo_list
                    newlist[index] = {img_url:result.data.img_url}
                    this.updateState({
                        photo_list: newlist,
                    })
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
            <View style={styles.container}>
                <NavigationBar
                    title={'订单详情页面'}
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
                    <View style={{marginTop: 10, backgroundColor: '#fff', borderRadius: 5, padding: 5,marginBottom:5,marginLeft:10,marginRight:10}}>

                        <Text style={{margin: 5}}>服务单号</Text>
                        <Text style={{margin: 5}}>{this.state.sn}</Text>

                    </View>
                    <View style={{marginTop: 5, backgroundColor: '#fff', borderRadius: 5, padding: 5,marginBottom:5,marginLeft:10,marginRight:10}}>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{margin: 5}}>客户名称</Text>
                            <Text style={{margin: 5}}>{this.state.consignee}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{margin: 5}}>客户电话</Text>
                            <Text style={{margin: 5}}>{this.state.telephone}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{margin: 5}}>服务时间</Text>
                            <Text style={{margin: 5}}>{this.state.server_time}</Text>
                        </View>

                        <View style={{}}>
                            <Text style={{margin: 5}}>服务地点</Text>
                            <Text style={{margin: 5}}>{this.state.server_address}</Text>
                        </View>

                    </View>

                    {this.goodlist(this.state.goods_list)}
                    {
                        this.state.status==1
                            ?
                            <View style={{flexDirection:'column',marginTop: 10, backgroundColor: '#fff', borderRadius: 5, padding: 5,marginBottom:5,marginLeft:10,marginRight:10}}>
                                <Text style={{margin: 5}}>添加施工过程</Text>

                                <View style={{height:100,  flexDirection: 'row', justifyContent: 'space-around', alignItems: "center",backgroundColor:'#fff' }}>
                                    {
                                        this.state.photo_list[0]?
                                            <Image source={{uri:this.state.photo_list[0].img_url}} style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            :
                                            <TouchableOpacity onPress={()=>this.setPhoto(0)}>
                                                <Image source={Images.picAdd}style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            </TouchableOpacity>
                                    }
                                    {
                                        this.state.photo_list[1]?
                                            <Image source={{uri:this.state.photo_list[1].img_url}} style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            :
                                            <TouchableOpacity onPress={()=>this.setPhoto(1)}>
                                                <Image source={Images.picAdd}style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            </TouchableOpacity>
                                    }
                                    {
                                        this.state.photo_list[2]?
                                            <Image source={{uri:this.state.photo_list[2].img_url}} style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            :
                                            <TouchableOpacity onPress={()=>this.setPhoto(2)}>
                                                <Image source={Images.picAdd}style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            </TouchableOpacity>
                                    }
                                </View>

                                <View style={{height:100,  flexDirection: 'row', justifyContent: 'space-around', alignItems: "center",backgroundColor:'#fff' }}>
                                    {
                                        this.state.photo_list[3]?
                                            <Image source={{uri:this.state.photo_list[3].img_url}} style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            :
                                            <TouchableOpacity onPress={()=>this.setPhoto(3)}>
                                                <Image source={Images.picAdd}style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            </TouchableOpacity>
                                    }
                                    {
                                        this.state.photo_list[4]?
                                            <Image source={{uri:this.state.photo_list[4].img_url}} style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            :
                                            <TouchableOpacity onPress={()=>this.setPhoto(4)}>
                                                <Image source={Images.picAdd}style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            </TouchableOpacity>
                                    }
                                    {
                                        this.state.photo_list[5]?
                                            <Image source={{uri:this.state.photo_list[5].img_url}} style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            :
                                            <TouchableOpacity onPress={()=>this.setPhoto(5)}>
                                                <Image source={Images.picAdd}style={{borderColor:'#BEBEBE',borderRadius:5,borderWidth:1,textAlign:'center',width:80,height:80}} />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            :
                            <View></View>
                    }

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
