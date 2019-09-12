import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

  },
  actions: {
    retrieveToken(context, credentials) {
      axios.post('http://localhost:8888/user/login', {
        crossdomain : true,
        email : credentials.email,
        password : credentials.password,
      })
        .then(response => {
          console.log(response);
        })
    }
  }
})
