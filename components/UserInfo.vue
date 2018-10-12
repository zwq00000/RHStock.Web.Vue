<template>
    <v-menu offset-y>
        <v-avatar slot="activator" color="teal">
            <span class="white--text headline">{{firstChar}}</span>
        </v-avatar>
        <v-list>
            <v-list-tile v-for="(item, index) in items" :key="index" @click="onClick">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
    <!--
        <v-avatar slot="activator" color="teal">
            <span class="white- -text headline">{{firstChar}}</span>
        </v-avatar>
        <v-tooltip bottom>
    <v-btn slot="activator" icon>
        <v-icon>person</v-icon>
    </v-btn>
    <span>{{user}}</span>
</v-tooltip>
    -->
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            items: [
                { title: '注销用户' }
            ]
        }
    },

    computed:mapGetters({
        user:'user/user',
        firstChar:'user/nameLabel'
    }),
    methods:{
        onClick(val){
            this.$store.dispatch('logout')
            this.$router.push('/user/login')
        }
    }
}
</script>

<style>
</style>

