<template>
	<v-card>
		<v-card-title primary-title>库存单据
			<v-spacer/>
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
			item-key="id"
			:pagination="pagination"
			:loading="loading"
			no-data-text="没有数据 :("
			hide-actions
		>
			<v-progress-linear slot="progress" color="blue" indeterminate/>
			<template slot="items" slot-scope="props">
				<td>{{ props.item.whCode}}</td>
				<td><nuxt-link :to="'/vouch/'+props.item.id">{{ props.item.code}}</nuxt-link></td>
				<td>{{ props.item.vouchType}}</td>
				<td>{{ props.item.vouchDate|dateFormat}}</td>
				<td>{{ props.item.maker}}</td>
				<td>{{ props.item.depCode}}</td>
				<td>{{ props.item.cusCode}}</td>
				<td>{{ props.item.verifier}}</td>
				<td>{{ props.item.vendorId}}</td>
				<td>{{ props.item.memo}}</td>
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
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import pages from '@/api/pages'
import api from '@/api/rdrecordApi'

export default {
	data() {
		return {
			pagination: {},
			loading: false,
			headers: [
				{ value: 'code', text: '单据编号' },
				{ value: 'vouchType', text: '单据类型' },
				{ value: 'vouchDate', text: '制单日期' },
				{ value: 'maker', text: '制单' },
				{ value: 'depCode', text: '部门' },
				{ value: 'cusCode', text: '客户' },
				{ value: 'verifier', text: '审核' },
				{ value: 'whCode', text: '仓库' },
				{ value: 'vendorId', text: '供应商' },
				{ value: 'refCode', text: '参照单据' },
				{ value: 'memo', text: '备注' },
			],
			data: []

		}
	},
	computed: mapGetters({
		accYear: 'accsuit/accYear',
		whCode: 'warehouse/whCode',
	}),
	mounted() {
		this.fetchData()
	},
	watch: {
		whCode: function () {
			this.fetchData();
		}
	},
	notifications: {
		showWarnMsg: {
			title: '提示信息',
			type: 'warn'
		}
	},
	methods: {
		handlePageChange(val) {
			this.pagination.page = val
			this.fetchData()
		},
		fetchData: function () {
			this.loading = true
			api.getVouchs(this.accYear, this.whCode, this.pagination)
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
