<template>
<div>
    <!--设置搜索-->
    <div class="handle-box">
        <v-search :SearchData="searchData"></v-search>
    </div>
    <!--表格信息-->
    <el-table :data="data.items" border @sort-change="sortChangeHandle" style="width: 100%;" @cell-dblclick="tableDoubleClick" :highlight-current-row="true" v-loading.body="tableLoading" element-loading-text="拼命加载中">
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
        <el-table-column prop="auth_key" label="认证备注">
        </el-table-column>
        <el-table-column prop="welcome_msg" label="欢迎信息">
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
    <div class="pagination" v-show="data.total_items > 0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="searchParam.page_size" :current-page="searchParam.page" :page-sizes="[15, 30, 50, 100]" :page-count="data.total_pages" layout="total, sizes, prev, pager, next, jumper"
          :total="data.total_items">
        </el-pagination>
    </div>
    <el-dialog :title="'编辑 id: '+editTable.id" :visible.sync="editTableModal" size="tiny">
        <el-form :model="editTable" ref="form" label-width="80px" class="demo-ruleForm">
            <el-form-item label="是否开启">
                <el-switch on-text="" off-text="" v-model="editTable.status"></el-switch>
            </el-form-item>
            <el-form-item label="认证备注">
                <el-input type="text" placeholder="请输入认证备注" v-model="editTable.auth_key" style="width: 85%"></el-input>
            </el-form-item>
            <el-form-item label="欢迎信息">
                <el-input type="textarea" placeholder="请输入欢迎信息" v-model="editTable.welcome_msg" style="width: 85%;height:70px;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editTableModal = false">取 消</el-button>
            <el-button type="primary" @click="handleOnSubmit" :loading="editTableLoading">确认提交</el-button>
        </div>
    </el-dialog>
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
                        label: '认证备注',
                        value: '1',
                    }],
                    status: [{
                        label: '正常',
                        value: '1',
                    }, {
                        label: '关闭',
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
                    label: '认证备注',
                    key: 'auth_key'
                }, {
                    label: '欢迎信息',
                    key: 'welcome_msg'
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
        var self = this;
        VueEvent.$on('searchTable', function(searchData) {
            self.searchParam.search_time = searchData.searchDate;
            self.searchParam.status = searchData.status;
            self.searchParam.search_type = searchData.searchType;
            self.searchParam.search_val = searchData.searchVal;
            console.log(self.searchParam);
            self.getLists(self.searchParam);
        });
        VueEvent.$on('tableOperateEdit', function(operateData) {
            VueEvent.$emit('editSet', operateData);
            self.editTableModal = true;
            self.editTable = operateData;
        });
        VueEvent.$on('tableOperateDelete', function(operateData) {
            self.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.deleteRow(operateData);
            }).catch(() => {});
        });
        this.getLists(this.searchParam);
    },
    data() {
        return {
            operateSet: {
                edit: true,
                delete: true,
            },
            data: {},
            tableLoading: true,
            searchParam: {
                page: 1,
                page_size: 15,
            },
            editTableModal: false,
            editTableLoading: false,
            editTable: {
                status: false,
            },
        }
    },
    computed: {

    },
    methods: {
        tableDoubleClick() {
            alert(1);
        },
        sortChangeHandle(column, prop, order) {
            console.log(column, prop, order);
            //this.searchParam.order_by = order == 'ascending' ? prop + ' asc' : prop + ' desc';
            //this.getLists(this.searchParam);
        },
        /** 分页栏 */
        handleSizeChange(pageSize) {
            this.searchParam.page_size = pageSize;
            this.tableLoading = true;
            this.getLists(this.searchParam);
        },

        handleCurrentChange(val) {
            this.searchParam.page = val;
            this.tableLoading = true;
            this.getLists(this.searchParam);
        },
        getLists(search) {
            var self = this;
            self.postData(ApiUrl.friendRequestList, search, function(res) {
                if (res.code == 1) {
                    self.data = res.data;
                    self.tableLoading = false;
                } else {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            });
        },
        deleteRow(data) {
            var self = this;
            self.postData(ApiUrl.friendRequestDelete, data, function(res) {
                if (res.code == 1) {
                    self.$message({
                        message: '删除成功，即将刷新页面',
                        type: 'success',
                        onClose: function() {
                            self.getLists(self.searchParam);
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
        handleOnSubmit() {
            var self = this;
            self.editTableLoading = true;
            self.postData(ApiUrl.friendRequestAdd, self.editTable, function(res) {
                if (res.code == 1) {
                    self.loading = false;
                    self.$message({
                        message: '修改成功',
                        type: 'success',
                        onClose: function() {
                            self.editTableLoading = false;
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
