import Vue from 'vue'
import VueRouter from 'vue-router'

import {store} from './store/store'

import Master from "./components/layout/Master.vue";
import Login from "./components/auth/Login.vue";

Vue.use(VueRouter)

const routes = [
  { path : '/', component: Login}
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(Master)
})
