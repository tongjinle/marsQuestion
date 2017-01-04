import Vue from 'vue';    //引入vue
import Main from './app/Main.vue';  //引入main

import changePassword from './app/changePassword/changePassword.vue';  //引入修改密码页面
import login from './app/login/login.vue';  //引入登录页面

import ElementUI from 'element-ui';   //引入ElementUI
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

/*引入样式*/
import './index.less'; 
import './app/Header.less';   
import './app/Footer.less';
import './app/left.less';
import './app/right.less';
import './app/changePassword/changePassword.less';
import './app/login/log.less';



import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

const router = new VueRouter( {
  mode: 'history',
  /*routes: [{
    path: '/',components: {default: Main},
    path: '/register', components:{default: register}
  }]*/

 routes: [
			{ path: '/', component: Main } ,   //设置默认路径
      { path: '/changePassword', component: changePassword }, //修改密码路径
      { path: '/login', component: login }     //登录路径
            
        ]


});

export  default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')

});
