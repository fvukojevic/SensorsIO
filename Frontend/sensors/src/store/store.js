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
        axios.post('http://' + this.state.server + '/user/login', {
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
            swal({
              position: 'middle',
              type: 'error',
              title: 'Error connecting to server',
              showConfirmButton: false,
              timer: 2000,
              width: '300px'
            })
            reject(error)
          })
      })
    },

    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = context.state.token

      if(context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('http://' + this.state.server + '/user/logout')
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
    },

    getUser(context) {
      axios.defaults.headers.common['Authorization'] = context.state.token

      return new Promise((resolve, reject) => {
        axios.post('http://' + this.state.server + '/user/getUser')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    updateUser(context, user) {
      axios.defaults.headers.common['Authorization'] = context.state.token
      return new Promise((resolve, reject) => {
        axios.post('http://' + this.state.server + '/user/updateUser', {
          email: user.user.email,
          username: user.user.username,
          surname: user.user.lastname,
          name: user.user.name
        }).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updatePassword(context, user) {
      axios.defaults.headers.common['Authorization'] = context.state.token
      return new Promise((resolve, reject) => {
        axios.post('http://' + this.state.server + '/user/updatePassword', {
          oldPassword: user.user.oldPassword,
          newPassword: user.user.newPassword,
          confirmPassword: user.user.confirmPassword,
        }).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getRooms() {
      return new Promise((resolve, reject) => {
        axios.get('http://' + this.state.server + '/room/getRooms')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    addRoom(context, name) {
      return new Promise((resolve, reject) => {
        axios.post('http://' + this.state.server + '/room/addRoom', {
          name: name.name
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteRoom(context, id) {
      return new Promise((resolve, reject) => {
        axios.post('http://' + this.state.server + '/room/deleteRoom', {
          id: id.id
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getWaspmotes() {
      return new Promise((resolve, reject) => {
        axios.get('http://' + this.state.server + '/waspmote/getWaspmotes')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

  }
})
