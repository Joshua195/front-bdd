<template>
  <div>
    <v-card>
      <v-card-title>
        Pedidos
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
        :items="orders"
        class="elevation-3"
        :loading="fetching"
        :search="search"
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
          Tu busqueda para "{{ search }}" no encontró resultados.
        </v-alert>
        <template slot="pageText" slot-scope="props">
          Ordenes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    middleware: 'auth',
    layout (context) {
      return 'defaultAdmin'
    },
    data: () => ({
      search: '',
      dialog: false,
      confirmDialog: false,
      headers: [
        { text: 'SERIE', align: 'left', sortable: false, value: 'number' },
        { text: 'Status', value: 'price', sortable: false, align: 'left' },
        { text: 'Hora de entrega', value: 'description', sortable: false, align: 'left'  },
        { text: 'Cantidad de productos', value: 'name', sortable: false, align: 'left' },
        { text: 'Creacion', value: 'name', sortable: false, align: 'left' }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      deletedItem: {},
    }),

    computed: {
      ...mapGetters({
        orders: 'order/orders',
        fetching: 'order/fetching'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Materia Prima' : 'Edicion de Materia Prima'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    mounted () {
      this.fetchOrders()
    },

    methods: {
      ...mapActions({
        fetchOrders: 'order/fetchOrders',
        newMaterial: 'material/newMaterial',
        updateMaterial: 'material/updateMaterial',
        deleteMaterial: 'material/deleteMaterial',
      }),

      editItem (item) {
        this.editedIndex = this.material.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      _deleteItem (item) {
        this.deletedItem = item
        this.confirmDialog = true
      },

      deleteItem() {
        this.deleteMaterial(this.deletedItem)
        this.confirmDialog = false
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          this.updateMaterial(this.editedItem)
        } else {
          this.newMaterial(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
