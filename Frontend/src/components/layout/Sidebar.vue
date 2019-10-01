<template>
  <div class="sidebar" data-image="/src/assets/img/sidebar-4.jpg">
    <div class="sidebar-wrapper" :style="this.$parent.$parent.themeColor">
      <div class="logo">
        <router-link :to="{ name: 'dashboard'}">
          <img class="img-responsive" src="/src/assets/img/logo.png"/>
        </router-link>
      </div>

      <ul class="nav">
        <li :class="{ active : currentPage('/dashboard')}">
          <router-link :to="{ name: 'dashboard'}">
            <i :style="this.$parent.$parent.themeFontColor" class="pe-7s-graph"></i>
            <p :style="this.$parent.$parent.themeFontColor">Landing Page</p>
          </router-link>
        </li>
        <li :class="{ active : currentPage('/profile')}">
          <router-link :to="{ name: 'profile'}">
              <i :style="this.$parent.$parent.themeFontColor" class="pe-7s-user"></i>
              <p :style="this.$parent.$parent.themeFontColor">User Profile</p>
          </router-link>
        </li>
        <li :class="{ active : currentPage('/rooms')}">
          <router-link :to="{ name: 'rooms'}">
            <i :style="this.$parent.$parent.themeFontColor" class="pe-7s-home"></i>
            <p :style="this.$parent.$parent.themeFontColor">Rooms</p>
          </router-link>
        </li>
        <li :class="{ active : currentPage('/notifications')}">
          <router-link :to="{ name: 'notifications'}">
            <i :style="this.$parent.$parent.themeFontColor" class="pe-7s-news-paper"></i>
            <p :style="this.$parent.$parent.themeFontColor">Notifications</p>
          </router-link>
        </li>
        <li :class="{ active : currentPage('/settings')}">
          <router-link :to="{ name: 'settings'}">
            <i :style="this.$parent.$parent.themeFontColor" class="pe-7s-switch"></i>
            <p :style="this.$parent.$parent.themeFontColor">Settings</p>
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
