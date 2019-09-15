import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    server: localStorage.getItem('serverName') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token != null
    },
    serverName(state) {
      return state.server
    },
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },

    destroyToken(state) {
      state.token = null
    },

    insertServer(state, serverName) {
      state.server =  serverName
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

    insertServer(context) {
      swal({
        title: 'Insert the server address:',
        input: 'text',
        inputPlaceholder: 'example: 46.35.158.207:2565/sensors',
        showCancelButton: true,
        inputValidator: function (value) {
          return new Promise( (resolve, reject) => {
            if (value) {
              resolve()
            } else {
              reject('Please insert the server to connect to app!')
            }
          });
        }
      }).then(function (name) {
        const serverName = name

        localStorage.setItem("serverName", name);
        context.commit('insertServer', serverName)
        location.reload();
      }).catch(swal.noop);
    }
  }
})
