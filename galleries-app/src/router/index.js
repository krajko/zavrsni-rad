import Vue from 'vue'
import VueRouter from 'vue-router'
import { globalAuthGuard } from '../guards/auth.js'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { authRequired: true },
    component: Home
  },
  {
    path: '/register',
    meta: { guestRequired: true },
    component: Register
  },
  {
    path: '/login',
    meta: { guestRequired: true },
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(globalAuthGuard)

export default router
