<template>
<div class="table">
    <!--面包屑展示-->
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="tableBreadcrumbs in tableBreadcrumb">
                <i :class="tableBreadcrumbs.icon"></i>&nbsp; {{tableBreadcrumbs.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-tabs v-model="activeName">
        <el-tab-pane label="指令列表" name="first">
            <div style="margin-top:10px;">
                <table-friend-command></table-friend-command>
            </div>
        </el-tab-pane>
        <el-tab-pane label="添加指令" name="second">
            <div class="box-card" style="margin-top:20px;width:500px;">
                <set-friend-command></set-friend-command>
            </div>
        </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
import SetFriendCommand from './set.vue';
import TableFriendCommand from './table.vue';
export default {
    components: {
        SetFriendCommand,
        TableFriendCommand
    },
    props: {
        tableBreadcrumb: { //面包屑信息
            type: Array,
            default: function() {
                return [{
                    name: '好友设置',
                    icon: 'el-icon-menu',
                }, {
                    name: '私聊指令',
                    icon: 'el-icon-menu',
                }];
            }
        },
    },
    created() {
        var self = this;
        VueEvent.$on('handleOnCancel', function() {
            self.activeName = 'first';
        });
    },
    data() {
        return {
            activeName: 'first'
        }
    },
    computed: {

    },
    methods: {

    }
}
</script>
