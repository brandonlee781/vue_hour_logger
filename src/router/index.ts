import Vue from 'vue'
import Router from 'vue-router'
import * as Cookies from 'js-cookie';

import Home from '@/views/Home.vue'
import Invoice from '@/views/Invoice.vue';
import Project from '@/views/Project.vue';
import Login from '@/views/Login.vue';

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
      path: '/projects',
      name: 'Project',
      component: Project,
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
