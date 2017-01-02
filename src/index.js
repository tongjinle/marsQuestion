import Vue from 'vue';
import Main from './app/Main.vue';
import DataAnalysis from './app/DataAnalysis.vue';

import ElementUI from 'element-ui';

Vue.use(ElementUI);

import './LeftNav.less';
import './index.less';
import './content.less';
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
