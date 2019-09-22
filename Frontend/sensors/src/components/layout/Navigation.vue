<template>
  <nav :style="{background: this.$store.state.theme.nav_color}" class="navbar navbar-default navbar-fixed">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand hidden-xl hidden-lg hidden-md" href="#"><span class="logo-style">sensor.io</span> / {{name}}</a>
        <a class="navbar-brand hidden-xs hidden-sm" :style="{color: this.$store.state.theme.nav_font_color}" href="#">{{name}}</a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li v-if="loggedIn">
            <router-link :style="{color: this.$store.state.theme.nav_font_color}" :to="{ name: 'logout'}">
              Logout
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
      name: "Navigation",
      props: {
        name: String
      },
      computed: {
        loggedIn() {
          return this.$store.getters.loggedIn
        },
      },
    }
</script>

<style scoped>

</style>
