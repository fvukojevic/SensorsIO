import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token != null
    },
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },

    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8888/user/login', {
          email : credentials.email,
          password : credentials.password,
        })
          .then(response => {
            const token = response.data.token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)

            resolve(response)
          })
          .catch(error => {
            alert('Credentials did not match')
            reject(error)
          })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = context.state.token

      if(context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8888/user/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      }
    },
  }
})
