<template>
<div class="header">
    <div class="logo"><img width="310" style="z-index: 1;" src="../../../static/img/logo.png"> </div>
    <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                    <img class="user-logo" :src="!adminInfo.head_img?'../../../static/img/head_img.jpg':adminInfo.head_img">
                    {{adminInfo.nickname}}
                </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="editInfo" style="margin-top: 5px;">修改密码</el-dropdown-item>
                <el-dropdown-item command="loginout" style="margin-top: 5px;">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    <set-password ref="setPassword"></set-password>
</div>
</template>
<script>
import SetPassword from './SetPassword.vue';
export default {
    components: {
        SetPassword
    },
    created() {

    },

    data() {
        return {
            name: 'linxin',
            adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : {},
        }
    },
    computed: {

    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case 'loginout':
                    this.loginOut();
                    break;
                case 'editInfo':
                    this.$refs.setPassword.form.modal = true;
            }
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
}

.header .logo {
    float: left;
    width: 250px;
    margin-left: 50px;
    text-align: center;
}

.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
