<template>
  <select class="selectBoard">
    <option v-for="waspomote in waspomotes">
      {{ waspomote.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: "Select",
    data() {
      return {
        waspomotes:{
          ID:'',
          name: '',
          idRoom: '',
        },
      }
    },
    props: {
      roomId: Number,
    },

    created() {
      this.$store.dispatch('getWaspmotes')
        .then(response => {
          this.waspomotes = response.data
        });
    }
  }
</script>
