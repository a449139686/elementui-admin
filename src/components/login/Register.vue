<template>
    <el-dialog title="注册账号" :visible.sync="registerForm.modal" size="tiny" width="350"
               @close="handleCloseCallback('registerForm')">
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px"
                 class="demo-ruleForm">
            <el-form-item prop="username" label="账号">
                <el-input v-model="registerForm.username" placeholder="请输入注册账号" style="width: 88%"></el-input>
            </el-form-item>
            <el-form-item prop="nickname" label="昵称">
                <el-input v-model="registerForm.nickname" placeholder="请输入昵称" style="width: 88%"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input type="password" placeholder="请输入密码" v-model="registerForm.password"
                          @keyup.enter.native="submitRegisterForm('registerForm')" style="width: 88%"></el-input>
            </el-form-item>
            <el-form-item prop="passwordOnce" label="密码">
                <el-input type="password" placeholder="请再次输入密码" v-model="registerForm.passwordOnce"
                          @keyup.enter.native="submitRegisterForm('registerForm')" style="width: 88%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="registerForm.modal = false">取 消</el-button>
            <el-button type="primary" @click="submitRegisterForm('registerForm')" :loading="registerForm.loading">确认提交
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data: function () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    modal: false,
                    loading: false,
                    openid: '',
                    username: '',
                    password: '',
                    passwordOnce: '',
                    nickname: '',
                    icon: '',
                },
                registerRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ],
                    passwordOnce: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            /** 账号登录 */
            submitRegisterForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var formData = JSON.parse(JSON.stringify(self.registerForm));
                        formData.password = md5(formData.password + ApiSignKey);
                        self.postData('/adminApi/admin_base/register', formData, function (res) {
                            if (res.code == 1) {
                                self.registerForm.modal = false;
                                localStorage.setItem('token', res.data.token);
                                self.$message({
                                    message: '注册成功，即将跳转页面...',
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
            },
            handleCloseCallback(formName){
                this.$refs[formName].resetFields();
            },

        }
    }
</script>
