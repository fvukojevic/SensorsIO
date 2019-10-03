<template>
    <select class="selectBoard">
        <option disabled selected :value="null">Choose a sensor:</option>
        <option v-for="sensor in sensors" :value="sensor.ID" >
            {{ sensor.name }}
        </option>
    </select>
</template>

<script>
    export default {
        name: "SelectSensor",
        data() {
            return {
                sensors:{
                    ID:'',
                    name: '',
                    measureUnit: '',
                },
            }
        },
        created() {
            this.$store.dispatch('getSensors')
                .then(response => {
                    this.sensors = response.data
                });
        },
    }
</script>
