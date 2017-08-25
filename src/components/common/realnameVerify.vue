<template>
<el-dialog title="实名认证" :visible.sync="form.modal" size="tiny" width="300" @close="handleCloseCallback('form')">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="real_name" label="姓名">
            <el-input type="text" v-model="form.real_name" placeholder="请输入真实姓名" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item prop="id_card" label="身份证">
            <el-input type="password" placeholder="请输入身份证号码" v-model="form.id_card" @keyup.enter.native="submitForm('form')" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item prop="password_once" label="身份证正面">
            <el-input type="password" placeholder="请再次输入密码" v-model="form.password_once" @keyup.enter.native="submitForm('form')" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item prop="password_once" label="身份证反面面">
            <el-input type="password" placeholder="请再次输入密码" v-model="form.password_once" @keyup.enter.native="submitForm('form')" style="width: 90%"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="form.modal = false">取 消</el-button>
        <el-button type="primary" @click="submitRegisterForm('form')" :loading="form.loading">确认提交</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.new_password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            form: {
                modal: false,
                loading: false,
                real_name: '',
                id_card: '',
                password_once: '',
            },
            rules: {
                old_password: [{
                    required: true,
                    message: '请输入原密码',
                    trigger: 'blur'
                }],
                new_password: [{
                    required: true,
                    message: '请输入新密码',
                    trigger: 'blur'
                }],
                password_once: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
            },
            formLabelWidth: '80px'
        };
    },
    methods: {
        /** 账号登录 */
        submitRegisterForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    var formData = JSON.parse(JSON.stringify(self.form));
                    formData.old_password = md5(formData.old_password + ApiSignKey);
                    formData.new_password = md5(formData.new_password + ApiSignKey);
                    self.postData(ApiUrl.updatePassword, formData, function(res) {
                        if (res.code == 1) {
                            self.form.modal = false;
                            self.$message({
                                message: res.msg,
                                type: 'success',
                                onClose: function() {

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
        handleCloseCallback(formName) {
            this.$refs[formName].resetFields();
        },
    }
};
</script>
