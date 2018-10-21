<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
      <nav-list/>
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
      <v-spacer/>
      <wh-code-selector/>
      <v-spacer/>
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
      <my-footer/>
    </v-footer>
  </v-app>
</template>

<script>
import myFooter from './my_footer'
import navList from './nav_list'
import userInfo from "~/components/UserInfo"
import WhCodeSelector from '~/components/whCodeSelector'

export default {
  components: {
    userInfo,
    myFooter,
    navList,
    WhCodeSelector
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '大港胶管 库存管理'
    }
  },
  metthods: {
    action: function (params) {
      console.log(params);
    }
  }
}
</script>
