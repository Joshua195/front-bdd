<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <div @click="handlerClick()">
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon v-html="`power_settings_new`"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="`Cerrar Sesión`"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>

      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Bienvenido', to: '/' },
          { icon: 'list', title: 'Pedidos', to: '/pedidos' },
          { icon: 'label', title: 'Cupones', to: '/cupones'},
          { icon: 'person_pin', title: 'Mis Datos', to: '/usuario'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'SnackNOW'
      }
    },
    methods: {
      async handlerClick() {
        try {
          await this.$store.dispatch('logout')
          $nuxt.$router.push('/login')
        } catch (e) {
          this.formError = e.message
        }
      }
    }
  }
</script>
