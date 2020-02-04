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
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('../views/search')
  },
  {
    path: '/search',
    name: 'user',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  },
  {
    // 我的作品
    path: '/my-article',
    name: 'my-article',
    component: () => import('@/views/user-articles')
  },
  {
    // 我的收藏
    path: '/my-article/collect',
    name: 'my-article-collect',
    component: () => import('@/views/user-articles')
  },
  {
    // 我的历史
    path: '/my-article/history',
    name: 'my-article-history',
    component: () => import('@/views/user-articles')
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
