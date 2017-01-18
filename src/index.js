
Vue.use(ElementUI);


import './index.less';

import 'element-ui/lib/theme-default/index.css';

import Vue from 'vue'; //引入vue
import Main from './app/Main.vue'; //引入main

// import changePassword from './app/changePassword/changePassword.vue';  //引入修改密码页面
// import login from './app/login/login.vue';  //引入登录页面

import ElementUI from 'element-ui'; //引入ElementUI

Vue.use(ElementUI);

import log from './app/login/log.vue'; //引入login
import change from './app/changePassword/change.vue'; //引入change
import questionList from './app/questionList.vue'; //引入答题列表
import question from './app/question.vue';//引入答题细节
import Content from './app/Content.vue'; //引入数据分析页


// import home from './app/home.vue'; //引入home

/*引入样式*/

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
Vue.use(VueRouter);
Vue.use(VueResource);



const router = new VueRouter({
  mode: 'history',

  /*routes: [{
    path: '/',components: {default: Main},
    path: '/register', components:{default: register}
  }]*/

  routes: [{
      path: '/',
      component: Main,
      children: [{
          path: 'changePassword',
          component: change
        }, {
          path: 'login',
          component: log
        },{
          path:'questionList',
          component:questionList
        },{
          path:'Content',
          component:Content
        },{
          path:'question',
          component:question
        }

      ]

    }, //设置默认路径
    // { path: '/changePassword', component: change }, //修改密码路径
    // { path: '/login', component: log }     //登录路径

  ]



});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')

});