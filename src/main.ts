// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';

import EntryList from '@/components/Home/EntryList.vue';
import LogEntry from '@/components/Home/LogEntry.vue';
import ProjectHours from '@/components/Hours/ProjectHours.vue';
import NavBar from '@/components/NavBar.vue';

import date from './assets/filters/date';
import time from './assets/filters/time';

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';


Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.component('entry-list', EntryList);
Vue.component('log-entry', LogEntry);
Vue.component('project-hours', ProjectHours);
Vue.component('log-nav-bar', NavBar);
Vue.filter('date', date);
Vue.filter('time', time);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
