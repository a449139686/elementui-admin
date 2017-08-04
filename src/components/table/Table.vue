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
        <!--设置搜索-->
        <div class="handle-box">
            <v-search :SearchData="searchData"></v-search>
        </div>
        <!--表格信息-->
        <el-table :data="data" border style="width: 100%;" @cell-dblclick="tableDoubleClick"
                  :highlight-current-row="true">
            <el-table-column type="expand" v-if="tableDetail">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="setDetail.label" v-for="setDetail in tableDetail">
                            <span>{{ props.row[setDetail.key]}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template scope="scope">
                    <v-operate :operateData="scope.row" :operateSet="operateSet"></v-operate>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="cur_page"
                :page-sizes="[20, 40, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import VSearch from '../table/Search.vue';
    import VOperate from '../table/TableOperate.vue';
    export default {
        props: {
            tableBreadcrumb: {//面包屑信息
                type: Array,
                default: function () {
                    return [{
                        name: '无',
                        icon: 'el-icon-menu',
                    }, {
                        name: '无',
                        icon: 'el-icon-menu',
                    }];
                }
            },
            searchData: {//搜索信息
                type: Object,
                default: function () {
                    return {
                        searchType: [{
                            label: '搜索选项1',
                            value: '1',
                        }, {
                            label: '搜索选项2',
                            value: '2',
                        }],
                        type: [{
                            label: '类型选项1',
                            value: '1',
                        }, {
                            label: '类型选项2',
                            value: '2',
                        }],
                        status: [{
                            label: '状态选项1',
                            value: '1',
                        }, {
                            label: '状态选项2',
                            value: '2',
                        }],
                        area: [{
                            label: '浙江省',
                            value: 'zhejiang',
                            children: [{
                                label: '杭州市',
                                value: 'hangzhou',
                            }, {
                                label: '金华市',
                                value: 'jinhua',
                            }],
                        }],
                        date: true,
                    };
                }
            },
            tableDetail: {//表格标题
                type: Array,
                default: function () {
                    return [{
                        label: '日期',
                        key: 'date'
                    }, {
                        label: '姓名',
                        key: 'name'
                    }, {
                        label: '地址',
                        key: 'address'
                    }];
                }
            },
        },
        components: {
            VSearch, VOperate
        },
        created(){
            VueEvent.$on('searchTable', function (searchData) {
                console.log(searchData);
            });
            VueEvent.$on('tableOperateEdit', function (operateData) {
                console.log(operateData);
            });
            VueEvent.$on('tableOperateDelete', function (operateData) {
                console.log(operateData);
            });

            this.getData();
        },
        data() {
            return {
                operateSet: {
                    edit: true,
                    delete: true,
                },
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function (d) {
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if (d.name === self.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            setSearchData(searchData){
                this.searchData = searchData;
            },
            tableDoubleClick(){
                alert(1);
            },
            /** 分页栏 */
            handleSizeChange(pageSize){
                console.log(pageSize);
            },

            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },

            getData(){
                let self = this;
                if (process.env.NODE_ENV === 'development') {
                    self.url = '/ms/table/list';
                }
                ;
                self.$axios.post(self.url, {page: self.cur_page, pagesize: 20}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第' + (index + 1) + '行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第' + (index + 1) + '行');
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了' + str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                alert(1);
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
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
