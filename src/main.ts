// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import Vuetify from 'vuetify';

import router from './router';
import store from './store';

import App from './App.vue';

import date from './assets/filters/date';
import time from './assets/filters/time';

import '../node_modules/vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(VueCookie);

Vue.filter('date', date);
Vue.filter('time', time);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
});
