<template>
<div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="command" label="回复指令">
            <el-input type="text" v-model="form.command" placeholder="请输入指令" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item prop="command" label="回复类型">
            <el-select v-model="form.type" clearable placeholder="请选择" style="width: 250px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="status" label="是否开启" style="margin-top:30px;">
            <el-switch on-text="" off-text="" v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item prop="reply" label="回复内容" style="margin-top:30px;">
            <el-input type="textarea" v-model="form.reply" style="width: 250px;height:70px;"></el-input>
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
                command: '',
                type: '',
                status: true,
                reply: '',
            },
            rules: {
                command: [{
                    required: true,
                    message: '请输入指令名称',
                    trigger: 'blur'
                }],
                reply: [{
                    required: true,
                    message: '请输入回复内容',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请选择类型',
                    trigger: 'blur'
                }],
            },
            formLabelWidth: '80px',
            options: [{
                value: '1',
                label: '文字'
            }, {
                value: '2',
                label: '图片'
            }],
        }
    },
    computed: {

    },
    methods: {
        handleOnSubmit() {
            var self = this;
            self.loading = true;
            2017

            self.postData(ApiUrl.friendCommandAdd, self.form, function(res) {
                if (res.code == 1) {
                    self.loading = false;
                    self.$message({
                        message: '添加成功',
                        type: 'success',
                        onClose: function() {
                            VueEvent.$emit('handleOnCancel');
                        }
                    });

                } else {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            });
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
