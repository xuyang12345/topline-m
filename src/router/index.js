import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)
// 配置路由表
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user')
  },
  {
    path: '/',
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home')
      },
      {
        path: 'question',
        name: 'question',
        component: () => import('@/views/question')
      }, {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      }, {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
