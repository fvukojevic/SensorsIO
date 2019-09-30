<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    computed: {
      themeColor() {
        return {
          'background': this.$store.state.theme.color
        }
      },

      themeFontColor() {
        return {
          'color': this.$store.state.theme.font_color
        }
      },

      navColor() {
        return {
          'background': this.$store.state.theme.nav_color
        };
      },

      navFontColor() {
        return {
          'color': this.$store.state.theme.nav_font_color
        };
      },

      cardColor() {
        return {
          'background': this.$store.state.theme.card
        };
      },

      cardFontColor() {
        return {
          'color': this.$store.state.theme.card_font_color
        };
      },

      buttonColor() {
        return {
          'background': this.$store.state.theme.button
        };
      }
    },
  }
</script>
