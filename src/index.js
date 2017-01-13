



import Content from './app/Content.vue';

Vue.use(ElementUI);

import './app/LeftNav.less';
import './index.less';
import './app/content.less';
import 'element-ui/lib/theme-default/index.css';

import Vue from 'vue';    //引入vue
import Main from './app/Main.vue';  //引入main

// import changePassword from './app/changePassword/changePassword.vue';  //引入修改密码页面
// import login from './app/login/login.vue';  //引入登录页面

import ElementUI from 'element-ui';   //引入ElementUI

Vue.use(ElementUI);

import log from './app/login/log.vue'; //引入login
import change from './app/changePassword/change.vue'; //引入change
// import home from './app/home.vue'; //引入home


/*引入样式*/

import './app/Header.less';   
import './app/Footer.less';
import './app/left.less';
import './app/right.less';
import './app/changePassword/changePassword.less';
import './app/login/log.less';




import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import './app/question.less';
import './app/QuestionList.less';
import './app/shCore.css';
Vue.use(VueRouter);
Vue.use(VueResource);

import VueResource from 'vue-resource';
Vue.use(VueResource);

const router = new VueRouter( {
  mode: 'history',

  /*routes: [{
    path: '/',components: {default: Main},
    path: '/register', components:{default: register}
  }]*/

 routes: [
			{ path: '/', component: Main,
         children: [
        {
          path: 'changePassword',
          component: change
        },
        {          
          path: 'login',
          component: log
        }
        
      ]

       } ,   //设置默认路径
      // { path: '/changePassword', component: change }, //修改密码路径
      // { path: '/login', component: log }     //登录路径
            
        ]



});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')

});
