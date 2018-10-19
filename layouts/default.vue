<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
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
      <nav-list />

    </v-navigation-drawer>
    <!-- 工具栏 -->
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer></v-spacer>
      <userInfo flat/>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <my-footer />
    </v-footer>
  </v-app>
</template>

<script>
import myFooter from './my_footer'
import navList from './nav_list'
import userInfo from "~/components/UserInfo"

export default {
  components: {
    userInfo,
    myFooter,
    navList
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '大港胶管 库存管理',
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
        },{
          icon: 'library_books',
          title: '单据列表',
          to: '/vouch'
        }, {
          icon: 'peoples',
          title: '用户',
          to: '/user/index'
        },
        { icon: 'help', title: '帮助', to: '/help'},
        { icon: 'settings', title: '设置', to:'/settings' },
      ],
    }
  },
  metthods: {
    action: function (params) {
      console.log(params);
    }
  }
}
</script>
