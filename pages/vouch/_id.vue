<template>
    <v-form>
        <v-layout row justify-space-between>
            <nuxt-link :to="'/vouch/'+previous"><v-btn flat small>上一张</v-btn></nuxt-link>
            <h2>{{vouch.vouchType}}</h2>
            <nuxt-link :to="'/vouch/'+next"><v-btn flat small>下一张</v-btn></nuxt-link>
        </v-layout>
        <v-layout row justify-space-between>
            <v-text-field v-model="vouch.whCode" label="仓库" readonly/>
            <v-spacer/>
            <v-text-field v-model="vouch.vouchCode" label="单号" readonly/>
            <v-spacer/>
            <v-text-field v-model="vouch.vouchDate" label="日期" readonly/>
            <v-spacer />
            <v-text-field v-model="vouch.quantity" label="数量合计" readonly/>
        </v-layout>
        <v-layout row justify-space-between>
            <v-text-field v-model="vouch.depName" label="部门" readonly/>
            <v-spacer/>
            <v-text-field v-model="vouch.cusName" label="客户" readonly/>
            <v-spacer/>
            <v-text-field v-model="vouch.vendor" label="供应商" readonly/>
        </v-layout>
        <v-layout row justify-space-between>
            <v-text-field v-model="vouch.maker" label="制单" readonly/>
            <v-spacer/>
            <v-text-field v-model="vouch.handler" label="经手人" readonly/>
            <v-spacer/>
            <v-text-field v-model="vouch.verifier" label="审核" readonly/>
            <v-spacer/>
            <v-text-field v-model="vouch.attachment" label="附件" readonly/>
        </v-layout>
       
        <v-data-table
            :headers="headers"
            :items="vouch.details"
            item-key="autoId"
            no-data-text="没有数据 :("
            hide-actions
        >
            <v-progress-linear slot="progress" color="blue" indeterminate/>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.invCode}}</td>
                <td>{{ props.item.batch}}</td>
                <td>{{ props.item.iNum}}</td>
                <td>{{ props.item.iQuantity}}</td>
                <td>{{ props.item.posCode}}</td>
                <td>{{ props.item.summary}}</td>
                <td>{{ props.item.invName}}</td>
            </template>
        </v-data-table>
         <v-layout row justify-space-between>
            <v-text-field v-model="vouch.memo" label="备注"/>
        </v-layout>
    </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/rdrecordApi'

export default {
    validate({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    },
    data() {
        return {
            id: this.$route.params.id,
            previous: '',
            next: '',
            vouch: {},
            headers: [
                { value: 'invCode', text: '存货代码' },
                { value: 'batch', text: '批号' },
                { value: 'iNum', text: '件数' },
                { value: 'iQuantity', text: '数量' },
                { value: 'posCode', text: '货位' },
                { value: 'summary', text: '摘要' },
                { value: 'invName', text: '品名' },
            ]
        }
    },
    compute: mapGetters({
        accYear: 'accsuit/accYear',
        whCode: 'warehouse/whCode'
    }),
    watch: {
        id: function () {
            this.fetchData()
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            let year = this.$store.state.accsuit.accYear
            api.getVouch(this.whCode, year, this.id).then(res => {
                let data = res.data
                this.previous = data.previous
                this.next = data.next
                this.vouch = data.vouch
            })
        }
    }
}
</script>

<style>
</style>
