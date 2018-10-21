<!-- 导航菜单 -->
<template>
  <v-list>
    <v-list-tile v-for="(item, i) in items" :to="item.to" :key="i" router exact>
      <v-list-tile-action>
        <v-icon v-html="item.icon"/>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.title"/>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        {
          icon: 'library_books',
          title: '库存总账',
          to: '/account/total'
        }, {
          icon: "people",
          title: '客户信息',
          to: '/customer'
        }, {
          icon: 'people',
          title: '仓库信息',
          to: '/warehouse'
        }, {
          icon: 'library_books',
          title: '单据列表',
          to: '/vouch'
        }, {
          icon: 'peoples',
          title: '用户',
          to: '/user/index'
        },
        { icon: 'help', title: '帮助', to: '/help' },
        { icon: 'settings', title: '设置', to: '/settings' },
      ],
    }
  }

}
</script>

<style>
</style>
