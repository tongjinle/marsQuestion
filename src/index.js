import Vue from 'vue';
import Main from './app/Main.vue';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-default/index.css';
import './app/question.less';
import './index.less';
import './app/QuestionList.less';
import './app/shCore.css';
Vue.use(VueRouter);
Vue.use(Element);
Vue.use(VueResource);
const router = new VueRouter({
  mode: 'history',
  routes: [{path: '/',components: {default: Main}}]
});

export  default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
