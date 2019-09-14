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
            <a class="navbar-brand hidden-xl hidden-lg hidden-md" href="#"><span class="logo-style">sensor.io</span> /Landing Page</a>
            <a class="navbar-brand hidden-xs hidden-sm" href="#">Landing Page</a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li v-if="loggedIn"><router-link :to="{ name: 'logout'}">Logout</router-link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card card-user">
                <div class="image">
                  <img src="/PiiS/web/web2/assets/img/profile_cover.jpg" />
                </div>
                <div class="content">
                  <div class="author">
                    <img class="avatar border-gray" src="/PiiS/web/web2/assets/img/face-2.jpg" alt="..."/>
                    <hr>
                    <h3 id="headFullName"></h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="card">
                <div class="header">
                  <h4 class="title">Uredi profil</h4>
                </div>
                <div class="content">
                  <form>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Korisničko ime</label>
                          <input id="formUsername" type="text" class="form-control" placeholder="Korisnički ime" value="" required="">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Promjena lozinke</label>
                          <button id="changePassword" class="btn btn-default btn-block"> Promjeni</button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Email adresa</label>
                          <input id="formEmail" type="email" class="form-control" placeholder="Email" value="" required="">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Ime</label>
                          <input id="formName" type="text" class="form-control" placeholder="Ime" value="" required="">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Prezime</label>
                          <input id="formSurname" type="text" class="form-control" placeholder="Prezime" value="" required="">
                        </div>
                      </div>
                    </div>
                    <hr>
                    <button id="updateProfile" class="moarButton">Ažuriraj profil</button>
                    <div class="clearfix"></div>
                  </form>
                </div>
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
        name: "Profile",
        components: {
          Footer,
          Sidebar
        }
    }
</script>
