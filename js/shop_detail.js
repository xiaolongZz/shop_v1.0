(function (window, undefined) {
    var old_onload = window.onload
    window.onload = function () {
        const template = document.getElementById('content')
        Vue.prototype.lang = window.lang
        Vue.prototype.moment = window.moment
        new Vue({
            components: {
                topMenu,
                asideMenu
            },
            created() {
                let url = window.location.href
                let getqyinfo = url.split('?')[1]
                let getqys = new URLSearchParams('?' + getqyinfo)
                this.id = getqys.get('id')
                this.clientId = getqys.get('clientId')

                this.getCommontData()
                this.getDetail()
                this.getDeveloper()
                this.getAppEvaluation()

            },
            data() {
                return {
                    commontData: {},
                    id: null,
                    clientId: null,
                    loading: false,
                    appData: {
                        developer: {},
                        images: []
                    },
                    developerData: {},
                    type: {
                        addon: "插件",
                        captcha: "验证码接口",
                        certification: "实名接口",
                        gateway: "支付接口",
                        mail: "邮件接口",
                        sms: "短信接口",
                        server: "模块",
                        template: "主题",
                        service: "服务"
                    },
                    activeName: "1",
                    // 商品评论开始
                    evaluationLoading: false,
                }
            },
            filters: {
                formateTime(time) {
                    if (time && time !== 0) {
                        var date = new Date(time * 1000);
                        Y = date.getFullYear() + '/';
                        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
                        D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                        return (Y + M + D);
                    } else {
                        return "--"
                    }
                }
            },
            methods: {
                getCommontData() {
                    if (localStorage.getItem('common_set_before')) {
                        this.commontData = JSON.parse(localStorage.getItem('common_set_before'))
                    } else {
                        getCommon().then(res => {
                            if (res.data.status == 200) {
                                this.commontData = res.data.data
                                localStorage.setItem('common_set_before', JSON.stringify(res.data.data))
                            }
                        })
                    }
                },
                getDetail() {
                    this.loading = true
                    const params = {
                        id: this.id
                    }
                    appDetails(params).then(res => {
                        this.loading = false
                        if (res.data.status == 200) {
                            this.appData = res.data.data.app
                        }
                    }).catch(error => {
                        this.loading = false
                    })
                },
                getDeveloper() {
                    if (this.clientId) {
                        const params = {
                            id: this.clientId
                        }
                        developer(params).then(res => {
                            if (res.data.status == 200) {
                                this.developerData = res.data.data.developer
                            }
                        })
                    }

                },
                goBack() {
                    history.back()
                },
                handleClick() {
                    const n = this.activeName
                    if (n == 1) { }
                    if (n == 2) {

                    }
                    if (n == 3) { }
                },
                // 商品评论开始
                getAppEvaluation() {
                    this.evaluationLoading = true
                    const params = {
                        id: this.id
                    }
                    appEvaluation(params).then(res => {
                        this.evaluationLoading = false
                        if (res.data.status == 200) {
                            this.evaluationData = res.data.data.list
                        }
                    }).catch(error => {
                        this.evaluationLoading = false
                    })
                }
            }

        }).$mount(template)

        const mainLoading = document.getElementById('mainLoading')
        setTimeout(() => {
            mainLoading && (mainLoading.style.display = 'none')
        }, 200)
        typeof old_onload == 'function' && old_onload()
    };
})(window);
