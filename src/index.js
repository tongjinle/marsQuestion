import Vue from 'vue';    //引入vue
import Main from './app/Main.vue';  //引入main

import ElementUI from 'element-ui';   //引入ElementUI
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

import './index.less';
import './app/Header.less';   
import './app/Footer.less';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter( {
  mode: 'history',
  routes: [{
    path: '/',
    components: {
      default: Main
    }
  }]
});

export  default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
