import Vue from 'vue';
import Main from './app/Main.vue';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './app/question.less';
import './index.less';
import './app/Title.less';
Vue.use(VueRouter);
Vue.use(Element);
const router = new VueRouter({
  mode: 'history',
  routes: [{path: '/',components: {default: Main}}]
});

export  default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
