<template>
	<div>
		<!--<v-combobox v-model="whCode" :items="whCodes" item-value="whCode" item-text="whName" :label="label" filterable @change="handleChange">
			</v-combobox> -->
		<v-autocomplete
			v-model="whCode"
			:items="whCodes"
			box
			:label="label"
			item-text="whName"
			item-value="whCode"
			@change="handleChange"
		>
			<template slot="item" slot-scope="data">
				<template>
					<v-list-tile-content>
						<v-list-tile-title>{{data.item.whName}}</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-list-tile-action-text>{{data.item.whCode}}</v-list-tile-action-text>
					</v-list-tile-action>
				</template>
			</template>
		</v-autocomplete>
		<div></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/WarehouseApi'
export default {
	props: {
		value: {
			type: String,
			required: true,
			default: ''
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
	computed: mapGetters({
		accYear: 'accsuit/accYear',
		depCode: 'user/depCode'
	}),
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
			api.GetWhCodes(this.accYear, this.depCode)
				.then(res => {
					let data = res.data
					this.whCodes = data
					this.loading = false
				})
				.catch(err => {
					this.loading = false
					this.commit('error',`数据加载失败,${err.message}`)
				})
		},
		handleChange(value) {
			this.$emit('input', value)
			this.$emit('change', value)
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
