<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card class="elevation-12">
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignin">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="userName"
                                            label="用户名"
                                            id="userName"
                                            prepend-icon="person"
                                            v-model="userName"
                                            type="string"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="密码"
                                            id="password"
                                            prepend-icon="lock"
                                            v-model="password"
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <accYearSelect/>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-btn type="submit" :loading="loading">Login</v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import accYearSelect from '~/components/AccYearSelector'

export default {
    middleware: 'anonymous',
    components: {
        accYearSelect
    },
    layout: 'empty',
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    async fetch({ $axios, store }) {
        //获取账套年度列表
        let { data } = await $axios.get('/api/accsuit/years')
        store.commit('accsuit/setAccYears', data.years)
    },
    computed: mapState({
        token: state => state.user.token,
        error: 'error',
        loading: 'loading'
    }),
    watch: {
        token(value) {
            if (value !== null && value !== undefined) {
                if (this.$router.options.routes.length > 0) {
                    this.$router.go(-1)
                } else {
                    this.$router.push('/')
                }
            }
        }
    },
    methods: {
        ...mapActions({
            'login': 'user/signUserIn'
        }),
        onSignin() {
            this.login({ userName: this.userName, password: this.password })
        },
        onDismissed() {
            this.$store.dispatch('clearError')
        }
    }
}
</script>