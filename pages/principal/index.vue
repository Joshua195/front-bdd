<template>
  <v-layout align-center justify-center>
    <v-flex md6>
      <div @click="clickHandler(0)">
        <v-card class="elevation-24 space">
          <v-card-text>
            <v-btn outline large fab color="indigo">
              <v-icon>view_list</v-icon>
            </v-btn>
            <span class="display-2 test">Productos</span>
          </v-card-text>
        </v-card>
      </div>
      <div @click="clickHandler(1)">
        <v-card class="elevation-24 space">
          <v-card-text>
            <v-btn outline large fab color="indigo">
              <v-icon>local_offer</v-icon>
            </v-btn>
            <span class="display-2 test">Cupones</span>
          </v-card-text>
        </v-card>
      </div>
      <div @click="clickHandler(2)">
        <v-card class="elevation-24 space">
          <v-card-text>
            <v-btn outline large fab color="indigo">
              <v-icon>data_usage</v-icon>
            </v-btn>
            <span class="display-2 test">Mis Datos</span>
          </v-card-text>
        </v-card>
      </div>
      <div @click="clickHandler(3)">
        <v-card class="elevation-24 space">
          <v-card-text>
            <v-btn outline large fab color="indigo">
              <v-icon>accessibility_new</v-icon>
            </v-btn>
            <span class="display-2 test">Nosotros</span>
          </v-card-text>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    layout (contex) {
      return 'defaultCenter'
    },
    name: "index",
    methods: {
      clickHandler(index) {
        switch (index) {
          case 0:
            console.log('Productos')
            $nuxt.$router.push('/principal/pedidos')
            break
          case 1:
            console.log('Cupones')
            break
          case 2:
            console.log('Mis Datos')
            break
          case 3:
            console.log('Nosotros')
            break
        }
      }
    }
  }
</script>

<style scoped>
  .space {
    margin-bottom: 20px;
  }
  .test {
    display: block;
    float: right;
    margin: 10px 10px 0 0;
    padding: 5px 10px;
  }
</style>
