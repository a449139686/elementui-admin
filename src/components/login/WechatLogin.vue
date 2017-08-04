<template>
    <el-dialog title="请使用微信扫描二维码登录" :visible.sync="wechat.modal" size="tiny" @close="wechatDialogCallback"
               width="350">
        <div style="text-align: center">
            <embed width="320" height="320" :src="wechat.qrcode" type="image/svg+xml"/>
            <p style="color:red;font-size: 18px;">{{wechat.authMsg}}</p></div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="wechatLogin" :loading="wechat.reload">刷新二维码</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data: function () {
            return {
                wechat: {
                    modal: false,
                    qrcode: '',
                    authKey: '',
                    authMsg: '',
                    taskId: [],
                    reload: false,
                },
            }
        },
        methods: {
            /** 微信扫码登录、获取二维码、以及服务端返回状态 */
            wechatLogin(){
                this.wechat.reload = true;
                this.wechatDialogCallback();
                this.wechat.authKey = parseInt(Math.random() * (999999 - 100000 + 1) + 100000);
                this.wechat.qrcode = 'https://wechat.zhoujianjun.cn/getQrcode?authKey=' + this.wechat.authKey;
                this.wechat.modal = true;
                let self = this;
                var getAuthStatus = function () {
                    self.postData('https://wechat.zhoujianjun.cn/getAuth', {authKey: self.wechat.authKey}, function (res) {
                        if (res.code == 1) {
                            self.wechatDialogCallback();
                            self.postData('/adminApi/adminBase/authLogin', {wechatToken:res.data.token}, function (res) {
                                if (res.code == 1) {
                                    self.wechat.modal = false;
                                    localStorage.setItem('token', res.data.token);
                                    self.$message({
                                        message:'扫码登录成功，即将跳转页面...',
                                        type:'success',
                                        onClose:function () {
                                            self.$router.push('/readme');
                                        }
                                    });
                                } else {
                                    self.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            });
                        }
                        if (res.code == -5) {
                            self.wechatDialogCallback();
                            self.wechat.authMsg = res.msg;
                        }
                    });
                };
                setTimeout(function () {
                    self.wechat.taskId.push(window.setInterval(getAuthStatus, 3000));
                }, 10000);
                setTimeout(function () {
                    self.wechat.reload = false;
                }, 3000);
            },
            /** 销毁定时任务 */
            wechatDialogCallback(){
                for (var key in this.wechat.taskId) {
                    clearInterval(this.wechat.taskId[key]);
                }
            },
        }
    }
</script>
