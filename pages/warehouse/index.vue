<template>
	<v-card>
		<v-card-title primary-title>仓库信息
			<v-spacer/>
			<v-text-field
				v-model="pagination.searchKey"
				append-icon="search"
				label="Search"
				clearable
				@input="handlePageChange"
			></v-text-field>
		</v-card-title>
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
import api from '@/api/WarehouseApi'

export default {
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
		accYear: 'accsuit/accYear'
	}),
	mounted() {
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
			api.GetWarehouses(this.accYear, this.pagination)
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
