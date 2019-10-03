<template>
  <select class="selectBoard">
    <option disabled selected :value="null">Choose waspomote:</option>
    <option v-for="waspmote in waspomotes" :value="waspmote.ID" >
      {{ waspmote.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: "SelectWaspmote",
    data() {
      return {
        waspomotes:{
          ID:'',
          name: '',
          idRoom: '',
        },
      }
    },
    created() {
      this.$store.dispatch('getWaspmotes')
              .then(response => {
                this.waspomotes = response.data
              });
    },
  }
</script>
