<template>
    <v-layout row wrap="">
        <div>账套年度:{{accYear}}</div>
        <v-spacer/>
        <div>&copy; Lingya Tech {{ new Date().getFullYear() }}</div>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: mapGetters({
        accYear: 'accsuit/accYear'
    })
}
</script>

<style>
</style>
