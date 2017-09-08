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
        <el-tab-pane label="群组列表" name="first">
            <div style="margin-top:10px;">
                <group-table></group-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="指令列表" name="second">
            <div style="margin-top:10px;">
                <command-table></command-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="添加群组" name="three">
            <div class="box-card" style="margin-top:20px;width:500px;">
                <add-group></add-group>
            </div>
        </el-tab-pane>
        <el-tab-pane label="添加指令" name="four">
            <div class="box-card" style="margin-top:20px;width:500px;">
                <add-command></add-command>
            </div>
        </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
import addGroup from './groupset.vue';
import groupTable from './grouptable.vue';
import commandTable from './commandtable.vue';
import addCommand from './commandset.vue';
export default {
    components: {
        addGroup,
        groupTable,
        commandTable,
        addCommand
    },
    props: {
        tableBreadcrumb: { //面包屑信息
            type: Array,
            default: function() {
                return [{
                    name: '群组设置',
                    icon: 'el-icon-menu',
                }, {
                    name: '群组列表',
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
