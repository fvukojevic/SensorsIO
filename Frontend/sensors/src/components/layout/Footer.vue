<template>
  <footer :style="{background: this.$store.state.theme.nav_color}" class="footer">
    <div class="container-fluid">
      <p :style="{color: this.$store.state.theme.nav_font_color}" class="copyright pull-left">
        sensor.io -  <a href="https://github.com/fvukojevic/SensorsIO" target="_blank">Git Hub</a>
      </p>
      <p :style="{color: this.$store.state.theme.nav_font_color}" class="copyright pull-right">
        Server - {{ this.serverName }}
      </p>
    </div>
  </footer>
</template>

<script>
    export default {
        name: "Footer",
        computed: {
          serverName() {
            return this.$store.getters.serverName
          }
        }
    }
</script>
