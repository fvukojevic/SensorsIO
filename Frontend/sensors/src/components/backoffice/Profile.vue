<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <Navigation name="Profile"/>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card card-user" :style="{background: this.$store.state.theme.card}">
                <div class="image">
                  <img src="/src/assets/img/profile_cover.jpg" />
                </div>
                <div class="content">
                  <div class="author">
                    <img class="avatar border-gray" src="/src/assets/img/face-2.jpg" alt="..."/>
                    <h3 :style="{color: this.$store.state.theme.card_font_color}" id="headFullName">{{ user.username }}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="card" :style="{background: this.$store.state.theme.card}">
                <div class="header">
                  <h4 :style="{color: this.$store.state.theme.card_font_color}" class="title">Edit profile</h4>
                </div>
                <div class="content">
                  <form @submit.prevent="updateUser">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label :style="{color: this.$store.state.theme.card_font_color}">Username</label>
                          <input id="formUsername" type="text" class="form-control" v-model="user.username" required="">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label :style="{color: this.$store.state.theme.card_font_color}">Email address</label>
                          <input id="formEmail" type="email" class="form-control" v-model="user.email"required="">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label :style="{color: this.$store.state.theme.card_font_color}">Name</label>
                          <input id="formName" type="text" class="form-control" v-model="user.name"required="">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label :style="{color: this.$store.state.theme.card_font_color}">Lastname</label>
                          <input id="formSurname" type="text" class="form-control" v-model="user.lastname" required="">
                        </div>
                      </div>
                    </div>
                    <hr>
                    <button type="submit" class="moarButton" :style="{background: this.$store.state.theme.button}">
                      Save changes
                    </button>
                    <div class="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="card" :style="{background: this.$store.state.theme.card}">
                <div class="header">
                  <h4 :style="{color: this.$store.state.theme.card_font_color}" class="title">Change password</h4>
                </div>
                <div class="content">
                  <form @submit.prevent="updatePassword">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label :style="{color: this.$store.state.theme.card_font_color}">Old password</label>
                          <input id="formOldPassword" type="password" class="form-control" v-model="user.oldPassword" required="">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label :style="{color: this.$store.state.theme.card_font_color}">New password</label>
                          <input id="formNewPassword" type="password" class="form-control" v-model="user.newPassword" required="">
                        </div>
                      </div>
                      <div class="col-md-6 col-md-offset-3">
                        <div class="form-group">
                          <label :style="{color: this.$store.state.theme.card_font_color}">Reenter password</label>
                          <input id="formConfirmPassword" type="password" class="form-control" v-model="user.confirmPassword" required="">
                        </div>
                      </div>
                    </div>
                    <hr>
                    <button type="submit" class="moarButton" :style="{background: this.$store.state.theme.button}">
                      Change password
                    </button>
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
            },
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
