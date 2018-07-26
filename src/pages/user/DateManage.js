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

import ActionSheet from 'react-native-actionsheet'
import CheckboxCustom from 'react-native-checkboxcustom'

// 弹窗
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
options = ['上午',
    '下午',
    '全天',]
const title = '您确认要退出吗？'
/**
 * 日期管理页面
 */
export default class DateManage extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            user: global.user.userData,
            dateone: 0,
            datetwo: 0,
            datethree: 0,
            datefour: 0,
            datefive: 0,
            datesix: .0,
            dateseven: 0
        }
    }

    componentDidMount() {
        this.loadNetData();
    }

    onBack = () => {
        this.props.navigation.state.params.onCallBack();
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


    loadNetData=()=>{
        let url = NetApi.getMyworkTime + "?token=" + global.user.userData.token;
        Services.Get(url)
            .then(result => {
                // console.log(result.code);
                if (result.code==1) {

                    this.updateState({

                        dateone:result.data.list[0].split(',')[1],
                        datetwo:result.data.list[1].split(',')[1],
                        datethree:result.data.list[2].split(',')[1],
                        datefour:result.data.list[3].split(',')[1],
                        datefive:result.data.list[4].split(',')[1],
                        datesix:result.data.list[5].split(',')[1],
                        dateseven:result.data.list[6].split(',')[1]
                    })
                }
            })
            .catch(error => {
                // Toast.toastShort('服务器请求失败，请稍后重试！');
            })
    }

    handlePress = (i) => {
        if (i === 1) {
            this.doLogOut();
        }
    }

    handleDateOne = (option) => {
        if (option[0] === "上午") {
            this.updateState({
                dateone: 1
            })
        } else if (option[0] === "下午") {
            this.updateState({
                dateone: 2
            })
        } else if (option[0] === "全天") {
            this.updateState({
                dateone: 3
            })
        }
    }

    handleDateTwo = (option) => {
        if (option[0] === "上午") {
            this.updateState({
                datetwo: 1
            })
        } else if (option[0] === "下午") {
            this.updateState({
                datetwo: 2
            })
        } else if (option[0] === "全天") {
            this.updateState({
                datetwo: 3
            })
        }
    }
    handleDateThree = (option) => {
        if (option[0] === "上午") {
            this.updateState({
                datethree: 1
            })
        } else if (option[0] === "下午") {
            this.updateState({
                datethree: 2
            })
        } else if (option[0] === "全天") {
            this.updateState({
                datethree: 3
            })
        }
    }
    handleDateFour = (option) => {
        if (option[0] === "上午") {
            this.updateState({
                datefour: 1
            })
        } else if (option[0] === "下午") {
            this.updateState({
                datefour: 2
            })
        } else if (option[0] === "全天") {
            this.updateState({
                datefour: 3
            })
        }
    }
    handleDateFive = (option) => {
        if (option[0] === "上午") {
            this.updateState({
                datefive: 1
            })
        } else if (option[0] === "下午") {
            this.updateState({
                datefive: 2
            })
        } else if (option[0] === "全天") {
            this.updateState({
                datefive: 3
            })
        }
    }
    handleDateSix = (option) => {
        if (option[0] === "上午") {
            this.updateState({
                datesix: 1
            })
        } else if (option[0] === "下午") {
            this.updateState({
                datesix: 2
            })
        } else if (option[0] === "全天") {
            this.updateState({
                datesix: 3
            })
        }
    }
    handledateSeven = (option) => {
        if (option[0] === "上午") {
            this.updateState({
                dateseven: 1
            })
        } else if (option[0] === "下午") {
            this.updateState({
                dateseven: 2
            })
        } else if (option[0] === "全天") {
            this.updateState({
                dateseven: 3
            })
        }
    }
    save =()=>{

        let url = NetApi.updateMyWorkeTime + "?token=" + global.user.userData.token;
        let worktimedata=''

        let data1=['A1',this.state.dateone]
        let data2=['A2',this.state.datetwo]
        let data3=['A3',this.state.datethree]
        let data4=['A4',this.state.datefour]
        let data5=['A5',this.state.datefive]
        let data6=['A6',this.state.datesix]
        let data7=['A0',this.state.dateseven]

        if(this.state.dateone!=0){
            worktimedata+=([data1]+";")
        }
        if(this.state.datetwo!=0){
            worktimedata+=([data2]+";")
        }
        if(this.state.datethree!=0){
            worktimedata+=([data3]+";")
        }
         if(this.state.datefour!=0){
            worktimedata+=([data4]+";")
        }
         if(this.state.datefive!=0){
            worktimedata+=([data5]+";")
        }
        if(this.state.datesix!=0){
            worktimedata+=([data6]+";")
        }
        if(this.state.dateseven!=0){
            worktimedata+=([data7]+";")
        }

        let data={
            worktime:worktimedata
        }
        Services.Post(url,data)
            .then(result => {
                // console.log(result.code);
                if (result.code==1) {
                    Toast.toastShort(result.msg)
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
                    title={'日期管理'}
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

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 30,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'white',
                    borderTopWidth:1,
                    borderColor:'gray'
                }}>
                    <Text>周一</Text>
                    <CheckboxCustom
                        options={options}
                        optionStyle={{height: 45,borderColor:"gray"}}
                        selectedOptions={[options[this.state.dateone - 1]]}
                        maxSelectedOptions={1}
                        onSelection={(option) => this.handleDateOne(option)}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 30,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'white',
                    borderTopWidth:1,
                    borderColor:'gray'
                }}>
                    <Text>周二</Text>
                    <CheckboxCustom
                        options={options}
                        optionStyle={{height: 45,borderColor:"gray"}}
                        selectedOptions={[options[this.state.datetwo - 1]]}
                        maxSelectedOptions={1}
                        onSelection={(option) => this.handleDateTwo(option)}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 30,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'white',
                    borderTopWidth:1,
                    borderColor:'gray'
                }}>
                    <Text>周三</Text>
                    <CheckboxCustom
                        options={options}
                        optionStyle={{height: 45,borderColor:"gray"}}
                        selectedOptions={[options[this.state.datethree - 1]]}
                        maxSelectedOptions={1}
                        onSelection={(option) => this.handleDateThree(option)}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 30,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'white',
                    borderTopWidth:1,
                    borderColor:'gray'
                    
                }}>
                    <Text>周四</Text>
                    <CheckboxCustom
                        options={options}
                        optionStyle={{height: 45,borderColor:"gray"}}
                        selectedOptions={[options[this.state.datefour - 1]]}
                        maxSelectedOptions={1}
                        onSelection={(option) => this.handleDateFour(option)}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 30,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'white',
                    borderTopWidth:1,
                    borderColor:'gray'
                    
                }}>
                    <Text>周五</Text>
                    <CheckboxCustom
                        options={options}
                        optionStyle={{height: 45,borderColor:"gray"}}
                        selectedOptions={[options[this.state.datefive - 1]]}
                        maxSelectedOptions={1}
                        onSelection={(option) => this.handleDateFive(option)}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 30,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'white',
                    borderTopWidth:1,
                    borderColor:'gray'
                }}>
                    <Text>周六</Text>
                    <CheckboxCustom
                        options={options}
                        optionStyle={{height: 45,borderColor:"gray"}}
                        selectedOptions={[options[this.state.datesix - 1]]}
                        maxSelectedOptions={1}
                        onSelection={(option) => this.handleDateSix(option)}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 30,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'white',
                    borderTopWidth:1,
                    borderColor:'gray',
                    borderBottomWidth:1
                }}>
                    <Text>周天</Text>
                    <CheckboxCustom
                        options={options}
                        optionStyle={{height: 45,borderColor:"gray"}}
                        selectedOptions={[options[this.state.dateseven - 1]]}
                        maxSelectedOptions={1}
                        onSelection={(option) => this.handledateSeven(option)}
                    />
                </View>
                <TouchableOpacity onPress={()=>this.save()}>
                    <View style={{
                        padding: 10,
                        margin: 10,
                        backgroundColor: "white",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5

                    }}>
                        <Text style={{color: "black"}}> 保存</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.bgColor,
    },
    mtop: {
        backgroundColor: GlobalStyle.themeColor,
        height: 160,
        padding: 15,
    },
    minfo: {
        height: 30,
    },
    mtouxiang: {
        width: 32,
        height: 32,
        marginRight: 6,
        borderRadius: 16,
    },
    mnicheng: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    },
    mshenfen: {
        backgroundColor: '#fff',
        marginTop: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 100,
        width: GlobalStyle.width - 30,
    },
    msfico: {
        height: (GlobalStyle.width - 80) * 96 / 1251,
        width: GlobalStyle.width - 80,
        marginTop: 15
    },
    msftext: {
        fontSize: 16,
        color: GlobalStyle.themeColor,
        fontWeight: 'bold',
        marginTop: 13
    },
    userlistRightText: {
        position: 'absolute',
        right: 20,
        color: '#585858',
    },
});
