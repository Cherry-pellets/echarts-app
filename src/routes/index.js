import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/chart'
    },
    {
      path: '/chart',
      component: Layout,
      redirect: '/chart/mixCharts',
      children: [
        {
          path: 'bar',
          component: () => import('@/views/Bar')
        },
        {
          path: 'line',
          component: () => import('@/views/Line')
        },
        {
          path: 'pie',
          component: () => import('@/views/Pie')
        },
        {
          path: 'mixCharts',
          component: () => import('@/views/MixCharts/bar-line.vue')
        }
      ]
    }
  ]
})