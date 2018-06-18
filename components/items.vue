<template>
  <div>
    <v-card class="marginInTemplate test">
      <v-data-table
        :items="items"
        class="elevation-3"
        :hide-actions="true"
        :headers="headers"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.quantity }}</td>
          <td>{{ props.item.price }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="addItems(props.item)">
              <v-icon color="red">remove_circle</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <h2 class="total">Total: {{ total }}</h2>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: "items",
    data: () => {
      return {
        test: 'i putos',
        headers: [
          { text: 'Nombre', align: 'left', sortable: false, value: 'name' },
          { text: 'Cantidad', value: 'price', sortable: false, align: 'left' },
          { text: 'Precio Unitario', value: 'description', sortable: false, align: 'left'  },
          { text: 'Aciones', value: 'name', sortable: false, align: 'center' }
        ],
        total: 0.0
      }
    },
    // watch: {
    //   items: {
    //     handler() {
    //       this.total = 0
    //       this.items.forEach(v => {
    //         this.total = this.total + (v.quantity * v.price)
    //       })
    //     },
    //     deep: true
    //   }
    // },
    mounted() {
      this.items.forEach(v => {
        this.total = this.total + (v.quantity * v.price)
      })
    },
    methods: {

    },
    computed: {
      ...mapGetters({
        items: 'item/items'
      })
    }
  }
</script>

<style scoped>
  .total {
    margin-top: 20px;
    margin-left: 50px;
  }
</style>
