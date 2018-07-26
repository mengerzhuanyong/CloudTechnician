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

export default class RenzhengType extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state =  {
            user: global.user.userData,
            typeActive: 0,
            is_investor: params.is_investor,
        }
    }

    componentDidMount(){
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.state.params.onCallBack();
        this.props.navigation.goBack();
    }

    componentWillUnmount = () => {
        this.onBack();
    }

    updateState= (state) => {
        if (!this) { return };
        this.setState(state);
    }

    loadNetData = () => {
        // console.log(global.invest);
    }

    onPushNavigator = (compent) => {
        const { navigate } = this.props.navigation;
        navigate( compent , {
            is_investor: this.state.is_investor,
            renzhengKey: this.props.navigation.state.key,
            onCallBack:()=>{
                this.loadNetData();
            }
        })
    }   

    getNext = () => {
        let url = NetApi.set_special_type,
            typeActive = this.state.typeActive;

        if (typeActive === -1) {
            Toast.toastShort('请选择投资者类型');
            return false;
        }

        // console.log(typeActive);

        let data = {
            member_id: global.user.userData.id,
            token: global.user.userData.token,
            special_type: typeActive
        };

        Services.Post(url, data)
            .then( result => {
                if (result && result.code === 1) {
                    global.invest.investInfo.editable = true;
                    RouterHelper.navigate('', 'Renzheng');
                    Toast.toastShort(result.msg);
                }else{
                    Toast.toastShort(result.msg);
                }
            })
            .catch( error => {
                Toast.toastShort('服务器请求失败，请稍后重试！');
            })

        // 本地存储
        // console.log(typeActive);
        global.invest.investType = typeActive;
        this.saveLocalStorage();

    }

    saveLocalStorage = () => {
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
                special_type: global.invest.investType,
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
            special_type: global.invest.investType,
            editable: global.invest.investInfo.editable,
        };


    };

    setType = (n) => {
        global.invest.investType = n;
        this.updateState({
            typeActive: n
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
                <View style={[GlobalStyle.whiteModule]}>
                    <Text style={styles.tishi}>选择您的身份，我们将会为您提供对应的服务（选择后不可更改，请慎重选择）</Text>
                    <View style={styles.typeList}>
                        <TouchableOpacity onPress={() => {this.setType(0)}} style={[styles.typeItem, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.typeText}>非特殊投资者</Text>
                            {this.state.typeActive === 0 ?
                                <View style={[styles.typeRadio, styles.typeRadioActive]}>
                                    <Image source={require('../../assets/images/icons/icon_gouxuan.png')} style={[styles.gouxuanIco]} />
                                </View>
                            :
                                <View style={styles.typeRadio}></View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setType(1)}} style={[styles.typeItem, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.typeText}>社保基金、企业年金等</Text>
                            {this.state.typeActive === 1 ?
                                <View style={[styles.typeRadio, styles.typeRadioActive]}>
                                    <Image source={require('../../assets/images/icons/icon_gouxuan.png')} style={[styles.gouxuanIco]} />
                                </View>
                            :
                                <View style={styles.typeRadio}></View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setType(2)}} style={[styles.typeItem, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.typeText}>依法设立并在中国基金业协会备案的投资计划</Text>
                            {this.state.typeActive === 2 ?
                                <View style={[styles.typeRadio, styles.typeRadioActive]}>
                                    <Image source={require('../../assets/images/icons/icon_gouxuan.png')} style={[styles.gouxuanIco]} />
                                </View>
                            :
                                <View style={styles.typeRadio}></View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setType(3)}} style={[styles.typeItem, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.typeText}>创元汇及其从业人员</Text>
                            {this.state.typeActive === 3 ?
                                <View style={[styles.typeRadio, styles.typeRadioActive]}>
                                    <Image source={require('../../assets/images/icons/icon_gouxuan.png')} style={[styles.gouxuanIco]} />
                                </View>
                            :
                                <View style={styles.typeRadio}></View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setType(4)}} style={[styles.typeItem, GlobalStyle.flexRowBetween]}>
                            <Text style={styles.typeText}>中国证监会特殊规定的机构及个人</Text>
                            {this.state.typeActive === 4 ?
                                <View style={[styles.typeRadio, styles.typeRadioActive]}>
                                    <Image source={require('../../assets/images/icons/icon_gouxuan.png')} style={[styles.gouxuanIco]} />
                                </View>
                            :
                                <View style={styles.typeRadio}></View>
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>this.getNext()} style={styles.btn}>
                        <Text style={styles.btna}>下一步</Text>   
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tishi: {
        fontSize: 15,
        color: '#333',
        paddingLeft: 15,
        marginBottom: 30,
        lineHeight: 24
    },
    typeList: {

    },
    typeItem: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        paddingLeft: 15,
        paddingRight: 15
    },
    typeText: {
        color: '#333',
        fontSize: 15,
    },
    typeRadio: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 11,
    },
    typeRadioActive: {
        backgroundColor: GlobalStyle.themeColor,
        borderColor: GlobalStyle.themeColor,
    },
    gouxuanIco: {
        width: 18,
        height: 18,
        top: 1,
        left: 1
    },
    btn: {
        marginTop: 36,
        marginLeft: 15,
        width: GlobalStyle.width - 30,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: GlobalStyle.themeColor,
    },
    btna: {
        color: '#fff',
        fontSize: 16,
    }
});
