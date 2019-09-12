<template>
    <div class="wrp">

      <form class="form-signin">
        <img class="img-responsive" id="logImage" src="/src/assets/img/logoDark.png" />

        <hr id="hrBold">
        <h2 class="form-signin-heading">Login</h2>

        <label>Username</label>
        <input id="user" type="text" class="form-control" v-model="username" required="" autofocus="" />

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
  }
</script>
