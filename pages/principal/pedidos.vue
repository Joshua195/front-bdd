<template>
  <v-layout align-center justify-center>
    <v-flex md6>
      <div @click="clickHandler(0)">
        <v-card class="elevation-24 space">
          <v-card-text>
            <v-btn outline large fab color="indigo">
              <v-icon>view_list</v-icon>
            </v-btn>
            <span class="display-2 test">Realizar Pedido</span>
          </v-card-text>
        </v-card>
      </div>
      <div @click="clickHandler(1)">
        <v-card class="elevation-24 space">
          <v-card-text>
            <v-btn outline large fab color="indigo">
              <v-icon>local_offer</v-icon>
            </v-btn>
            <span class="display-2 test">Mi Historial</span>
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
            console.log('Realizar pedido')
            break
          case 1:
            console.log('Mi historial')
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
