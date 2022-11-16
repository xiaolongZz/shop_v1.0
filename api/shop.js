// 获取公共配置
function getCommon() {
    return Axios.get("/common");
}
// 获取国家列表
function getCountry(params) {
    return Axios.get(`/country`, params);
}

// 获取图形验证码
function getCaptcha() {
    return Axios.get("/captcha");
}

// 验证图形验证码
function checkCaptcha(params) {
    return Axios.post("/captcha", params);
}
// 注册
function regist(params) {
    return Axios.post("/register", params);
}

// 登录
function logIn(params) {
    return Axios.post("/login", params);
}

// 忘记密码
function forgetPass(params) {
    return Axios.post("/account/password_reset", params);
}

// 发送短信验证码
function phoneCode(params) {
    return Axios.post("/phone/code", params);
}

// 获取邮箱验证码
function emailCode(params) {
    return Axios.post("/email/code", params);
}

// 首页
function marketIndex(params) {
    return Axios.get(`/app_market/market/index`, { params })
}
// 应用详情
function appDetails(params) {
    return Axios.get(`/app_market/market/app/${params.id}`, { params })
}
// 获取开发者详情
function developer(params) {
    return Axios.get(`/app_market/market/developer/${params.id}`)
}
// 应用评论
function appEvaluation(params) {
    return Axios.get(`/app_market/app/${params.id}/evaluation`)
}
// 应用列表
function appList(params) {
    return Axios.get(`/app_market/market/app`, { params })
}

// 投诉列表
function complaint(params) {
    return Axios.get(`/app_market/market/complaint`, { params })
}

// 订单列表
function order(params) {
    return Axios.get(`/app_market/market/order`, { params })
}

// 我的应用 列表
function clientAppList(params) {
    return Axios.get(`/app_market/market/my_app`, { params })
}

// 我的服务 列表
function clientServiceLiist(params) {
    return Axios.get(`/app_market/market/my_service`, { params })
}

// 用户授权列表
function authorize(params) {
    return Axios.get(`/app_market/market/authorize`, { params })
}

// 投诉订单
function complaintOrder(params) {
    return Axios.post(`/app_market/market/order/${params.id}/complaint`, params)
}
// 投诉详情
function complaintOrderDetail(params) {
    return Axios.get(`/app_market/market/complaint/${params.id}`, { params })
}
// 取消投诉
function delComplaint(params) {
    return Axios.delete(`/app_market/market/complaint/${params.id}`, params)
}
// 回复投诉
function replyComplaint(params){
    return Axios.post(`/app_market/market/complaint/${params.id}/reply`, params)
}


