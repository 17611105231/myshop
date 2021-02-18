import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const login = () => import('../views/Login.vue')
const home = () => import('../views/Home.vue')

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import('../views/Welcome.vue') },
      { path: '/users', component: () => import('../views/user/Users.vue') },
      { path: '/roles', component: () => import('../views/power/Roles.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
