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

                  </tbody>
                </table>
                <button id="addRoom" class="moarButton">Add new room <strong>+</strong></button>
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

  export default {
    name: "Room",
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      },
    },
    components: {
      Footer,
      Sidebar
    },
  }
</script>
