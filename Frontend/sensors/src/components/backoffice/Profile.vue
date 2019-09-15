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
            <a class="navbar-brand hidden-xl hidden-lg hidden-md" href="#"><span class="logo-style">sensor.io</span> /Profile</a>
            <a class="navbar-brand hidden-xs hidden-sm" href="#">Profile</a>
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
                  <img src="/src/assets/img/profile_cover.jpg" />
                </div>
                <div class="content">
                  <div class="author">
                    <img class="avatar border-gray" src="/src/assets/img/face-2.jpg" alt="..."/>
                    <hr>
                    <h3 id="headFullName"></h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="card">
                <div class="header">
                  <h4 class="title">Edit profile</h4>
                </div>
                <div class="content">
                  <form @submit.prevent="updateUser">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Username</label>
                          <input id="formUsername" type="text" class="form-control" v-model="user.username" required="">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Change Password</label>
                          <button id="changePassword" class="btn btn-default btn-block"> Change password</button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Email address</label>
                          <input id="formEmail" type="email" class="form-control" v-model="user.email"required="">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Name</label>
                          <input id="formName" type="text" class="form-control" v-model="user.name"required="">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Lastname</label>
                          <input id="formSurname" type="text" class="form-control" v-model="user.lastname" required="">
                        </div>
                      </div>
                    </div>
                    <hr>
                    <button type="submit" class="moarButton">Save changes</button>
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
        data() {
          return {
            user:{
              name:'',
              lastname: '',
              email:'',
              username: '',
            }
          }
        },
        created() {
          this.$store.dispatch('getUser')
            .then(response => {
              this.user.email = response.data.Email
              this.user.name = response.data.Name
              this.user.lastname = response.data.Surname
              this.user.username = response.data.Username
            })
        },
        components: {
          Footer,
          Sidebar
        },
        computed: {
          loggedIn() {
            return this.$store.getters.loggedIn
          },
        },
        methods: {
          updateUser() {
            this.$store.dispatch('updateUser', {
              user: this.user
            })
              .then(() => {
                swal({
                  position: 'middle',
                  type: 'success',
                  title: 'Uspješno ažuriranje profila!',
                  showConfirmButton: false,
                  timer: 2000,
                  width: '300px'
                }).catch(swal.noop);
              }).catch(error => {
              alert(error)
            })
          },
        }
    }
</script>
