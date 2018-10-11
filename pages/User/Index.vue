<template>
    <v-card>
        <v-card-title primary-title>用户列表
            <v-spacer></v-spacer>
            <v-text-field
                v-model="options.searchKey"
                append-icon="search"
                label="查找..."
                clearable
                @input="fetchData"
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="data"
            item-key="uid"
            :pagination.sync="options"
            :total-items="options.total"
            :loading="loading"
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
            <v-pagination
                v-model="options.page"
                :length="options.pages"
                :total-visible="7"
                @input="handlePageChange"
            ></v-pagination>
        </div>
    </v-card>
</template>

<script>
import api from '~/api/pages'

export default {
    data() {
        return {
            options: api.pageOptions,
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

    asyncData({ $axios,options }) {
        return $axios.get(`/api/users`)
            .then(res => {
                let data = res.data
                //this.data = data.values
                return { data: data.values, options: data.page }
            })
    },

    mounted() {
        //fetch()
    },

    methods: {
        fetchData: function () {
            this.$axios.get(`/api/users`, { params: api.toPageParams(this.options) })
            .then(res => {
                let data = res.data
                this.data = data.values
                this.options.mergePageResult(data.page)
            })
        }
    }
}
</script>

<style>
</style>
