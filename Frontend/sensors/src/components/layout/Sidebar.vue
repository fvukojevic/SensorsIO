<template>
  <div class="sidebar" data-image="/src/assets/img/sidebar-4.jpg">
    <div class="sidebar-wrapper" :style="{background: this.$store.state.theme.color}">
      <div class="logo">
        <router-link :to="{ name: 'dashboard'}">
          <img class="img-responsive" src="/src/assets/img/logo.png"/>
        </router-link>
      </div>

      <ul class="nav">
        <li :class="{ active : currentPage('/dashboard')}">
          <router-link :to="{ name: 'dashboard'}">
            <i :style="{color: this.$store.state.theme.font_color}" class="pe-7s-graph"></i>
            <p :style="{color: this.$store.state.theme.font_color}">Landing Page</p>
          </router-link>
        </li>
        <li :class="{ active : currentPage('/profile')}">
          <router-link :to="{ name: 'profile'}">
              <i :style="{color: this.$store.state.theme.font_color}" class="pe-7s-user"></i>
              <p :style="{color: this.$store.state.theme.font_color}">User Profile</p>
          </router-link>
        </li>
        <li :class="{ active : currentPage('/rooms')}">
          <router-link :to="{ name: 'rooms'}">
            <i :style="{color: this.$store.state.theme.font_color}" class="pe-7s-home"></i>
            <p :style="{color: this.$store.state.theme.font_color}">Rooms</p>
          </router-link>
        </li>
        <li>
          <a href="obavijesti.php">
            <i :style="{color: this.$store.state.theme.font_color}" class="pe-7s-news-paper"></i>
            <p :style="{color: this.$store.state.theme.font_color}">Notifications</p>
          </a>
        </li>
        <li :class="{ active : currentPage('/settings')}">
          <router-link :to="{ name: 'settings'}">
            <i :style="{color: this.$store.state.theme.font_color}" class="pe-7s-switch"></i>
            <p :style="{color: this.$store.state.theme.font_color}">Settings</p>
          </router-link>
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
