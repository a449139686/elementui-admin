<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-setting"></i> 机器人</el-breadcrumb-item>
            <el-breadcrumb-item><i class="el-icon-setting"></i> 服务</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div class="ms-doc">
        <h3>
          <el-button type="primary" :loading="server.loading" :disabled="server.disabled" @click="startServer">{{server.btnMsg}}</el-button>
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

    <el-dialog title="请尽量用微信小号扫描测试" :visible.sync="server.modal" size="tiny" @close="closeCallback" width="450">
        <div style="text-align: center">
            <img :src="server.qrcodeUrl" width="350px" />
            <p style="color:red;font-size: 18px;">{{server.tipMsg}}</p>
        </div>
        <!-- <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="wechatLogin" :loading="wechat.reload">刷新二维码</el-button>
        </div> -->
    </el-dialog>

</div>
</template>

<script>
export default {
    data: function() {
        return {
            server: {
                modal: false,
                loading: false,
                disabled: false,
                btnMsg: '启动服务',
                tipMsg: '',
                qrcodeUrl: ''
            }
        }
    },
    methods: {
        closeCallback() {
            // var self = this;
            // this.$confirm('您是否已经启动服务器不需要扫描了?', '提示', {
            //     confirmButtonText: '是',
            //     cancelButtonText: '否',
            //     type: 'warning'
            // }).then(() => {
            //     this.$message({
            //         type: 'success',
            //         message: '您已关闭服务扫描二维码，等待冷却后可重新启动!'
            //     });
            //
            // }).catch(() => {
            //     self.server.modal = true;
            // });
        },
        startServer() {
            var self = this;
            var timeOut = 4 * 60;
            var taskId = null;
            websocket.messageCallback = function(res) {
                if (res.code == 'getQrcode') {
                    self.server.modal = true;
                    self.server.qrcodeUrl = res.data.url;
                } else if (res.code == 'loginSuccess') {
                    self.server.modal = false;
                    self.server.loading = false;
                    self.server.disabled = true;
                    self.server.btnMsg = '服务启动成功';
                    clearInterval(taskId);
                    self.$message({
                        type: 'success',
                        message: '服务启动成功，快去测试吧'
                    });
                }
            }
            this.server.loading = true;
            this.server.disabled = true;
            this.server.btnMsg = '正在启动服务...';
            this.wsSend({
                type: 'StartServer'
            })
            taskId = setInterval(function() {
                timeOut--;
                if (timeOut <= 0) {
                    self.server.modal = false;
                    self.server.loading = false;
                    self.server.disabled = false;
                    self.server.btnMsg = '启动服务器';
                    clearInterval(taskId);
                } else {
                    self.server.btnMsg = '正在启动服务...(' + timeOut + '秒)';
                }
            }, 1000);
        }
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
