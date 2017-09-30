import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home.vue'
import Hours from '@/components/Hours/Hours.vue';
import Invoice from '@/components/Invoice/Invoice.vue';
import Login from '@/components/Login.vue';
import * as Cookies from 'js-cookie';

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
      path: '/hours',
      name: 'Hours',
      component: Hours,
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
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
