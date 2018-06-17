<template>
  <v-layout row>
    <v-flex xs12 sm6 md2>
      <div>
        <v-btn round color="info" v-bind:class="(makeOrder) ? 'elevation-24' : ''" dark large @click="showMakeOrder">Realizar Pedido &nbsp;&nbsp;&nbsp;</v-btn>
      </div>
      <div>
        <v-btn round color="info" v-bind:class="(showOrders) ? 'elevation-24' : ''" dark large @click="showOrdersHandler">Historial Pedidos</v-btn>
      </div>
    </v-flex>
    <template v-if="makeOrder">
      <v-flex xs12 sm8 md12>
        <v-card class="marginInTemplate elevation-12">
          <v-card-title>
            Productos
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Busqueda"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="products"
            class="elevation-3"
            :loading="fetching"
            :search="search"
            rows-per-page-text="Productos por pagina"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-justify">{{ props.item.price }}</td>
              <td class="text-xs-justify">{{ props.item.description }}</td>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="addItems(props.item)">
                  <v-icon color="blue">add_circle</v-icon>
                </v-btn>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Tu busqueda para "{{ search }}" no encontró resultados.
            </v-alert>
            <template slot="pageText" slot-scope="props">
              Productos {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
            </template>
            <p slot="rows-per-page-text">
              Productos por pagina
            </p>
          </v-data-table>
        </v-card>
        <DataTableItems :items="items"></DataTableItems>
      </v-flex>
    </template>
    <template v-if="showOrders">
      <v-flex xs12 sm8 md9>
        <v-jumbotron color="grey lighten-2">
          <v-container fill-height class="marginInTemplate">
            <v-layout align-center>
              <v-flex>
                <h3 class="display-3">Show Orders</h3>
                <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
                <v-divider class="my-3"></v-divider>
                <div class="title mb-3">Check out our newest features!</div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>
      </v-flex>
    </template>
  </v-layout>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import DataTableItems from '../../components/items'

  export default {
    // middleware: 'auth',
    data() {
      return {
        makeOrder: true,
        showOrders: false,
        search: '',
        headers: [
          { text: 'Nombre', align: 'left', sortable: true, value: 'name' },
          { text: 'Precio', value: 'price', sortable: true, align: 'left' },
          { text: 'Descripcion', value: 'description', sortable: false, align: 'left'  },
          { text: 'Aciones', value: 'name', sortable: false, align: 'center' }
        ],
        items: []
      }
    },
    computed: {
      ...mapGetters({
        products: 'products/products',
        fetching: 'products/fetching'
      })
    },
    methods: {
      ...mapActions({
        fetchProducts: 'products/fetchProducts',
      }),
      showMakeOrder() {
        this.showOrders = false
        this.makeOrder = !this.makeOrder
      },
      showOrdersHandler() {
        this.makeOrder = false
        this.showOrders = !this.showOrders
      },
      addItems(item) {
        console.log(item)
        let index = this.items.findIndex(x => x.item._id === item._id)
        if (index !== -1) {
          this.items[index].quantity = this.items[index].quantity + 1
        } else {
          this.items.push({...item, quantity: 1})
        }
      }
    },
    mounted() {
      this.fetchProducts()
    },
    components: {
      DataTableItems
    }
  }
</script>

<style>
  .marginInTemplate {
    margin-left: 50px;
  }

  .test {
    margin-top: 50px;
  }
</style>
