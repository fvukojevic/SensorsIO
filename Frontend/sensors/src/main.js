import Vue from 'vue'
import VueRouter from 'vue-router'

import {store} from './store/store'
import routes from './routes'

import Master from "./components/layout/Master.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  }else {
    next() // make sure to always call next()!
  }
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(Master)
})
