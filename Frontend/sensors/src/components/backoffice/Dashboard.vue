<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <Navigation name="Dashboard"/>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12" id="selector">
              <div class="card" id="listContainer">
              </div>
            </div>
            <div class="col-md-12" id="selector2">

            </div>
          </div>
          <div class="row" id="graphRow">
            <div class="col-md-12" id="chartContainer">
              <canvas id="myChart"></canvas>
            </div>
            <div id="graphOptions" class="col-md-12">
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
  import Navigation from "../layout/Navigation";

  export default {
    name: 'Dashboard',
    components: {
      Navigation,
      Sidebar,
      Footer
    },
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      },
    }
  }
</script>
