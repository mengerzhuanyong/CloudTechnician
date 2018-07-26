/**
 * 奶牛金服 - VerificationCode
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import GlobalStyle from '../../constant/GlobalStyle'
import {VerticalLine} from '../../component/common/CommonLine'

export default class VerificationCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: 60,
            mobile: this.props.mobile,
            secureTextEntry: true,
            codeAlreadySend: false,
        };
        this.lastActionTime = 0;
    }

    static defaultProps = {
        type: 'public',
        mobile: '',
        btnViewStyle: null,
        btnStyle: null,
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            mobile: nextProps.mobile
        })
    }

    componentWillUnmount() {
        this.timerInterval && clearInterval(this.timerInterval);
    }

    getVerificationCode = async (mobile, type) => {
        let url = ServicesApi.verificationCode;
        if (!Tool.checkMobile(mobile)) {
            return;
        }
        type = type === 'register' ? 1 : 0;
        let data = {
            type,
            telephone: mobile,
        };
        // this.countDownTimer();
        // return;
        let result = await Services.Post(url, data, true);
        if (result) {
            if (result.code === 1) {
                this.countDownTimer();
                Toast.toastShort('验证码已发送，请注意查收！', 'center');
            } else {
                Toast.toastShort(result.msg, 'center');
            }
        }
    };

    // 验证码倒计时
    countDownTimer(){
        this.setState({
            codeAlreadySend: true,
            seconds: 60,
        });
        this.timerInterval = setInterval(() => {
            if (this.state.seconds === 0) {
                return clearInterval(this.timerInterval);
            }

            this.setState({
                seconds: this.state.seconds - 1
            });
        }, 1000)
    };

    render(){
        let {type, style, titleStyle, lineStyle} = this.props;
        let {mobile, seconds, codeAlreadySend} = this.state;
        if (!codeAlreadySend) {
            return (
                <TouchableOpacity
                    style={[styles.btnViewStyle, style]}
                    onPress={() => this.getVerificationCode(mobile, type)}
                >
                    <VerticalLine lineStyle={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>获取验证码</Text>
                </TouchableOpacity>
            );
        } else if (seconds === 0) {
            return (
                <TouchableOpacity
                    style={[styles.btnViewStyle, style]}
                    onPress={() => this.getVerificationCode(mobile, type)}
                >
                    <VerticalLine lineStyle={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>重新获取</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={[styles.btnViewStyle, style]}>
                    <VerticalLine lineStyle={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>剩余{seconds}秒</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    btnViewStyle: {
        // width: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleStyle: {
        color: GlobalStyle.themeColor,
        fontSize: 12,
    },
    verLine: {
        height: 15,
        marginRight: 10,
        backgroundColor: GlobalStyle.themeColor,
    },
});