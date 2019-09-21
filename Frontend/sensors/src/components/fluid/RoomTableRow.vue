<template>
  <tr>
    <td> {{this.room.name}}</td>
    <td>
      <Select :room-id="this.room.ID"/>
    </td>
    <td><button  v-on:click="$parent.deleteRoom(room.ID)" class="delButton btn-block" style="margin: 0px; padding: 8px 0;"><i class="fa fa-times" aria-hidden="true"></i></button></td>
    <td><button  v-on:click="addWaspmoteToRoom(wasp,room.ID)" class="addBoard moarButton" style="margin: 0px; padding: 8px 0;"><i class="fa fa-floppy-o" aria-hidden="true"></i></button></td>
  </tr>
</template>

<script>
    import Select from '../fluid/Select'

  export default {
      name: "RoomTableRow",
      data:{
          wasp:null
      },
      props: {
          room: Object,
      },
      components: {
          Select,
      },
      methods:{
          addWaspmoteToRoom(idWaspmote, idRoom){
              this.$parent.addWaspmoteToRoom(idWaspmote, idRoom)
  },
          handleChange(wasp){
              this.wasp = wasp;
          }
      }

  }
</script>

<style scoped>

</style>
