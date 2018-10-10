<template>
    <v-select label="账套年份" prepend-icon="calendar_today" name="year" v-model="accYear" :items="years" @change="onYearChanged"></v-select>
</template>

<script>
export default {
    data(){
        return {
            accYear:this.$store.getters.accYear
        }
    },
    computed: {
        years(){
            return [2016,2017]
        }
    },
    methods:{
        onYearChanged(){
            this.$store.commit('setAccYear',this.accYear)
        }
    }
}
</script>

<style>

</style>
