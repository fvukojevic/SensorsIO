<template>
    <div class="wrp">

      <form class="form-signin" action="#" @submit.prevent="login">
        <img class="img-responsive" id="logImage" src="/src/assets/img/logoDark.png" />

        <hr id="hrBold">
        <h2 class="form-signin-heading">Login</h2>

        <label>Username</label>
        <input id="user" type="text" class="form-control" v-model="email" required="" autofocus="" />

        <label>Password</label>
        <input id="pass" type="password" class="form-control" v-model="password" required="" />

        <button class="btn btn-lg btn-primary btn-block" onclick="return false;" id="selectIP">Change the server</button>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>

    </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login() {
        this.$store.dispatch('retrieveToken', {
          email : this.email,
          password : this.password,
        })
          .then(() => {
            this.$router.push({
              name: 'dashboard'
            })
          })
      }
    }
  }
</script>

<style>
  body {
    background: linear-gradient(13deg, #72e3f0, #216269, #0d317a);
    background-size: 600% 600%;
    -webkit-animation: AnimationName 19s ease infinite;
    -moz-animation: AnimationName 19s ease infinite;
    animation: AnimationName 19s ease infinite;
    min-height: 0;
  }
  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 94%
    }
    50% {
      background-position: 100% 7%
    }
    100% {
      background-position: 0% 94%
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 94%
    }
    50% {
      background-position: 100% 7%
    }
    100% {
      background-position: 0% 94%
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 94%
    }
    50% {
      background-position: 100% 7%
    }
    100% {
      background-position: 0% 94%
    }
  }
  .wrp {
    margin-top: 80px;
    margin-bottom: 80px;
  }
  .form-signin {
    max-width: 380px;
    padding: 15px 35px 45px;
    margin: auto;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 7px;
  }
  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 30px;
  }
  .form-signin .checkbox {
    font-weight: normal;
  }
  .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 5px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
  }
  .form-signin input[type="password"] {
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
  }
  #logImage {
    margin-top: 10px;
  }
  #hrBold {
    border-top: 1px solid #c7c7c7;
  }

  body {
    background: linear-gradient(13deg, #72e3f0, #216269, #0d317a);
    background-size: 600% 600%;
    -webkit-animation: AnimationName 19s ease infinite;
    -moz-animation: AnimationName 19s ease infinite;
    animation: AnimationName 19s ease infinite;
    min-height: 0;
  }
  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 94%
    }
    50% {
      background-position: 100% 7%
    }
    100% {
      background-position: 0% 94%
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 94%
    }
    50% {
      background-position: 100% 7%
    }
    100% {
      background-position: 0% 94%
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 94%
    }
    50% {
      background-position: 100% 7%
    }
    100% {
      background-position: 0% 94%
    }
  }
  .form-signin :focus {
    z-index: 2;
  }
  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 5px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
  }
  .form-signin input[type="password"] {
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
  }

</style>
