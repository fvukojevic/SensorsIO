<template>
  <select class="selectBoard">
    <option v-for="waspmote in waspomotes" :disabled="waspmote.id_room !== 0">
     {{ waspmote.name }}
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
          this.waspomotes = response.data.filter((waspmote) => {return waspmote.id_room === this.roomId || waspmote.id_room === 0})
        });
    }
  }
</script>
