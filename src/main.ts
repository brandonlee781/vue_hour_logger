// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import Vuetify from 'vuetify';

import router from './router';
import store from './store';

import App from './App.vue';
import LogEntryList from '@/components/LogEntry/LogEntryList.vue';
import LogEntry from '@/components/LogEntry/LogEntry.vue';
import HourTotalsSearch from '@/components/HourTotals/HourTotalsSearch.vue';
import HourTotalsCard from '@/components/HourTotals/HourTotalsCard.vue';
import NavBar from '@/components/NavBar.vue';
import SideNav from '@/components/SideNav.vue';

import date from './assets/filters/date';
import time from './assets/filters/time';

import '../node_modules/vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(VueCookie);


Vue.component('entry-list', LogEntryList);
Vue.component('log-entry', LogEntry);
Vue.component('hour-search', HourTotalsSearch);
Vue.component('project-hours', HourTotalsCard);
Vue.component('log-nav-bar', NavBar);
Vue.component('log-side-nav', SideNav);

Vue.filter('date', date);
Vue.filter('time', time);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
