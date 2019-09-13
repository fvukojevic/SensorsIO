import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      axios.post('http://localhost:8888/user/login', {
        email : credentials.email,
        password : credentials.password,
      })
        .then(response => {
          const token = response.data.token

          localStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)
        })
    }
  }
})
