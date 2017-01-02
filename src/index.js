import Vue from 'vue';
import Main from './app/main.vue';
import DataAnalysis from './app/dataAnalysis.vue';

import ElementUI from 'element-ui';

Vue.use(ElementUI);

import './app/leftNav.less';
import './index.less';
import './app/header.less';
import './app/footer.less';
import './app/content.less';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
  {path: '/', components: {default: Main}},
  {path: '/DataAnalysis', components: {default: DataAnalysis}}
  ]
});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
