<template>
    <div>
        <el-dialog title="修改密码" :visible.sync="modal" size="tiny">
            <el-form :model="form">
                <el-form-item label="原始密码" :label-width="formLabelWidth">
                    <el-input v-model="form.old_password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="form.new_password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" :label-width="formLabelWidth">
                    <el-input v-model="form.password_once" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modal = false">取 消</el-button>
                <el-button type="primary" @click="modal = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modal: false,
                form: {
                    id: '',
                    old_password: '',
                    new_password: '',
                    password_once: '',
                },
                formLabelWidth: '80px'
            };
        },
        methods: {

        }
    };
</script>
