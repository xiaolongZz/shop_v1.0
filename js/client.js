(function (window, undefined) {
    var old_onload = window.onload
    window.onload = function () {
        const template = document.getElementById('content')
        Vue.prototype.lang = window.lang
        Vue.prototype.moment = window.moment
        new Vue({
            components: {
                topMenu,
                asideMenu,
                pagination,
            },
            created() {
                this.getCommontData()
                this.getData1()
                this.getAuthorize()
            },
            data() {
                return {
                    commontData: {},
                    activeName: "1",
                    // 用户授权列表
                    authorizeData: [],
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
                    status: {
                        Unpaid: "待支付",
                        Paid: "已支付待确认收货",
                        Wait: "等待服务",
                        Inservice: "服务中",
                        Refunding: "退款中",
                        Refunded: "已退款",
                        Finish: "已完成",
                        Cancelled: "已取消"
                    },
                    // 我的应用开始
                    params1: {
                        page: 1,
                        limit: 20,
                        pageSizes: [20, 50, 100],
                        total: 200,
                        orderby: 'id',
                        sort: 'desc',
                        keywords: '',
                        type: "",
                        host_id: "",
                    },
                    loading1: false,
                    dataList1: [],
                    loading1: false,
                    // 我的应用结束

                    // 我的服务开始
                    params2: {
                        page: 1,
                        limit: 20,
                        pageSizes: [20, 50, 100],
                        total: 200,
                        orderby: 'id',
                        sort: 'desc',
                        keywords: '',
                        used: "",
                        host_id: "",
                    },
                    loading2: false,
                    dataList2: [],
                    loading2: false,
                    // 我的服务结束

                    // 我的订单开始
                    params3: {
                        page: 1,
                        limit: 20,
                        pageSizes: [20, 50, 100],
                        total: 200,
                        orderby: 'id',
                        sort: 'desc',
                        keywords: '',
                        type: "",
                        status: ""
                    },
                    loading3: false,
                    dataList3: [],
                    loading3: false,
                    payType: {
                        onetime: "一次性",
                        monthly: "月付",
                        quarterly: "季付",
                        semiannually: "半年付",
                        annually: "年付",
                        free: "免费"
                    },
                    // 我的订单结束

                    // 投诉举报开始
                    params4: {
                        page: 1,
                        limit: 20,
                        pageSizes: [20, 50, 100],
                        total: 200,
                        orderby: 'id',
                        sort: 'desc',
                        keywords: '',
                        status: ""
                    },
                    loading4: false,
                    dataList4: [],
                    loading4: false,
                    complaintsVisible: false,
                    complaintsForm: {
                        id: "",
                        content: "",
                        attachment: []
                    },
                    complaintsRules: {
                        id: [
                            { required: true, message: '请选择订单', trigger: 'blur' },
                        ],
                        content: [
                            { required: true, message: '请输入投诉内容', trigger: 'blur' },
                        ]
                    },
                    complaintsLoading: false,
                    imgVisible: false,
                    dialogImageUrl: "",
                    fileList: [],
                    orderSelectList: [],
                    // 投诉详情数据
                    complaintDetailData: {},
                    complaintDetailForm: {
                        id: null,
                    },
                    // 是否查看投诉 true:查看投诉 false:投诉订单
                    isComplaintView: false,
                    // 撤回二次确认弹窗
                    retractVisible: false,
                    // 投诉id
                    retractId: null,
                    retractLoading: false,
                    // 投诉举报结束
                }
            },
            filters: {
                formateTime(time) {
                    if (time && time !== 0) {
                        var date = new Date(time * 1000);
                        Y = date.getFullYear() + '/';
                        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
                        D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
                        return (Y + M + D);
                    } else {
                        return "--";
                    }
                },
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
                handleClick() {
                    const index = this.activeName
                    if (index == 1) {
                        this.getData1()
                    }
                    if (index == 2) {
                        this.getData2()
                    }
                    if (index == 3) {
                        this.getData3()
                    }
                    if (index == 4) {
                        this.getData4()
                    }

                },
                // 获取授权列表
                getAuthorize() {
                    authorize().then(res => {
                        if (res.data.status == 200) {
                            this.authorizeData = res.data.data.list
                        }
                    })
                },
                // 我的应用开始
                sizeChange1(e) {
                    this.params1.limit = e
                    this.params1.page = 1
                    // 获取列表
                    this.getData1()
                },
                // 当前页改变
                currentChange1(e) {
                    this.params1.page = e
                    this.getData1()
                },
                search1() {
                    this.params1.page = 1
                    // 获取列表
                    this.getData1()
                },
                getData1() {
                    this.loading1 = true
                    const params = {
                        ...this.params1
                    }
                    clientAppList(params).then(res => {
                        if (res.data.status == 200) {
                            this.dataList1 = res.data.data.list
                            this.params1.total = res.data.data.count
                        }
                        this.loading1 = false
                    }).catch(error => {
                        this.loading1 = false
                    })
                },
                // 我的应用结束
                // 我的服务开始
                sizeChange2(e) {
                    this.params2.limit = e
                    this.params2.page = 1
                    // 获取列表
                    this.getData2()
                },
                // 当前页改变
                currentChange2(e) {
                    this.params2.page = e
                    this.getData2()
                },
                search2() {
                    this.params2.page = 1
                    // 获取列表
                    this.getData2()
                },
                getData2() {
                    this.loading2 = true
                    const params = {
                        ...this.params2
                    }
                    clientServiceLiist(params).then(res => {
                        if (res.data.status == 200) {
                            this.dataList2 = res.data.data.list
                            this.params2.total = res.data.data.count
                        }
                        this.loading2 = false
                    }).catch(error => {
                        this.loading2 = false
                    })
                },
                // 我的服务结束
                // 我的订单开始
                sizeChange3(e) {
                    this.params3.limit = e
                    this.params3.page = 1
                    // 获取列表
                    this.getData3()
                },
                // 当前页改变
                currentChange3(e) {
                    this.params3.page = e
                    this.getData3()
                },
                search3() {
                    this.params3.page = 1
                    // 获取列表
                    this.getData3()
                },
                getData3() {
                    this.loading3 = true
                    const params = {
                        ...this.params3
                    }
                    order(params).then(res => {
                        if (res.data.status == 200) {
                            this.dataList3 = res.data.data.list
                            this.params3.total = res.data.data.count
                        }
                        this.loading3 = false
                    }).catch((error) => {
                        this.loading3 = false
                    })
                },
                // 我的订单结束
                // 投诉举报开始
                sizeChange4(e) {
                    this.params4.limit = e
                    this.params4.page = 1
                    // 获取列表
                    this.getData4()
                },
                // 当前页改变
                currentChange4(e) {
                    this.params4.page = e
                    this.getData4()
                },
                search4() {
                    this.params4.page = 1
                    // 获取列表
                    this.getData4()
                },
                getData4() {
                    this.loading4 = true
                    const params = {
                        ...this.params4
                    }
                    complaint(params).then(res => {
                        if (res.data.status == 200) {
                            this.dataList4 = res.data.data.list
                            this.params4.total = res.data.data.count
                        }
                        this.loading4 = false
                    }).catch((error) => {
                        this.loading4 = false
                    })
                },
                // 显示投诉弹窗
                showComplaints() {
                    this.isComplaintView = false
                    // 获取订单列表
                    const params = {
                        page: 1,
                        limit: 10000,
                        orderby: "id",
                        sort: "desc"
                    }
                    order(params).then(res => {
                        if (res.data.status == 200) {
                            this.orderSelectList = res.data.data.list
                        }
                    })
                    this.complaintsVisible = true
                },
                // 查看投诉点击
                showComplaintDetail(id) {
                    this.retractId = id
                    this.isComplaintView = true
                    // 显示投诉详情弹窗
                    const params = {
                        id
                    }
                    complaintOrderDetail(params).then(res => {
                        if (res.data.status == 200) {
                            this.complaintDetailData = res.data.data.list
                        }
                    })
                    this.complaintsVisible = true
                },
                // 关闭投诉弹窗
                closeComplaints() {
                    this.complaintsVisible = false
                    let uploadFiles = this.$refs['fileupload'].uploadFiles
                    let length = uploadFiles.length
                    uploadFiles.splice(0, length)
                    this.$refs['complaintsform'].resetFields();

                },
                // 投诉提交
                subComplaints() {
                    if (this.isComplaintView) {
                        this.$refs['complaintsform'].validate((valid) => {
                            if (valid) {
                                this.complaintsLoading = true
                                const params = {
                                    ...this.complaintsForm,
                                    id: this.retractId
                                }
                                replyComplaint(params).then(res => {
                                    if (res.data.status == 200) {
                                        this.$message.success(res.data.msg)
                                        this.complaintsVisible = false
                                        this.getData4()
                                    }
                                    this.complaintsLoading = false
                                }).catch(error => {
                                    this.complaintsLoading = false
                                    this.$message.error(error.data.msg)
                                })
                            } else {
                                return false
                            }
                        })
                    } else {
                        this.$refs['complaintsform'].validate((valid) => {
                            if (valid) {
                                this.complaintsLoading = true
                                const params = { ...this.complaintsForm }
                                complaintOrder(params).then(res => {
                                    if (res.data.status == 200) {
                                        this.$message.success(res.data.msg)
                                        this.complaintsVisible = false
                                        this.getData4()
                                    }
                                    this.complaintsLoading = false
                                }).catch(error => {
                                    this.complaintsLoading = false
                                    this.$message.error(error.data.msg)
                                })
                            } else {
                                return false;
                            }
                        });
                    }

                },
                // 上传图片点击预览
                handlePictureCardPreview(file) {
                    this.dialogImageUrl = file.url;
                    this.imgVisible = true;
                },
                // 附件上传前
                beforeUpload(file) {
                    // const isJPG = file.type === 'image/jpeg';
                    const isLt5M = file.size / 1024 / 1024 < 5;

                    // if (!isJPG) {
                    //     this.$message.error('上传头像图片只能是 JPG 格式!');
                    // }
                    if (!isLt5M) {
                        this.$message.error('上传头像图片大小不能超过 5MB!');
                    }
                    return isLt5M;
                    // return isJPG && isLt5M;
                },
                beforeRemove(file, fileList) {
                    // 获取到删除的 save_name
                    let save_name = file.response.data.save_name
                    this.complaintsForm.attachment = this.replyData.attachment.filter(item => {
                        return item != save_name
                    })
                },
                handleSuccess(response, file, fileList) {
                    // console.log(response);
                    if (response.status != 200) {
                        this.$message.error(response.msg)
                        // 清空上传框
                        let uploadFiles = this.$refs['fileupload'].uploadFiles
                        let length = uploadFiles.length
                        uploadFiles.splice(length - 1, length)
                    } else {
                        this.complaintsForm.attachment.push('http://kfc.idcsmart.com/upload/common/default/' + response.data.save_name)
                    }
                },
                // 撤销点击
                retract(id) {
                    // 确认撤销弹窗
                    this.retractId = id
                    this.retractVisible = true
                },
                // 撤回确认
                retractSub() {
                    this.retractLoading = true
                    const params = {
                        id: this.retractId
                    }
                    delComplaint(params).then(res => {
                        if (res.data.status == 200) {
                            this.$message.success(res.data.msg)
                            this.retractVisible = false
                            this.getData4()
                        }
                        this.retractLoading = false
                    }).catch(error => {
                        this.retractLoading = false
                        this.$message.error(error.data.msg)
                    })
                }
                // 投诉举报结束
            },

        }).$mount(template)

        const mainLoading = document.getElementById('mainLoading')
        setTimeout(() => {
            mainLoading && (mainLoading.style.display = 'none')
        }, 200)
        typeof old_onload == 'function' && old_onload()
    };
})(window);
