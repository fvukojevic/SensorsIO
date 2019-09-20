<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <nav class="navbar navbar-default navbar-fixed">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand hidden-xl hidden-lg hidden-md" href="#"><span class="logo-style">sensor.io</span> / Rooms</a>
            <a class="navbar-brand hidden-xs hidden-sm" href="#">Rooms</a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li v-if="loggedIn"><router-link :to="{ name: 'logout'}">Logout</router-link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card" style="padding: 15px">
               <RoomTable :rooms="this.rooms"/>
                <button v-on:click="addRoom" class="moarButton">Add new room <strong>+</strong></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  </div>

</template>

<script>
  import Footer from '../layout/Footer.vue'
  import Sidebar from '../layout/Sidebar'
  import RoomTable from "../fluid/RoomTable"
  import Vue from 'vue'

  export default {
    name: "Room",
    data() {
      return {
        rooms:{
          ID: '',
          name: '',
          CreatedAt: '',
          UpdatedAt: '',
          DeletedAt: '',
        },
      }
    },

    created() {
      this.$store.dispatch('getRooms')
        .then(response => {
          this.rooms = response.data
        });
    },

    methods: {
      addRoom() {
        swal({
          title: 'Enter room name:',
          input: 'text',
          showCancelButton: true,
          inputValidator: value => {
            return new Promise(function (resolve, reject) {
              if (value) {
                resolve()
              } else {
                reject('You did not enter a name!')
              }
            });
          }
        }).then(name => {
          this.$store.dispatch('addRoom', {
            name: name
          }).then(response => {
            this.rooms.push(response.data)
              for(var i=0;i<this.rooms.length;i++){
                  if(this.rooms.DeletedAt){
                      Vue.delete(this.rooms,i)
                  }
              }
            this.$store.dispatch('createSwal', {type: 'success', title: 'Room created succesfully', width: '300px'})
          }).catch(error => {
            this.$store.dispatch('createSwal', {type: 'error', title: error.toString(), width: '300px'})
          })
        })
      },
    },

    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      },
    },

    components: {
      RoomTable,
      Footer,
      Sidebar
    },
  }
</script>
