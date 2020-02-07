import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import article from '@/views/article'
import images from '@/views/images'
import publish from '@/views/publish'
import comment from '@/views/comment'
import fans from '@/views/fans'
import setting from '@/views/setting'
import NotFound from '@/views/NotFound'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: login },
    {
      path: '/', component: home, children: [
        { path: '/', component: welcome },
        { path: 'article', component: article },
        { path: 'images', component: images },
        { path: 'publish', component: publish },
        { path: 'comment', component: comment },
        { path: 'fans', component: fans },
        { path: 'setting', component: setting }
      ]
    },
    { path: '*', component: NotFound }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router