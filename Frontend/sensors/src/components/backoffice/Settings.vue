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
            <a class="navbar-brand hidden-xl hidden-lg hidden-md" href="#"><span class="logo-style">sensor.io</span> / Settings</a>
            <a class="navbar-brand hidden-xs hidden-sm" href="#">Postavke</a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <ul class="nav navbar-nav navbar-right">
                  <li v-if="loggedIn"><router-link :to="{ name: 'logout'}">Logout</router-link></li>
                </ul>
              </li>
              <li class="separator hidden-lg hidden-md"></li>
            </ul>
          </div>
        </div>
      </nav>


      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="card cardPadded">
                <h4 class="title">Change the server IP: </h4>
                <br>
                <button v-on:click="serverInput" class="moarButton">Change server</button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card cardPadded">
                <h4 class="title">Current server: </h4>
                <hr>
                <h3 id="current" style="word-break: break-all;" class="title">{{this.$store.getters.serverName}}</h3>
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
    name: "Settings",

    components: {
      Footer,
      Sidebar
    },

    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      },
    },

    methods: {
      serverInput() {
        this.$store.dispatch('insertServer')
      },
    }
  }
</script>

<style scoped>

</style>
