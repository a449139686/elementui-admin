<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-setting"></i> 自述</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="ms-doc">
        <h3>
              <span style="margin-left:20px;">启动须知</span>
            </h3>
        <article>
            <h1>机器人操作须知</h1>
            <p>1、请使用测试小号扫描登录，如使用常用号出问题概不负责。</p>
            <p>2、好友申请自动通过：备注的时候输入：1或者2或者3，只需要选其中一个数字就可以自动申请通过</p>
            <p>3、加好友自动拉群：加好友的时候输入：测试Robot，即可直接通过申请同时自动发起进群邀请</p>
            <p>4、在群里面通过@我去 唤起机器人操作，比如@周先生 搜人 周,或者@周先生 踢人 周</p>
            <p>5、在群里面通过@我 输入测试1 或者测试2都可以唤起自动回复命令</p>
            <p>6、新人进群是机器人会自动欢迎新人</p>
            <p>7、在与机器人私聊的时候输入 测试1 或者 测试2 都可以自动回复</p>
            <p>8、首先必须要你新建2个群，一个叫测试Robot 一个叫Robot </p>
            <p>9、目前所有的操作命令，都是可以通过后台配置，因为时间紧张只写了一个测试的demo，等后期还会继续完善</p>
            <p>10、本项目是依赖于vbot开发的 <a href="http://create.hanc.cc/vbot/docs/message.html">传送门</a></p>
        </article>
    </div>

</div>
</template>

<script>
export default {
    data: function() {
        return {}
    }
}
</script>

<style scoped>
.ms-doc {
    width: 100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
}

.ms-doc h3 {
    padding: 9px 10px 10px;
    margin: 0;
    font-size: 14px;
    line-height: 17px;
    background-color: #f5f5f5;
    border: 1px solid #d8d8d8;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
}

.ms-doc article {
    padding: 45px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
}

.ms-doc article h1 {
    font-size: 32px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
}

.ms-doc article h2 {
    margin: 24px 0 16px;
    font-weight: 600;
    line-height: 1.25;
    padding-bottom: 7px;
    font-size: 24px;
    border-bottom: 1px solid #eee;
}

.ms-doc article p {
    margin-bottom: 15px;
    line-height: 1.5;
}

.ms-doc article .el-checkbox {
    margin-bottom: 5px;
}
</style>
