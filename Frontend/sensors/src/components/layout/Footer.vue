<template>
  <footer class="footer">
    <div class="container-fluid">
      <p class="copyright pull-left">
        sensor.io -  <a href="https://github.com/fvukojevic/SensorsIO" target="_blank">Git Hub</a>
      </p>
      <p class="copyright pull-right">
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
