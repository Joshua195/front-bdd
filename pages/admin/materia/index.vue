<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Agregar Materia Prima</v-btn>
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
                <v-text-field v-model="editedItem.unit" label="Unidad" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="editedItem.price" label="Precio" type="number"></v-text-field>
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
        Materia Prima
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
        :items="material"
        class="elevation-3"
        :loading="fetching"
        :search="search"
        rows-per-page-text="Material por pagina"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-justify">{{ props.item.price }}</td>
          <td class="text-xs-justify">{{ props.item.unit }}</td>
          <td class="justify-center layout px-0">
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
          Material {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
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
        { text: 'Nombre', align: 'left', sortable: false, value: 'name' },
        { text: 'Precio', value: 'price', sortable: true, align: 'left' },
        { text: 'Unidad', value: 'unit', align: 'left', sortable: false  },
        { text: 'Aciones', value: 'name', sortable: false, align: 'center' }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      deletedItem: {},
    }),

    computed: {
      ...mapGetters({
        material: 'material/material',
        fetching: 'material/fetching'
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
      this.fetchMaterial()
    },

    methods: {
      ...mapActions({
        fetchMaterial: 'material/fetchMaterial',
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
