<template>
  <tr>
    <td> {{this.room.name}}</td>
    <td>
      <select class="selectBoard">
        <option v-for="waspmote in waspomotes" :disabled="waspmote.id_room !== 0">
          {{ waspmote.name }}
        </option>
      </select>
    </td>
    <td><button  v-on:click="$parent.deleteRoom(room.ID)" class="delButton btn-block" style="margin: 0px; padding: 8px 0;"><i class="fa fa-times" aria-hidden="true"></i></button></td>
    <td><button  class="addBoard moarButton" style="margin: 0px; padding: 8px 0;"><i class="fa fa-floppy-o" aria-hidden="true"></i></button></td>
  </tr>
</template>

<script>

  export default {
      name: "RoomTableRow",
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
          room: Object,
      },
      created() {
          this.$store.dispatch('getWaspmotes')
              .then(response => {
                  this.waspomotes = response.data.filter((waspmote) => {return waspmote.id_room === this.room.ID || waspmote.id_room === 0})
              });
      },

  }
</script>

<style scoped>

</style>
