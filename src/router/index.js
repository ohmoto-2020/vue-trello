import Vue from 'vue'
import VueRouter from 'vue-router'
import Bord from '../views/Bord.vue'
import Login from '../views/Login.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Bord',
    component: Bord
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next()
      } else {
        next({ path: '/login' })
      }
    })
  }
})

export default router
