<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <Navigation name="Settings"/>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="card cardPadded" :style="this.$parent.cardColor">
                <h4 :style="this.$parent.cardFontColor" class="title">Change the server IP: </h4>
                <br>
                <button v-on:click="serverInput" class="moarButton" :style="this.$parent.buttonColor">
                  Change server
                </button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card cardPadded" :style="this.$parent.cardColor">
                <h4 :style="this.$parent.cardFontColor" class="title">Current server: </h4>
                <hr>
                <h3 style="word-break: break-all" :style="this.$parent.cardFontColor" class="title">{{this.$store.getters.serverName}}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="card cardPadded" :style="this.$parent.cardColor">
                <h4 :style="this.$parent.cardFontColor" class="title">Change the theme: </h4>
                <br>
                <select name="themeSelect" class="selectBoard" v-on:change="changeTheme()" v-model="key">
                  <option v-for="theme in themesArray" :value="theme.name" :disabled="theme.name === $store.getters.getTheme.name">
                    {{ theme.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card cardPadded" :style="this.$parent.cardColor">
                <h4 :style="this.$parent.cardFontColor" class="title">Current theme: </h4>
                <hr>
                <h3 style="word-break: break-all;" :style="this.$parent.cardFontColor" class="title">{{this.getTheme}}</h3>
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
  import Footer from '../../layout/Footer.vue'
  import Sidebar from '../../layout/Sidebar'
  import Navigation from '../../layout/Navigation'
  import themes from '../../../themes'

  export default {
    name: "Settings",

    components: {
      Footer,
      Sidebar,
      Navigation
    },

    data() {
      return {
        themesArray: [],
        key: ""
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

      changeTheme() {
        this.$store.dispatch('changeTheme', {
          name: this.key
        })
      },
    }
  }
</script>
