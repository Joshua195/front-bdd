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
        <h1 class="marginInTemplate">Pedidos</h1>
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
        <template v-if="isItems">
          <v-card class="marginInTemplate test">
            <v-data-table
              :items="items"
              class="elevation-3"
              :hide-actions="true"
              :headers="itemHeaders"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.quantity }}</td>
                <td>{{ props.item.price }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="removeItem(props.item)">
                    <v-icon color="red">remove_circle</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
          <h2 class="total">Total: {{ total }}</h2>
          <template class="marginInTemplate">
            <v-btn block color="success" dark class="button test" @click="generateOrder()">Generar Orden</v-btn>
          </template>
        </template>
      </v-flex>
    </template>
    <template v-if="showOrders">
      <v-flex xs12 sm8 md12>
        <h1 class="marginInTemplate">Historial</h1>
        <v-card class="marginInTemplate elevation-12">
          <v-card-title>
            Pedidos
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchOrder"
              append-icon="search"
              label="Busqueda"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="ordersHeaders"
            :items="orders"
            class="elevation-3"
            :loading="fetching"
            :search="searchOrder"
            rows-per-page-text="Pedidos por pagina"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.number }}</td>
              <td class="text-xs-justify">{{ props.item.status }}</td>
              <td class="text-xs-justify">{{ props.item.deliveryTime | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>
              <td class="text-xs-justify">{{ props.item.products.length }}</td>
              <td class="text-xs-justify">{{ props.item.createdAt | moment("dddd, MMMM Do YYYY, h a") }}</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Tu busqueda para "{{ searchOrder }}" no encontró resultados.
            </v-alert>
            <template slot="pageText" slot-scope="props">
              Ordenes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </template>
    <template row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Orden Creada</v-card-title>
          <v-card-text>Tiempo de entrega apoximado: <span>{{ deliveryTime | moment("ddd, hA")}}</span></v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-layout>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import DataTableItems from '../../components/items'
  import moment from 'moment'

  export default {
    middleware: 'auth',
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
        itemHeaders: [
          { text: 'Nombre', align: 'left', sortable: false, value: 'name' },
          { text: 'Cantidad', value: 'price', sortable: false, align: 'left' },
          { text: 'Precio Unitario', value: 'description', sortable: false, align: 'left'  },
          { text: 'Aciones', value: 'name', sortable: false, align: 'center' }
        ],
        ordersHeaders: [
          { text: 'SERIE', align: 'left', sortable: false, value: 'number' },
          { text: 'Status', value: 'price', sortable: false, align: 'left' },
          { text: 'Hora de entrega', value: 'description', sortable: false, align: 'left'  },
          { text: 'Cantidad de productos', value: 'name', sortable: false, align: 'left' },
          { text: 'Creacion', value: 'name', sortable: false, align: 'left' }
        ],
        items: [],
        isItems: false,
        total: 0,
        dialog: false,
        deliveryTime: '',
        searchOrder: ''
      }
    },
    computed: {
      ...mapGetters({
        products: 'products/products',
        fetching: 'products/fetching',
        authUser: 'index/authUser',
        successOrder: 'order/successOrder',
        orders: 'order/orders'
      }),
    },
    methods: {
      ...mapActions({
        fetchProducts: 'products/fetchProducts',
        newOrder: 'order/newOrder',
        setSuccessOrder: 'order/setSuccessOrder',
        fetchOrders: 'order/fetchOrders'
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
        let index = this.items.findIndex(x => x._id === item._id)
        if (index !== -1) {
          this.items[index].quantity = this.items[index].quantity + 1
        } else {
          this.items.push({...item, quantity: 1})
          this.isItems = true
        }
      },
      removeItem(item) {
        let index = this.items.findIndex(x => x._id === item._id)
        if (this.items[index].quantity === 1) {
          this.items.splice(index, 1)
          this.isItems = false
        } else {
          this.items[index].quantity = this.items[index].quantity - 1
        }
      },
      async generateOrder() {
        this.isItems = false
        this.deliveryTime = moment().add(3, 'hours')
        const order = {
          products: this.items,
          deliveryTime: this.deliveryTime.valueOf(),
          idUser: this.$store.state.authUser._id,
          createdAt: moment().valueOf()
        }
        const status = await this.newOrder(order)
        if (status) {
          this.dialog = true
          setTimeout(() => {
            this.dialog = false
          }, 5000)
          this.items = []
        }
      }
    },
    mounted() {
      this.fetchProducts()
      this.fetchOrders({ _id: this.$store.state.authUser._id})
    },
    components: {
      DataTableItems
    },
    watch: {
      items: {
        handler() {
          this.total = 0
          this.items.forEach(v => {
            this.total = this.total + (v.quantity * v.price)
          })
        },
        deep: true
      }
    }
  }
</script>

<style>
  .marginInTemplate {
    margin-left: 50px;
  }

  .button {
    margin-left: 25px;
  }

  .test {
    margin-top: 50px;
  }
  .total {
    margin-top: 20px;
    margin-left: 50px;
  }
</style>
