<template>
	<v-card>
		<v-card-title primary-title>仓库信息
			<v-spacer></v-spacer>
			<v-select
				label="账套年份"
				v-model="year"
				:items="years"
				@change="fetchData"
			></v-select>
			<v-spacer/>
			<v-text-field
				v-model="options.searchKey"
				append-icon="search"
				label="Search"
				clearable
				@input="handlePageChange"
			></v-text-field>
		</v-card-title>
		<v-data-table
			:headers="headers"
			:items="data"
			item-key="cusCode"
			:pagination.sync="options"
			:total-items="options.total"
			:loading="loading"
			:search="search"
			no-data-text = "没有数据 :("
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
				v-model="options.page"
				:length="options.pages"
				:total-visible="7"
				@input="handlePageChange"
			></v-pagination>
		</div>
	</v-card>
</template>
<script>
import api from '@/api/customerApi'

export default {
	data() {
		return {
			years: [2016, 2017],
			year: 2016,
			options: api.pageOptions,
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
	mounted() {
		console.log('on customer.vue mounted')
		this.fetchData()
	},
	methods: {
		handlePageChange(val) {
			this.options.page = val
			this.fetchData()
		},
		fetchData: function () {
			this.loading = true
			api.getCustomers(this.year, this.options)
				.then(res => {
					let data = res.data
					this.data = data.values
					this.options.mergeResult(data.page)
					this.loading = false
				})
				.catch(err => {
					this.loading = false
					this.$Notice.warning({
						title: '提示',
						desc: `数据加载失败,${err.message}`
					})
				})
		}
	}
}
</script>
<style>
</style>
