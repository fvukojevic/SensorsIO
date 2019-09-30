<template>

</template>

<script>
  export default {
    created() {
      this.$store.dispatch('destroyToken')
        .then(() => {
          this.$router.push({ name : 'home' })
        }).catch(error => {
          console.log(error)
          this.$router.push({ name : 'home' })
      })
    },
  }
</script>
