<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <Navigation name="Rooms"/>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card" style="padding: 15px" :style="{background: this.$store.state.theme.card}">
               <RoomTable :rooms="this.rooms"/>
                <button v-on:click="addRoom" class="moarButton" :style="{background: this.$store.state.theme.button}">
                  Add new room <strong>+</strong>
                </button>
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
  import Navigation from '../layout/Navigation'
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
            this.$store.dispatch('createSwal', {type: 'success', title: 'Room created successfully', width: '300px'})
          }).catch(error => {
            this.$store.dispatch('createSwal', {type: 'error', title: error.toString(), width: '300px'})
          })
        })
      },
    },

    components: {
      RoomTable,
      Footer,
      Sidebar,
      Navigation
    },
  }
</script>
