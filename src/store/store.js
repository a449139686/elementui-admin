/**
 * Created by Mr.Zhou on 2017/8/7.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as Menu from './menu';

Vue.use(Vuex);

const state = {
    count:0,
    menuData:Menu.menu_list,
    adminInfo:{},
    breadcrumb:[{
      icon:'',
      name:''
    },{
      icon:'',
      name:''
    }],
};

const mutations = {

};

const actions = {

};

const getters = {

};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
