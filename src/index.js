import Vue from 'vue';
import Main from './app/Main.vue';
import DataAnalysis from './app/DataAnalysis.vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

import './app/LeftNav.less';
import './index.less';
import './app/content.less';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
Vue.use(VueRouter);
Vue.use(VueResource);

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
