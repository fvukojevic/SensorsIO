<template>
  <footer :style="this.$parent.$parent.navColor" class="footer">
    <div class="container-fluid">
      <p :style="this.$parent.$parent.navFontColor" class="copyright pull-left">
        sensor.io -  <a href="https://github.com/fvukojevic/SensorsIO" target="_blank">Git Hub</a>
      </p>
      <p :style="this.$parent.$parent.navFontColor" class="copyright pull-right">
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
