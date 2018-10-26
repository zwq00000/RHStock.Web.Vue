<template>
    <div>
        <year-select/>
        <v-tabs dark slider-color="yellow">
            <v-tab href="#tab-1">全年库存总账</v-tab>
            <v-tab-item value="tab-1" key="1">
                <v-card flat>
                    <v-data-table
                        :headers="headers"
                        :items="data"
                        item-key="whCode"
                        :pagination.sync="pagination"
                        no-data-text="没有数据 :("
                    >
                        <v-progress-linear slot="progress" color="blue" indeterminate/>
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.depName }}</td>
                            <td>{{ props.item.whCode }}</td>
                            <td>{{ props.item.whName }}</td>
                            <td class="justify-center layout px-0">
                                <v-tooltip bottom>
                                    <v-icon slot="activator"
                                        small
                                        class="mr-2"
                                        @click="genTotalAccount(props.item.whCode)"
                                    >done</v-icon>
                                    <span>生成全年账簿</span>
                                </v-tooltip>
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-tab-item>
        </v-tabs>
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

                })
        }
    }

}
</script>

<style>
</style>
