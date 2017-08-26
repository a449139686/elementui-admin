<template>
<div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="status" label="是否开启" style="margin-top:30px;">
            <el-switch on-text="" off-text="" v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item prop="auth_key" label="认证备注">
            <el-input type="text" v-model="form.auth_key" placeholder="请输入好友设置直接审核备注信息" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item prop="welcome_msg" label="欢迎信息" style="margin-top:30px;">
            <el-input type="textarea" v-model="form.welcome_msg" style="width: 300px;height:70px;"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleOnSubmit" style="width:100px;">立即创建</el-button>
            <el-button @click="handleOnCancel">取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    components: {

    },
    created() {
        console.log(this.data.length);
        VueEvent.$on('searchTable', function(searchData) {
            console.log(searchData);
        });
        VueEvent.$on('tableOperateEdit', function(operateData) {
            console.log(operateData);
        });
        VueEvent.$on('tableOperateDelete', function(operateData) {
            console.log(operateData);
        });

        this.getData();
    },
    data() {
        return {
            form: {
                modal: false,
                loading: false,
                auth_key: '',
                status: true,
                welcome_msg: '',
            },
            rules: {
                auth_key: [{
                    required: true,
                    message: '请输入认证备注',
                    trigger: 'blur'
                }],
            },
            formLabelWidth: '80px'
        }
    },
    computed: {

    },
    methods: {
        handleOnSubmit() {

        },
        handleOnCancel() {
            VueEvent.$emit('handleOnCancel');
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 30px;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
}
</style>
