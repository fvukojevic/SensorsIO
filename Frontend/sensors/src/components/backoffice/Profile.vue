<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <Navigation name="Profile"/>

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
                    <h3 id="headFullName">{{ user.username }}</h3>
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

            <div class="col-md-12">
              <div class="card">
                <div class="header">
                  <h4 class="title">Change password</h4>
                </div>
                <div class="content">
                  <form @submit.prevent="updatePassword">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Old password</label>
                          <input id="formOldPassword" type="password" class="form-control" v-model="user.oldPassword" required="">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>New password</label>
                          <input id="formNewPassword" type="password" class="form-control" v-model="user.newPassword" required="">
                        </div>
                      </div>
                      <div class="col-md-6 col-md-offset-3">
                        <div class="form-group">
                          <label>Reenter password</label>
                          <input id="formConfirmPassword" type="password" class="form-control" v-model="user.confirmPassword" required="">
                        </div>
                      </div>
                    </div>
                    <hr>
                    <button type="submit" class="moarButton">Change password</button>
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
  import Navigation from '../layout/Navigation'

  export default {
        name: "Profile",
        data() {
          return {
            user:{
              name:'',
              lastname: '',
              email:'',
              username: '',
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
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
          Sidebar,
          Navigation
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
                this.$store.dispatch('createSwal', {type: 'success', title: 'Profile edited successfully!', width: '300px'})
              }).catch(error => {
              alert(error)
            })
          },

          updatePassword() {
            this.$store.dispatch('updatePassword', {
              user: this.user
            })
              .then(() => {
                this.$store.dispatch('createSwal', {type: 'success', title: 'Password changed successfully', width: '300px'})
              }).catch(error => {
                  this.user.oldPassword = '',
                  this.user.newPassword = '',
                  this.user.confirmPassword = '',
                  this.$store.dispatch('createSwal', {type: 'error', title: error.toString(), width: '300px'})
              })
          },

        }
    }
</script>
