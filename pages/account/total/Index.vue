<template>
  <div>
    <!-- <Form inline :label-width="80">
            <FormItem label="选择仓库:">
                <WhCodeSelector v-model="whCode" />
            </FormItem>
            <FormItem label="选择月份">
                <DatePicker v-model="accMonth" type="month" placeholder="选择月份"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="success" icon="el-icon-refresh" v-on:click="fetchData()">刷新</Button>
            </FormItem>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data"></Table>
        <Page @on-change="handleCurrentChange" :current-page="page.page" :page-size="page.pageSize" :total="page.total"></Page>
        -->
  </div>
</template>

<script>
//import { Table,Button,Dialog } from "element-ui";
import WhCodeSelector from '~/components/WhCodeSelector'
import api from '~/api/TotalAccountApi'

export default {
	components: {
		WhCodeSelector
	},
	props: {
		//账套年度
		year: { type: Number, require: true, default: 2016 }
	},
	data() {
		return {
			whCode: 'ZCK',
			accMonth: '',
			page: api.pageOptions, //{ page: 1, pageSize: 20 },
			loading: true,
			columns: [
				{ key: 'whCode', title: '仓库代码' },
				{ key: 'invCode', title: '存货代码' },
				{ key: 'summary', title: '说明' },
				{ key: 'beginQuantity', title: '期初数量' },
				{ key: 'incomeQuantity', title: '入库数量' },
				{ key: 'sentOutQuantity', title: '出库数量' },
				{ key: 'balanceQuantity', title: '结存数量' }
			],
			data: []
		}
	},
	computed: {
		month() {
			if (!this.accMonth) {
				return 1
			}
			return this.accMonth.getMonth()
		}
	},
	created() {
		this.accMonth = new Date(this.year, 1, 1)
		this.fetchData()
	},
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
			this.page.page = val
			this.fetchData()
		},

		/**
		 * 加载 工件 数据
		 */
		fetchData: function() {
			this.loading = true
			api.getTotalAccounts(
				this.whCode,
				this.year,
				this.accMonth.getMonth() + 1,
				this.page
			)
				.then(res => {
					let data = res.data
					this.data = data.values
					this.page = data.page
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
