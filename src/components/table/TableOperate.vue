<template>
    <div style="text-align: center">
        <el-tooltip content="编辑" placement="top" v-if="operateSet.edit">
            <el-button type="primary" icon="edit" size="small" @click="handleEdit(operateData)"></el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="top" v-if="operateSet.delete">
            <el-button type="primary" icon="delete2" size="small" @click="handleDelete(operateData)"></el-button>
        </el-tooltip>
    </div>
</template>

<script>
    export default {
        props: {
            operateSet:{
                type:Object,
                default:function () {
                    return {}
                }
            },
            operateData:{
                type:Object,
                default:function () {
                    return {}
                }
            }
        },
        mounted(){

        },
        data() {
            return {

            };
        },
        methods: {
            handleEdit(data){
                VueEvent.$emit('tableOperateEdit',data);
            },
            handleDelete(data){
                VueEvent.$emit('tableOperateDelete',data);
            },
        }
    };
</script>
