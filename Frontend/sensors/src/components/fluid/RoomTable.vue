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
    <tr v-for="room in rooms">
      <td> {{room.name}}</td>
      <td>
        <Select :room-id="room.ID"/>
      </td>
      <td><button :id="room.ID" v-on:click="deleteRoom(room.ID)" class="delButton btn-block" style="margin: 0px; padding: 8px 0;"><i class="fa fa-times" aria-hidden="true"></i></button></td>
      <td><button :id="room.ID" class="addBoard moarButton" style="margin: 0px; padding: 8px 0;"><i class="fa fa-floppy-o" aria-hidden="true"></i></button></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import Select from '../fluid/Select'

  export default {
      name: "RoomTable",
      props: {
        rooms: Array,
      },
      methods: {
        deleteRoom(id) {
          this.$store.dispatch('deleteRoom', {
            id:id
          }).then(() => {
            swal({
                position: 'middle',
                type: 'success',
                title: 'Room deleted successfully!',
                showConfirmButton: false,
                timer: 3000,
                width: '500px'
              }
            ).catch(swal.noop);
            let destArr=[];
            Object.keys(this.rooms).forEach(key => {
              if(this.rooms[key].ID !== id) {
                destArr.push(this.rooms[key])
              }
            })
            this.rooms = destArr
          }).catch(error => {
            console.log(error)
          })
        }
      },
      components: {
        Select,
      },
    }
</script>

<style scoped>

</style>
