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
        <el-tab-pane label="申请设置列表" name="first">
            <div style="margin-top:10px;">
                <table-friend-request></table-friend-request>
            </div>
        </el-tab-pane>
        <el-tab-pane label="添加设置" name="second">
            <div class="box-card" style="margin-top:20px;width:500px;">
                <set-friend-request></set-friend-request>
            </div>
        </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
import SetFriendRequest from './set.vue';
import TableFriendRequest from './table.vue';
export default {
    components: {
        SetFriendRequest,
        TableFriendRequest
    },
    props: {
        tableBreadcrumb: { //面包屑信息
            type: Array,
            default: function() {
                return [{
                    name: '好友设置',
                    icon: 'el-icon-menu',
                }, {
                    name: '好友申请',
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
