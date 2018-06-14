<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Producto</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.price" label="Precio" type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="editedItem.description" label="Descripcion" multi-line></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout row justify-center>
      <v-dialog v-model="confirmDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Aviso</v-card-title>
          <v-card-text>Seguro que quieres eliminar este artículo?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="confirmDialog = false">Cancelar</v-btn>
            <v-btn color="red darken-1" flat @click.native="deleteItem()">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-card>
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
          <td>{{ props.item.id }}</td>
          <td class="text-xs-justify">{{ props.item.firstName }}</td>
          <td class="text-xs-justify">{{ props.item.lastName }}</td>
          <td class="text-xs-justify">{{ props.item.email }}</td>
          <td class="text-xs-justify">{{ props.item.mobile }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="_deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-info slot="no-results" :value="true" color="error" icon="warning">
          Tu busqueda para "{{ search }}" no encontró resultados.
        </v-info>
        <template slot="pageText" slot-scope="props">
          Productos {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
        <p slot="rows-per-page-text">
          Productos por pagina
        </p>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data: () => ({
      search: '',
      dialog: false,
      confirmDialog: false,
      headers: [
        { text: 'ID', align: 'left', sortable: true, value: 'id' },
        { text: 'firstName', value: 'firstName', sortable: true, align: 'left' },
        { text: 'lastName', value: 'lastName', align: 'left'  },
        { text: 'email', value: 'email', sortable: false, align: 'center' },
        { text: 'mobile', value: 'mobile', sortable: false, align: 'center' }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      deletedItem: {},
    }),

    computed: {
      ...mapGetters({
        products: 'employee/products',
        fetching: 'employee/fetching'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Producto' : 'Edicion Producto'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    mounted () {
      this.fetchProducts()
    },

    methods: {
      ...mapActions({
        fetchProducts: 'employee/fetchProducts',
        newProduct: 'employee/newProduct',
        updateProduct: 'employee/updateProduct',
        deleteProduct: 'employee/deleteProduct',
      }),

      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      _deleteItem (item) {
        this.deletedItem = item
        this.confirmDialog = true
      },

      deleteItem() {
        this.deleteProduct(this.deletedItem)
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
          this.updateProduct(this.editedItem)
        } else {
          this.newProduct(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
