<template>
    <v-card>
        <v-card-title primary-title>用户列表
            <v-spacer></v-spacer>
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
            item-key="uid"
            :pagination.sync="pagination"
            :total-items="pagination.totalItems"
            :loading="loading"
            :search="pagination.searchKey"
            no-data-text="没有数据 :("
            hide-actions
        >
            <v-progress-linear slot="progress" color="blue" indeterminate/>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.userName }}</td>
                <td>{{ props.item.fullName }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.depCode }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                    <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                </td>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pagination.pages" :total-visible="7"></v-pagination>
        </div>
        <!-- 编辑对话框 -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" fab dark color="indigo"><v-icon>add</v-icon></v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap="">

                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.userName" :readonly="!newItem" label="用户名"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.fullName" label="全称"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.email" label="电子邮件"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.depCode" label="部门"></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md4 v-if="newItem">
                                <v-text-field v-model="editedItem.password" type="password" label="密码"></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md4 v-if="newItem">
                                <v-text-field v-model="editedItem.confirmPassword" type="password" label="重复密码"></v-text-field>
                            </v-flex>

                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import api from '~/api/userapi'

export default {
    data() {
        return {
            pagination: {},
            loading: false,
            headers: [
                { value: 'userName', text: '用户名' },
                { value: 'fullName', text: '全名' },
                { value: 'email', text: '邮件地址' },
                { value: 'depCode', text: '部门' },
            ],
            data: [],
            editedItem: {},
            editedIndex:-1,
            dialog: false
        }
    },
    computed: {
        newItem(){
            return this.editedIndex===-1
        },
        formTitle() {
            return this.newItem ? '新建' : '编辑'
        }
    },
    watch: {
        pagination: function (oldval, newval) {
            if (newval.sortBy === oldval.sortBy && newval.descending === oldval.descending) {
                this.fetchData()
            }
        }
    },
    created(){
        this.fetchData()
    },
    methods: {
        handlePageChange(val) {
            this.options.page = val
            this.fetchData()
        },
        fetchData: function () {
           api.getUsers(this.pagination)
                .then(res => {
                    let data = res.data
                    this.data = data.values
                    api.mergePageination(this.pagination, data.page);
                })
        },
        editItem(item) {
            this.editedIndex = this.data.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        close() {
            //关闭对话框
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },
        deleteItem(item){
            if(!confirm('Are you sure you want to delete this item?')){
                return
            }
            api.remove(item).then(res=>{
                let index = this.data.indexOf(item)
                this.data.splice(index, 1)
            }).catch(err=>{
                console.log(err)
            })
        },
        save() {
            //提交编辑数据
            if (this.editedIndex > -1) {
                api.update(this.editedItem).then(res => {
                    Object.assign(this.data[this.editedIndex], this.editedItem)
                })
            } else {
                api.register(this.editedItem).then(res=>{
                    var user = res.data.user
                    this.data.push(user)
                })
                
            }
            this.close()
        }
    }
}
</script>

<style>
</style>
