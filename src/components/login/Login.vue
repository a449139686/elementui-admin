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
                <div style="float: left;margin-top: 10px;" @click="showRegister">
                    <a href="javascript:" style="font-size:13px;line-height:30px;color:#999;">注册账号？</a>
                </div>
                <div style="float: right;margin-top: 10px;" @click="showWechatLogin">
                    <a href="javascript:" style="font-size:13px;line-height:30px;color:#58B7FF;">微信登录</a>
                </div>
            </el-form>
        </div>
        <v-register ref="registerAdmin"></v-register>
        <v-wechat-login ref="wechatLogin"></v-wechat-login>
    </div>
</template>

<script>
    import VRegister from './Register.vue';
    import VWechatLogin from './WechatLogin.vue';
    export default {
        components: {
            VRegister, VWechatLogin
        },
        data: function () {
            return {
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
            showRegister(){
                this.$refs.registerAdmin.registerForm.modal = true;
            },
            showWechatLogin(){
                this.$refs.wechatLogin.wechatLogin();
            },
            /** 账号登录 */
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var formData = JSON.parse(JSON.stringify(self.ruleForm));
                        formData.password = md5(formData.password + ApiSignKey);
                        self.postData('/adminApi/adminBase/login', formData, function (res) {
                            console.log(res);
                            if (res.code == 1) {
                                localStorage.setItem('token', res.data.token);
                                self.$message({
                                    message: '登录成功，即将跳转页面...',
                                    type: 'success',
                                    onClose: function () {
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
