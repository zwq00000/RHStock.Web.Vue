<!-- 导航列表 -->
<template>
    <v-list dense>
        <template v-for="item in groupItems">
            <v-layout v-if="item.heading" :key="item.heading" row align-center>
                <v-flex xs6>
                    <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
                </v-flex>
            </v-layout>
            <v-list-group
                v-else-if="item.children"
                v-model="item.model"
                :key="item.text"
                :prepend-icon="item.model ? item.icon : item['icon-alt']"
                append-icon
            >
                <v-list-tile slot="activator" :to="item.to">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="(child, i) in item.children" :to="item.to" :key="i">
                    <v-list-tile-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :to="item.to" :key="item.text">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
export default {
    data() {
        return {
            groupItems: [
                {
                    icon: 'library_books', 'icon-alt': 'keyboard_arrow_down',
                    text: '库存总账',
                    model: true,
                    children: [
                        { icon: 'library_books', text: '2016 年', to: '/account/total/2016' },
                        { icon: 'library_books', text: '2017 年', to: '/account/total/2017' }
                    ]
                },
                {
                    icon: 'keyboard_arrow_up',
                    'icon-alt': 'keyboard_arrow_down',
                    text: 'More',
                    model: false,
                    children: [
                        { icon: 'settings', text: 'Import' },
                        { icon: 'settings', text: 'Export' },
                        { icon: 'settings', text: 'Print' },
                        { icon: 'settings', text: 'Undo changes' },
                        { icon: 'settings', text: 'Other contacts' }
                    ]
                },
                { icon: 'settings', text: 'Settings' },
                { icon: 'chat_bubble', text: 'Send feedback' },
                { icon: 'help', text: 'Help' },
                { icon: 'phonelink', text: 'App downloads' },
                { icon: 'keyboard', text: 'Go to the old version' }
            ]
        }
    }
}
</script>

<style>
</style>
