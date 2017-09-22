import Vue from 'vue'
import Router from 'vue-router'
import DateTimeList from '@/components/DateTimeList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DateTimeList',
      component: DateTimeList
    }
  ]
})
