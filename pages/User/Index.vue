<template>
    <v-card>
        <v-card-title primary-title>用户列表
            <v-spacer></v-spacer>
            <v-text-field
                v-model="pagination.searchKey"
                append-icon="search"
                label="查找..."
                clearable
                @change="fetchData"
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="data"
            item-key="uid"
            :pagination.sync="pagination"
            :total-items="pagination.totalItems"
            :loading="loading"
            :search="pagination.searchKey"
            no-data-text="没有数据 :("
            hide-actions
        >
            <v-progress-linear slot="progress" color="blue" indeterminate/>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.userName }}</td>
                <td>{{ props.item.fullName }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.depCode }}</td>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pagination.pages" :total-visible="7"></v-pagination>
        </div>
    </v-card>
</template>

<script>
import api from '~/api/pages'

export default {
    data() {
        return {
            pagination: {},
            loading: false,
            headers: [
                { value: 'userName', text: '用户名' },
                { value: 'fullName', text: '全名' },
                { value: 'email', text: '邮件地址' },
                { value: 'depCode', text: '部门' },
            ],
            data: []
        }
    },

    asyncData({ $axios, options }) {
        return $axios.get(`/api/users`)
            .then(res => {
                let data = res.data
                return { data: data.values ,pagination:api.toPagination(data.page)}
            })
    },
    watch: {
        pagination: function (oldval, newval) {
            if (newval.sortBy === oldval.sortBy && newval.descending === oldval.descending) {
                this.fetchData()
            }
        }
    },
    methods: {
        handlePageChange(val) {
            this.options.page = val
            this.fetchData()
        },
        fetchData: function () {
            this.$axios.get(`/api/users`, api.toParams(this.pagination))
                .then(res => {
                    let data = res.data
                    this.data = data.values
                    api.mergePageination(this.pagination,data.page);
                })
        }
    }
}
</script>

<style>
</style>
