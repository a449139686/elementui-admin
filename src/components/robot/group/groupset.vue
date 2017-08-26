<template>
<div>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item prop="group_name" label="群组名称">
            <el-input type="text" v-model="form.group_name" placeholder="一个标点符号都不能错" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item prop="is_like" label="模糊查询">
            <el-switch on-text="" off-text="" v-model="form.is_like"></el-switch>
        </el-form-item>
        <el-form-item prop="is_search" label="搜人">
            <el-switch on-text="" off-text="" v-model="form.is_search"></el-switch>
        </el-form-item>
        <el-form-item prop="is_kick" label="踢人">
            <el-switch on-text="" off-text="" v-model="form.is_kick"></el-switch>
        </el-form-item>
        <el-form-item prop="is_welcome_msg" label="欢迎语">
            <el-switch on-text="" off-text="" v-model="form.is_welcome_msg"></el-switch>
        </el-form-item>
        <el-form-item prop="welcome_msg" label="欢迎语" v-if="form.is_welcome_msg">
            <el-input type="text" v-model="form.welcome_msg" placeholder="欢迎语，{user}为替换用户昵称" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item prop="is_auto_add" label="自动邀请">
            <el-switch on-text="" off-text="" v-model="form.is_auto_add"></el-switch>
        </el-form-item>
        <el-form-item prop="auth_key" label="认证备注" style="margin-top:30px;" v-if="form.is_auto_add">
            <el-input type="text" v-model="form.auth_key" placeholder="请输入认证备注" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item prop="new_friend_msg" label="好友推送" style="margin-top:30px;" v-if="form.is_auto_add">
            <el-input type="text" v-model="form.new_friend_msg" placeholder="请输入新好友推送语" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="是否开启" style="margin-top:30px;">
            <el-switch on-text="" off-text="" v-model="form.status"></el-switch>
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
                status: true,
                is_like: true,
                is_search: true,
                is_kick: true,
                is_welcome_msg: false,
                is_auto_add: false,
                welcome_msg: '',
                auth_key: '',
                new_friend_msg: '',
                group_name: '',
            },
            rules: {
                auth_key: [{
                    required: true,
                    message: '请输入认证备注',
                    trigger: 'blur'
                }],
                welcome_msg: [{
                    required: true,
                    message: '请输入欢迎语',
                    trigger: 'blur'
                }],
                group_name: [{
                    required: true,
                    message: '请输入群组名称',
                    trigger: 'blur'
                }],
            }
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
