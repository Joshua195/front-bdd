<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Agregar Cupon</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="editedItem.key" label="Clave"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="editedItem.quantity" label="Cantidad" type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field v-model="editedItem.description" label="Descripcion" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
                  :items="[true, false]"
                  label="Status"
                  v-model="editedItem.isEnable"
                ></v-select>
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
          <v-card-text>Seguro que quieres eliminar este cupon?</v-card-text>
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
        Cupones
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
        :items="coupons"
        class="elevation-3"
        :loading="fetching"
        :search="search"
        rows-per-page-text="Cupones por pagina"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.key }}</td>
          <td class="text-xs-justify">{{ props.item.description }}</td>
          <td class="text-xs-justify">{{ props.item.quantity }}</td>
          <td class="text-xs-justify">{{ props.item.isEnable }}</td>
          <td>
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="_deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" type="error" icon="warning">
          Tu busqueda para "{{ search }}" no encontró resultados.
        </v-alert>
        <template slot="pageText" slot-scope="props">
          Cupones {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
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
        { text: 'Clave', align: 'left', sortable: false, value: 'name' },
        { text: 'Descripcion', value: 'price', sortable: true, align: 'left' },
        { text: 'Cantidad', value: 'unit', align: 'left', sortable: false  },
        { text: 'Activo', align: 'left', sortable: false, value: 'isEnable'  },
        { text: 'Aciones', value: 'name', sortable: false, align: 'center' }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      deletedItem: {},
      status: true
    }),

    computed: {
      ...mapGetters({
        coupons: 'coupons/coupons',
        fetching: 'coupons/fetching'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Cupon' : 'Edicion de Cupon'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    mounted () {
      this.fetchCoupons()
    },

    methods: {
      ...mapActions({
        fetchCoupons: 'coupons/fetchCoupons',
        newCoupon: 'coupons/newCoupon',
        updateCoupon: 'coupons/updateCoupon',
        deleteCoupon: 'coupons/deleteCoupon',
      }),

      editItem (item) {
        this.editedIndex = this.coupons.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      _deleteItem (item) {
        this.deletedItem = item
        this.confirmDialog = true
      },

      deleteItem() {
        this.deleteCoupon(this.deletedItem)
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
          this.updateCoupon(this.editedItem)
        } else {
          this.newCoupon(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
