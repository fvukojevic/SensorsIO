<template>
  <table class="table">
    <thead>
    <tr>
      <th width="10%" :style="{color: this.$store.state.theme.card_font_color}">Room</th>
      <th width="10%" :style="{color: this.$store.state.theme.card_font_color}">Sensor</th>
      <th width="10%" :style="{color: this.$store.state.theme.card_font_color}">Delete</th>
      <th width="10%" :style="{color: this.$store.state.theme.card_font_color}">Save</th>
    </tr>
    </thead>
    <tbody id="tbody">
    <RoomTableRow v-for="room in rooms" :room ="room"/>
    </tbody>
  </table>
</template>

<script>
    import RoomTableRow from './RoomTableRow'
    import Vue from 'vue'
  export default {
      name: "RoomTable",
      props: {
        rooms: Object,
      },
      components: {
          RoomTableRow,
      },
      methods: {
          addWaspmoteToRoom(idWaspmote,idRoom) {
              this.$store.dispatch('addWaspmoteToRoom', {
                  idWaspmote: idWaspmote,
                  idRoom: idRoom
              }).then(() => {
                  this.$store.dispatch('createSwal', {type: 'success', title: 'Waspmote added successfully', width: '300px'})
          }).catch(error =>{
                this.$store.dispatch('createSwal', {type: 'error', title: error.toString(), width: '300px'})
            })

          },

          deleteRoom(id) {
              this.$store.dispatch('deleteRoom', {
                  id:id
              }).then(() => {
                this.$store.dispatch('createSwal', {type: 'success', title: 'Room deleted successfully', width: '300px'})
              }).catch(error => {
                this.$store.dispatch('createSwal', {type: 'error', title: error.toString(), width: '300px'})
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
