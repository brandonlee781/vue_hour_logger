import Vue from 'vue'
import Router from 'vue-router'
import * as Cookies from 'js-cookie';

import Home from '@/components/Home/Home.vue'
import HourSearch from '@/components/Hours/HourSearch.vue';
import Invoice from '@/components/Invoice/Invoice.vue';
import Project from '@/components/Project/Project.vue';
import Login from '@/components/Login.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter(to, from, next) {
        const authCookie = Cookies.get('hourLoggerAuth');
        if (!authCookie) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/invoice',
      name: 'Invoice',
      component: Invoice,
      beforeEnter(to, from, next) {
        const authCookie = Cookies.get('hourLoggerAuth');
        if (!authCookie) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/project',
      name: 'Project',
      component: Invoice,
      beforeEnter(to, from, next) {
        const authCookie = Cookies.get('hourLoggerAuth');
        if (!authCookie) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
