<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <Navigation name="Notifications"/>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12" id="selector">
              <div class="card">
                <select id="selectBoard">
                  <option selected="true" disabled="true">Choose a waspmote:</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="card cardPadded">
                <div class="content">
                  <form>
                    <div class="row">
                      <div class="col-md-2">
                        <h4 class="title">Notify me when</h4>
                      </div>
                      <div class="col-md-10">
                        <select id="selectSensor">
                          <option selected="true" disabled="true">Choose a sensor:</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-2">
                        <h4 class="title">passes a value </h4>
                      </div>
                      <div class="col-md-10 form-group">
                        <input id="notifyValue" type="number" class="form-control">
                      </div>
                    </div>
                    <hr>
                    <button type="submit" id="notifyMeButton" class="moarButton" :style="this.$parent.buttonColor">Save</button>
                    <div class="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <Footer />
    </div>
</template>

<script>
  import Footer from '../../layout/Footer.vue'
  import Sidebar from '../../layout/Sidebar'
  import Navigation from '../../layout/Navigation'
  import themes from '../../../themes'

  export default {
    components: {
      Footer,
      Sidebar,
      Navigation
    },
  }
</script>
