<template>
  <div class="sidebar" data-color="blue" data-image="/src/assets/img/sidebar-4.jpg">
    <div class="sidebar-wrapper">
      <div class="logo">
        <router-link :to="{ name: 'dashboard'}">
          <img class="img-responsive" src="/src/assets/img/logo.png"/>
        </router-link>
      </div>

      <ul class="nav">
        <li :class="{ active : currentPage('/dashboard')}">
          <router-link :to="{ name: 'dashboard'}">
            <i class="pe-7s-graph"></i>
            <p>Landing Page</p>
          </router-link>
        </li>
        <li :class="{ active : currentPage('/profile')}">
          <router-link :to="{ name: 'profile'}">
              <i class="pe-7s-user"></i>
              <p>User Profile</p>
          </router-link>
        </li>
        <li>
          <a href="prostorije.php">
            <i class="pe-7s-home"></i>
            <p>Rooms</p>
          </a>
        </li>
        <li>
          <a href="obavijesti.php">
            <i class="pe-7s-news-paper"></i>
            <p>Notifications</p>
          </a>
        </li>
        <li>
          <a href="postavke.php">
            <i class="pe-7s-switch"></i>
            <p>Settings</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Sidebar",
        methods: {
          currentPage(path) {
            return this.$route.path === path
          }
        }
    }
</script>
