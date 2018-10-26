<template>
	<v-autocomplete
		v-model="whCode"
		:items="whCodes"
		:label="label"
		item-text="whName"
		item-value="whCode"
		@change="handleChange"
	>
		<template slot="item" slot-scope="data">
			<template>
				<v-list-tile-action>
					<v-list-tile-action-text>{{data.item.whCode}}</v-list-tile-action-text>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>{{data.item.whName}}</v-list-tile-title>
				</v-list-tile-content>
			</template>
		</template>
	</v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/WarehouseApi'
export default {
	props: {
		label: { type: String, default: '选择仓库' }
	},
	data() {
		return {
			whCode: this.currentWhCode,
			whCodes: []
		}
	},
	computed: mapGetters({
		accYear: 'accsuit/accYear',
		depCode: 'user/depCode',
		currentWhCode:'warehouse/whCode'
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
			api.GetWhCodes(this.accYear, this.depCode)
				.then(res => {
					let data = res.data
					this.whCodes = data
				})
				.catch(err => {
					this.commit('error', `数据加载失败,${err.message}`)
				})
		},
		handleChange(val) {
			this.$store.commit('warehouse/setWhCode',val)
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
