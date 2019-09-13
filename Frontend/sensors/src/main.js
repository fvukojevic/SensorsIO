import Vue from 'vue'
import VueRouter from 'vue-router'

import {store} from './store/store'

import Login from "./components/auth/Login.vue";

Vue.use(VueRouter)

new Vue({
  el: '#login',
  store: store,
  render: h => h(Login)
})
