/**
 * 云技师 - API
 * https://menger.me
 * UpdateTime: 2017/12/25 14:55
 * @大梦
 */


const Api = {
    // 主域名
    base: 'http://yuntu.3todo.com/api/',

    // 首页
    index: '',
    // 验证码
    verificationCode: 'Alisms/send_sms',
    // 图片上传
    upload: 'upload/qiniuBaseUpload',

    // 登录
    login: 'login/login',
    // 注册
    register: 'login/register',
    // 忘记密码
    retrievePassword: 'login/rewardPassword',

    // 获取首页Banner
    getBannerList: 'banner/getBannerList',
    // 首页培训精选
    getTrainChoose: 'article/getTrainChoose',
    // 首页产品精选
    getProductChoose: 'article/getProductChoose',

    // 获取文章列表
    getArticleList: 'article/getArticleList',
    // 文章收藏
    collectArticle: 'member/collectArticle',
    // 获取个人信息
    getMemberInfo: 'member/getMemberInfo',
    // 修改个人信息
    updateMemberInfo: 'member/updateMemberInfo',
    // 获取个人银行卡列表
    getMemberBank: 'member/getMemberBank',
    // 增加银行卡
    addMemberBank: 'member/addMemberBank',
    // 解除银行卡绑定
    deletMemberBank: 'member/deletMemberBank',
    // 用户退出
    logout: 'member/logout',
    // 获取用户收入列表
    getMyIncomeList: 'member/getMyIncomeList',
    // 获取提现申请列表
    getMyWithdrawList: 'member/getMyWithdrawList',
    // 提交提现申请
    addWithdraw: 'member/addWithdraw',
    // 获取个人收藏列表
    getMyCollection: 'member/getMyCollection',
    // 获取技能分类
    getAllSkill: 'member/getAllSkill',
    // 提交技能认证
    addMyskill: 'member/addMyskill',
    // 获取个人技能申请情况
    getMySkill: 'member/getMySkill',
    // 获取订单列表
    getOrderList: 'order/getOrderList',
    // 修改订单状态
    changeOrderStatus: 'order/changeOrderStatus',
    // 获取最近的收入列表
    getMyRecentIncome: 'member/getMyRecentIncome',
    // 获取最近的提现列表
    getMyRecentWithdraw: 'member/getMyRecentWithdraw',
    // 获取订单详情
    getOrderInfo: 'order/getOrderInfo',
    // 添加订单质保
    addZhibao: 'order/addZhibao',
    // 获取工作台数据
    getOrderNumber: 'order/getOrderNumber',
    // 获取系统消息列表
    getMessageList: 'message/getMessageList',
    // 获取首页走进我们
    getUsChoose: 'article/getUsChoose',
    // 个人工作时间
    getMyworkTime: 'member/getMyworkTime',
    // 个人工作时间更新
    updateMyWorkeTime: 'member/updateMyWorkeTime',
    // 添加施工图片
    addServerAlbum: 'order/addServerAlbum',
    // 修改密码
    changePassword: 'member/changePassword',

};

export default Api;