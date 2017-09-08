<template>
<div>
    <el-dialog title="实名认证" :visible.sync="form.modal" size="tiny" width="400" @close="handleCloseCallback('form')">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="real_name" label="姓名">
                <el-input type="text" v-model="form.real_name" placeholder="请输入真实姓名" style="width: 85%"></el-input>
            </el-form-item>
            <el-form-item prop="id_card" label="身份证" style="margin-top:30px;">
                <el-input type="text" placeholder="请输入身份证号码" v-model="form.id_card" @keyup.enter.native="submitForm('form')" style="width: 85%"></el-input>
            </el-form-item>
            <el-form-item prop="password_once" label="身份证正反面" style="margin-top:30px;">
                <el-upload class="upload-demo" style="width:85%;" action="https://admin.fastgoo.net/public/upload/file" :on-preview="handleImagesPreview" :on-success="handleImagesSuccess" :on-remove="handleImagesRemove" :file-list="imagesList" list-type="picture">
                    <el-button size="normal" style="width:100px;" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="form.modal = false">取 消</el-button>
            <el-button type="primary" @click="submitRegisterForm('form')" :loading="form.loading">确认提交</el-button>
        </div>
    </el-dialog>
    <el-dialog title="查看图片" :visible.sync="imageModal" size="tiny" width="600">
        <img :src="imageUrl" width="465">
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            imageModal: false,
            imageUrl: '',
            imagesList2: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }],
            imagesList: [],
            form: {
                modal: false,
                loading: false,
                real_name: '',
                id_card: '',
                password_once: '',
            },
            rules: {
                real_name: [{
                    required: true,
                    message: '请输入真实姓名',
                    trigger: 'blur'
                }],
                id_card: [{
                    required: true,
                    message: '请输入身份证号码',
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

        handleImagesSuccess(res, file) {
            console.log(res, file);
        },

        handleImagesRemove(file, fileList) {
            console.log(file, fileList);
        },

        handleImagesPreview(file) {
            console.log(file);
            this.imageModal = true;
            this.imageUrl = file.response.data.url;
        }
    }
};
</script>
