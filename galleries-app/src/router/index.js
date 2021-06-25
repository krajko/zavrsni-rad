import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import UserGalleries from '../views/UserGalleries.vue'
import MyGalleries from '../views/MyGalleries.vue'
import Gallery from '../views/Gallery.vue'
import GalleryForm from '../views/GalleryForm.vue'

import { globalAuthGuard } from '../guards/auth.js'

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
  },
  {
    path: '/authors/:id',
    meta: { authRequired: true },
    component: UserGalleries,
    props: true
  },
  {
    path: '/my-galleries',
    meta: { authRequired: true },
    component: MyGalleries
  },
  {
    path: '/galleries/:id',
    meta: { authRequired: true },
    component: Gallery
  },
  {
    path: '/create',
    meta: { authRequired: true },
    component: GalleryForm
  },
  {
    path: '/edit/:id',
    meta: { authRequired: true },
    component: GalleryForm,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(globalAuthGuard)

export default router
