<template>
    <div>
        <year-select/>
        <v-data-table
            :headers="headers"
            :items="data"
            item-key="whCode"
            :pagination="pagination"
            :loading="loading"
            no-data-text="没有数据 :("
            hide-actions
        >
            <v-progress-linear slot="progress" color="blue" indeterminate/>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.depName }}</td>
                <td>{{ props.item.whCode }}</td>
                <td>{{ props.item.whName }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="genTotalAccount(props.item.whCode)">done</v-icon>
                </td>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination
                v-model="pagination.page"
                :length="pagination.pages"
                :total-visible="7"
                @input="handlePageChange"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AccYearSelector from '~/components/AccYearSelector'
import whApi from '~/api/WarehouseApi'
import totalAccountApi from '~/api/TotalAccountApi'

export default {
    components: {
        yearSelect: AccYearSelector
    },
    data() {
        return {
            pagination: {},
            loading: false,
            headers: [
                { value: 'depName', text: '部门' },
                { value: 'whCode', text: '仓库代码' },
                { value: 'whName', text: '仓库名称' }
            ],
            data: [{
                "whCode": "string",
                "whName": "string",
                "depCode": "string",
                "depName": "string"
            }]
        }
    },
    computed: mapGetters({
        accYear: 'accsuit/accYear',
        depCode: 'user/depCode'
    }),
    watch: {
        accYear: function () {
            this.fetchData();
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        genTotalAccount(whCode) {
            this.loading = true
            totalAccountApi.createFullYear(whCode, this.accYear).then(res => {
                console.log(res.data);
                this.loading = false
            }).catch(err => {
                this.loading = false
                this.showWarnMsg({
                    message: `数据加载失败,${err.message}`
                })
            })
        },
        handlePageChange(val) {
            this.pagination.page = val
            this.fetchData()
        },
        fetchData: function () {
            this.loading = true
            whApi.GetWarehouses(this.accYear, this.depCode)
                .then(res => {
                    let data = res.data
                    this.data = data.values
                    pages.mergePageination(this.pagination, data.page)
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                    this.showWarnMsg({
                        message: `数据加载失败,${err.message}`
                    })
                })
        }
    }

}
</script>

<style>
</style>
