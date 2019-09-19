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
                <table class="table">
                  <thead>
                  <tr>
                    <th width="10%">Room</th>
                    <th width="10%">Sensor</th>
                    <th width="10%">Delete</th>
                    <th width="10%">Save</th>
                  </tr>
                  </thead>
                  <tbody id="tbody">
                    <tr v-for="room in rooms">
                      <td> {{room.name}}</td>
                      <td>
                        <Select :room-id="room.ID"/>
                      </td>
                      <td><button :id="room.ID" v-on:click="deleteRoom(room.ID)" class="delButton btn-block" style="margin: 0px; padding: 8px 0;"><i class="fa fa-times" aria-hidden="true"></i></button></td>
                      <td><button :id="room.ID" class="addBoard moarButton" style="margin: 0px; padding: 8px 0;"><i class="fa fa-floppy-o" aria-hidden="true"></i></button></td>
                    </tr>
                  </tbody>
                </table>
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
  import Select from '../layout/Select'

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
          }).then(() => {
            swal({
              position: 'middle',
              type: 'success',
              title: 'Room craeted successfully! Please refresh the page to see the changes',
              showConfirmButton: false,
              timer: 3000,
              width: '500px'
            }).catch(swal.noop);
          }).catch(error => {
            swal({
              position: 'middle',
              type: 'error',
              title: error.toString(),
              showConfirmButton: false,
              timer: 2000,
              width: '300px'
            }).catch(swal.noop);
          })
        }).catch(swal.noop)
      },

      deleteRoom(id) {
        this.$store.dispatch('deleteRoom', {
          id:id
        }).then(() => {
          swal({
            position: 'middle',
            type: 'success',
            title: 'Room deleted successfully! Please refresh the page to see the changes',
            showConfirmButton: false,
            timer: 3000,
            width: '500px'
          }).catch(swal.noop);
        })
      }
    },

    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      },
    },

    components: {
      Select,
      Footer,
      Sidebar
    },
  }
</script>
