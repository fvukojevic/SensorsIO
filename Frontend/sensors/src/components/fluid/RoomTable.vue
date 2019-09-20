<template>
  <table class="table">
    <thead>
    <tr>
      <th width="10%">Room</th>
      <th width="10%">Sensor</th>
      <th width="10%">Delete</th>
      <th width="10%">Save</th>
    </tr>
    </thead>
    <tbody id="tbody">
    <RoomTableRow v-for="room in rooms"  :room ="room" :key="room.ID"/>
    </tbody>
  </table>
</template>

<script>
    import RoomTableRow from '../fluid/RoomTableRow'
    import Vue from 'vue'
  export default {
      name: "RoomTable",
      props: {
        rooms: Array,
      },
      components: {
          RoomTableRow,
      },
      methods: {
          deleteRoom(id) {
              this.$store.dispatch('deleteRoom', {
                  id:id
              }).then(() => {
                this.$store.dispatch('createSwal', {type: 'success', title: 'Room deleted successfully', width: '300px'})
              }).catch(error => {
                  console.log(error)
              })
              for(var i = 0; i< this.rooms.length;i++){
                  if(this.rooms[i].ID === id){
                      Vue.delete(this.rooms, i)
                  }
              }
          }
      },
    }
</script>

<style scoped>

</style>
