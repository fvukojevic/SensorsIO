<template>
  <select class="selectBoard" v-model="wasp" v-on:change="handleChange()">
    <option  disabled :value="null">Choose waspomote:</option>
    <option v-for="waspmote in waspomotes" :disabled="waspmote.id_room !== 0" :value="waspmote.ID" >
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
                wasp : null
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
        },
        methods:{
            handleChange(){
                this.$parent.handleChange(this.wasp);
            }
        }
    }
</script>
