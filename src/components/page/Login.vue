<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <div style="margin-top: 10px;"></div>
                <div style="float: left;margin-top: 10px;" @click="registerForm.modal = true">
                    <a href="javascript:" style="font-size:13px;line-height:30px;color:#999;">注册账号？</a>
                </div>
                <div style="float: right;margin-top: 10px;" @click="wechatLogin">
                    <a href="javascript:" style="font-size:13px;line-height:30px;color:#58B7FF;">微信登录</a>
                </div>
            </el-form>
        </div>
        <el-dialog title="请使用微信扫描二维码登录" :visible.sync="wechat.modal" size="tiny" @close="wechatDialogCallback"
                   width="350">
            <div style="text-align: center">
                <embed width="320" height="320" :src="wechat.qrcode" type="image/svg+xml"/>
                <p style="color:red;font-size: 18px;">{{wechat.authMsg}}</p></div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="wechatLogin" :loading="wechat.reload">刷新二维码</el-button>
            </div>
        </el-dialog>
        <el-dialog title="注册账号" :visible.sync="registerForm.modal" size="tiny" @close="wechatDialogCallback"
                   width="350">
            <el-form :model="registerForm" :rules="registerRules" ref="ruleForm" label-width="0px"
                     class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="registerRules.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="registerRules.password"
                              @keyup.enter.native="submitForm('registerRules')"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="registerForm.modal = false">取 消</el-button>
                <el-button type="primary" @click="wechatLogin" :loading="registerForm.loading">确认提交</el-button>
            </div>
        </el-dialog>
    </div>
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
                registerForm: {
                    modal: false,
                    loading: false,
                    openid: '',
                    username: '',
                    password: '',
                    passwordOnce: '',
                    nickname: '',
                },
                registerRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            registerAdmin(){
                this.$message('暂未开通注册服务');
            },
            /** 微信扫码登录、获取二维码、以及服务端返回状态 */
            wechatLogin(){
                this.wechat.reload = true;
                this.wechatDialogCallback();
                this.wechat.authKey = parseInt(Math.random() * (999999 - 100000 + 1) + 100000);
                this.wechat.qrcode = 'https://wechat.zhoujianjun.cn/getQrcode?authKey=' + this.wechat.authKey;
                this.wechat.modal = true;
                let self = this;
                var getAuthStatus = function () {
                    self.postData('/getAuth', {authKey: self.wechat.authKey}, function (res) {
                        if (res.code == 1) {
                            self.wechatDialogCallback();
                            localStorage.setItem('token', res.data.token);
                            self.$router.push('/readme');
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
            /** 账号登录 */
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.postData('/', self.ruleForm, function (res) {
                            if (res.code == 1) {
                                localStorage.setItem('token', res.data.token);
                                self.$router.push('/readme');
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 180px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
