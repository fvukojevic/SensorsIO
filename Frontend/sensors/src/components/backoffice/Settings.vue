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
                <h3 style="word-break: break-all;" class="title">{{this.$store.getters.serverName}}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="card cardPadded">
                <h4 class="title">Change the theme: </h4>
                <br>
                <select name="themeSelect" class="selectBoard">
                  <option v-for="theme in themesArray" :disabled="theme.name === $store.getters.getTheme.name">
                    {{ theme.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card cardPadded">
                <h4 class="title">Current theme: </h4>
                <hr>
                <h3 style="word-break: break-all;" class="title">{{this.getTheme}}</h3>
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
  import themes from '../../themes'

  export default {
    name: "Settings",

    components: {
      Footer,
      Sidebar,
      Navigation
    },

    data() {
      return {
        themesArray : []
      }
    },

    created() {
      for (let key in themes) {
        this.themesArray.push(themes[key])
      }
    },

    computed: {
      getTheme() {
        return this.$store.getters.getTheme.name
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
