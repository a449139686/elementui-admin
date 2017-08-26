<template>
<div>
    <!--设置搜索-->
    <div class="handle-box">
        <v-search :SearchData="searchData"></v-search>
    </div>
    <!--表格信息-->
    <el-table :data="data" border style="width: 100%;" @cell-dblclick="tableDoubleClick" :highlight-current-row="true" v-loading.body="tableLoading" element-loading-text="拼命加载中">
        <el-table-column type="expand" v-if="tableDetail">
            <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item :label="setDetail.label" v-for="setDetail in tableDetail">
                    <span>{{ props.row[setDetail.key]}}</span>
                </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column prop="id" label="id" sortable>
        </el-table-column>
        <el-table-column prop="command" label="指令">
        </el-table-column>
        <el-table-column prop="type" label="回复类型">
        </el-table-column>
        <el-table-column prop="reply_content" label="回复内容">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间">
        </el-table-column>
        <el-table-column label="操作" width="170">
            <template scope="scope">
            <v-operate :operateData="scope.row" :operateSet="operateSet"></v-operate>
        </template>
        </el-table-column>
    </el-table>
    <div class="pagination" v-show="data.length > 0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[20, 40, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </div>
</div>
</template>

<script>
import VSearch from '../../table/Search.vue';
import VOperate from '../../table/TableOperate.vue';
export default {
    props: {
        searchData: { //搜索信息
            type: Object,
            default: function() {
                return {
                    searchType: [{
                        label: '指令',
                        value: '1',
                    }, {
                        label: '回复内容',
                        value: '2',
                    }],
                    status: [{
                        label: '正常',
                        value: '1',
                    }, {
                        label: '关闭',
                        value: '2',
                    }],
                    type: [{
                        label: '文字',
                        value: '1',
                    }, {
                        label: '语音',
                        value: '2',
                    }],
                    date: true,
                };
            }
        },
        tableDetail: { //表格标题
            type: Array,
            default: function() {
                return [{
                    label: 'id',
                    key: 'id'
                }, {
                    label: '指令',
                    key: 'command'
                }, {
                    label: '回复类型',
                    key: 'type'
                }, {
                    label: '回复内容',
                    key: 'reply_content'
                }, {
                    label: '状态',
                    key: 'status'
                }, {
                    label: '添加时间',
                    key: 'create_time'
                }, {
                    label: '更新时间',
                    key: 'update_time'
                }];
            }
        },
    },
    components: {
        VSearch,
        VOperate
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
    },
    data() {
        return {
            operateSet: {
                edit: true,
                delete: true,
            },
            data: [],
            cur_page: 1,
            tableLoading: false
        }
    },
    computed: {

    },
    methods: {
        setSearchData(searchData) {
            this.searchData = searchData;
        },
        tableDoubleClick() {
            alert(1);
        },
        /** 分页栏 */
        handleSizeChange(pageSize) {
            console.log(pageSize);
        },

        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
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
