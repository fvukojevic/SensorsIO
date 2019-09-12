import Vue from 'vue'
import {store} from './store/store'
import Login from "./components/Login.vue";

new Vue({
  el: '#login',
  store: store,
  render: h => h(Login)
})
