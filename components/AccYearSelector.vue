<template>
    <v-select
        label="账套年份"
        prepend-icon="calendar_today"
        name="year"
        v-model="accYear"
        :items="years"
        @change="onYearChanged"
    ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            accYear: this.$store.getters['accsuit/accYear']
        }
    },
    computed: {
        ...mapGetters({
            'years':'accsuit/accYears'
        })
    },
    methods: {
        onYearChanged() {
            this.$store.commit('accsuit/setAccYear', this.accYear)
        }
    }
}
</script>

<style>
</style>
