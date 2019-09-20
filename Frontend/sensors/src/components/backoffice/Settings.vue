<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <Navigation name="Settings"/>



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
  import Navigation from '../layout/Navigation'

  export default {
    name: "Settings",

    components: {
      Footer,
      Sidebar,
      Navigation
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
