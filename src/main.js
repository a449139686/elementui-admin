import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import Request from './api/request';
import apiUrl from './api/apiUrl';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(Request);

Vue.http.options.emulateJSON = true;

global.VueEvent = new Vue();
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
