<template>
    <el-row type="flex" :gutter="20" justify="start">
        <el-col :span="6" v-if="SearchData.searchType">
            <el-input placeholder="请输入内容" v-model="searchModal.searchVal">
                <el-select v-model="searchModal.searchType" clearable slot="prepend" placeholder="请选择" style="width: 100px;">
                    <el-option v-for="searchTypes in SearchData.searchType" :label="searchTypes.label"
                               :value="searchTypes.value"></el-option>
                </el-select>
            </el-input>
        </el-col>
        <el-col :span="3" v-if="SearchData.status">
            <el-select v-model="searchModal.status" clearable placeholder="请选择状态">
                <el-option
                    v-for="item in SearchData.status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-col>

        <el-col :span="3" v-if="SearchData.type">
            <el-select v-model="searchModal.type" clearable placeholder="请选择类型">
                <el-option
                    v-for="item in SearchData.type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="4" v-if="SearchData.area">
            <el-cascader
                placeholder="地址选择：搜索试试"
                :options="SearchData.area"
                filterable
                clearable
                :value="searchModal.area"
                @change="changeArea"
                change-on-select
            ></el-cascader>
        </el-col>
        <el-col :span="5" v-if="SearchData.date">
            <el-date-picker
                v-model="searchModal.searchDate"
                type="daterange"
                placeholder="选择时间范围"
                format
                align="left">
            </el-date-picker>
        </el-col>
        <el-button type="primary" icon="search" @click="search" v-if="searchBtn">搜索</el-button>
    </el-row>
</template>
<script>
    export default {
        props: {
            SearchData:{
                type:Object,
                default:function () {
                    return {}
                }
            },
        },
        mounted(){
            for (let key in this.SearchData){
                this.searchBtn = true;
            }
        },
        data() {
            return {
                searchBtn:false,
                searchModal:{
                    searchType:'',
                    searchVal:'',
                    searchDate:[],
                    status:'',
                    type:'',
                    area:[],
                }
            };
        },
        methods: {
            search(){
                VueEvent.$emit('searchTable',this.searchModal);
            },
            changeArea(res){
                this.searchModal.area = res;
            },
        }
    };
</script>
