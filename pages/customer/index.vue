<template>
	<v-card>
		<v-card-title primary-title>客户信息
			<v-spacer></v-spacer>
			<v-text-field
				v-model="pagination.searchKey"
				append-icon="search"
				label="查找..."
				clearable
				@input="fetchData"
			></v-text-field>
		</v-card-title>
		<v-data-table
			:headers="headers"
			:items="data"
			item-key="cusCode"
			:pagination.sync="pagination"
			:total-items="pagination.totalItems"
			:loading="loading"
			no-data-text="没有数据 :("
			hide-actions
		>
			<v-progress-linear slot="progress" color="blue" indeterminate/>
			<template slot="items" slot-scope="props">
				<td>{{ props.item.cusCode }}</td>
				<td>{{ props.item.cusName }}</td>
				<td>{{ props.item.summary }}</td>
				<td>{{ props.item.abbName }}</td>
				<td>{{ props.item.address }}</td>
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
import pages from '@/api/pages'
import api from '@/api/customerApi'

export default {
	data() {
		return {
			pagination: {},
			loading: false,
			headers: [
				{ value: 'cusCode', text: '客户代码' },
				{ value: 'cusName', text: '客户名称' },
				{ value: 'summary', text: '摘要' },
				{ value: 'abbName', text: '简称' },
				{ value: 'address', text: '地址' }
			],
			data: []
		}
	},
	computed: mapGetters({
		accYear: 'accsuit/accYear'
	}),
	mounted() {
		console.log('on customer.vue mounted')
		this.fetchData()
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
			api.getCustomers(this.accYear, this.pagination)
				.then(res => {
					let data = res.data
					this.data = data.values
					//this.sort.rowsPerPage = data.page.pageSize
					pages.mergePageination(this.pagination,data.page)
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
