<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    //监听路由检查登录
    watch: {
        "$route": 'checkLogin',
    },
    created(){

    },
    methods: {
        checkLogin(){
            
        }
    }
};



</script>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/

</style>
