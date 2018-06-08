<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout row justify-center>
      <v-dialog v-model="confirmDialog" persistent max-width="290">
        <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
        <v-card>
          <v-card-title class="headline">Warning</v-card-title>
          <v-card-text>Are you sure you want to delete this item?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="confirmDialog = false">Cancel</v-btn>
            <v-btn color="red darken-1" flat @click.native="deleteItem()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="_products"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="_deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      confirmDialog: false,
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Precio', value: 'price', sortable: true },
        { text: 'Descripcion', value: 'description' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      _products: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      deleteIndex: -1,
      deletedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
    }),

    computed: {
      ...mapGetters({
        products: 'products/products',
        fetching: 'products/fetching'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      products () {
        this._products = JSON.parse(JSON.stringify(this.products))
      }
    },

    created () {
      this.fetchProducts()
    },

    methods: {
      ...mapActions({
        fetchProducts: 'products/fetchProducts'
      }),

      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      _deleteItem (item) {
        this.deleteIndex = this.products.indexOf(item)
        this.confirmDialog = true
      },

      deleteItem() {
        this.products.splice(this.deleteIndex, 1)
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
          Object.assign(this.products[this.editedIndex], this.editedItem)
        } else {
          this.products.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
