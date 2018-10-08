<template>
	<v-combobox
		v-model="whCode"
		:items="whCodes"
		item-value="whCode"
		item-text="whName"
		:label="label"
		filterable
		@change="handleChange"
	></v-combobox>
</template>

<script>
import api from '@/api/WarehouseApi'
export default {
	props: {
		value: {
			type: String,
			required: true,
			default: ''
		},
		// 账套年度
		year: {
			type: Number,
			required: true
		},
		label: { type: String, default: '选择仓库' }
	},
	data() {
		return {
			loading: true,
			whCode: this.value,
			whCodes: []
		}
	},
	created: function () {
		this.fetchData()
	},
	methods: {
		onOpen(state) {
			if (this.whCodes.length === 0) {
				fetchData()
			}
		},
		fetchData() {
			this.loading = true
			api.GetWhCodes(this.year)
				.then(res => {
					let data = res.data
					this.whCodes = data
					this.loading = false
				})
				.catch(err => {
					this.loading = false
					this.$Notice.warning({
						title: '数据加载异常',
						desc: `数据加载失败,${err.message}`
					})
				})
		},
		handleChange(value) {
			this.$emit('input', value.whCode)
			this.$emit('change', value.whCode)
		}
	}
}
</script>

<style scope>
.itemDesc {
	float: right;
	color: #ccc;
}
</style>
