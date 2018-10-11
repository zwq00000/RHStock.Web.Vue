<!-- 年度库存总账 -->
<template>
	<v-card>
		<v-card-title primary-title>客户信息
			<v-spacer></v-spacer>
			<WhCodeSelector v-model="whCode" :year="year" @change="fetchData"/>
			<v-spacer/>
			<v-text-field
				v-model="options.searchKey"
				append-icon="search"
				label="Search"
				clearable
				@input="fetchData"
			></v-text-field>
		</v-card-title>
		<v-data-table
			:headers="header"
			:items="data"
			:pagination.sync="options"
			:total-items="options.total"
			:loading="loading"
			hide-actions
		>
			<v-progress-linear slot="progress" color="blue" indeterminate/>
			<template slot="items" slot-scope="props">
				<td>{{ props.item.whCode }}</td>
				<td class="text-xs-right">{{ props.item.invCode }}</td>
				<td class="text-xs-right">{{ props.item.summary }}</td>
				<td class="text-xs-right">{{ props.item.beginQuantity }}</td>
				<td class="text-xs-right">{{ props.item.incomeQuantity }}</td>
				<td class="text-xs-right">{{ props.item.sentOutQuantity }}</td>
				<td class="text-xs-right">{{ props.item.balanceQuantity }}</td>
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
//import { Table,Button,Dialog } from "element-ui";
import WhCodeSelector from '~/components/whCodeSelector'
import api from '~/api/TotalAccountApi'

export default {
	components: {
		WhCodeSelector
	},
	props: {
		// 账套年度
		year: { type: Number, require: true, default: 2016 }
	},
	data() {
		return {
			whCode: 'ZCK',
			options: api.pageOptions, //{ page: 1, pageSize: 20 },
			loading: true,
			header: [
				{ text: '仓库代码', value: 'whCode' },
				{ text: '存货代码', value: 'invCode' },
				{ text: '品名', value: 'summary' },
				{ text: '期初数量', value: 'beginQuantity' },
				{ text: '入库数量', value: 'incomeQuantity' },
				{ text: '出库数量', value: 'sentOutQuantity' },
				{ text: '结存数量', value: 'balanceQuantity' }
			],
			data: []
		}
	},
	computed: {
		accYear() {
			return this.$store.getters.accYear
		},
		exportCsvLink() {
			return api.getExportCsvLink(this.whCode, this.year)
		}
	},
	watch: {
		whCode() {
			this.fetchData()
		}
	},
	mounted() {
		console.log('on fullyear.vue mounted')
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
			console.log(`当前页: ${val}`)
			this.options.page = val
			this.fetchData()
		},
		handleDrpodown(item) {
			if (item === 'createAccount') {
				this.createFullYearAccount()
			}
		},
		/**
		 * 创建全年库存总账
		 */
		createFullYearAccount() {
			this.loading = true
			api.createFullYear(this.whCode, this.year).then(res => {
				this.fetchData()
				this.loading = false
			})
		},
		/**
		 * 导出数据
		 */
		exportData() {
			this.$refs.table.exportCsv({
				filename: `${this.whCode}${this.accYear} 年度库存总账`,
				original: false
			})
		},
		/**
		 * 加载 工件 数据
		 */
		fetchData: function () {
			this.loading = true
			api.getFullYear(this.whCode, this.accYear, this.options)
				.then(res => {
					let data = res.data
					this.data = data.values
					this.options.mergeResult(data.page)
					this.loading = false
				})
				.catch(err => {
					this.loading = false
					this.$showWarnMsg({
						message: `数据加载失败,${err.message}`
					})
				})
		}
	}
}
</script>

<style>
</style>
