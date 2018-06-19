<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Usuario</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm4>
                <v-text-field
                  label="Nombre"
                  v-model="editedItem.name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field
                  label="Apellido paterno"
                  v-model="editedItem.firstName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field
                  label="Apellido materno"
                  v-model="editedItem.lastName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  mask="phone"
                  label="Telefono"
                  v-model="editedItem.telephone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Nombre de usuario"
                  v-model="editedItem.username"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 v-if="editedIndex === -1">
                <v-text-field
                  label="Contraseña"
                  v-model="editedItem.password"
                  type="password"
                ></v-text-field>
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
          <v-card-text>Seguro que quieres eliminar este usuario?</v-card-text>
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
        Usuarios
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="fetching"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-justify">{{ props.item.name }}</td>
          <td class="text-xs-justify">{{ props.item.firstName }}</td>
          <td class="text-xs-justify">{{ props.item.lastName }}</td>
          <td class="text-xs-justify">{{ props.item.telephone }}</td>
          <td class="text-xs-justify">{{ props.item.username }}</td>
          <td class="text-xs-justify">{{ props.item.isAdmin }}</td>
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
        { text: 'Nombre', value: 'name', sortable: false, align: 'left' },
        { text: 'Apellido paterno', value: 'firstName', sortable: false, align: 'left' },
        { text: 'Apellido Materno', value: 'lastName', sortable: false, align: 'left'  },
        { text: 'Telefono', value: 'telephone', sortable: false, align: 'left'  },
        { text: 'username', value: 'username', sortable: false, align: 'left'  },
        { text: 'Administrador', value: 'isAdmin', sortable: false, align: 'left'  },
        { text: 'Actions', sortable: false,  align: 'center' }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      deletedItem: {},
    }),

    computed: {
      ...mapGetters({
        users: 'adminUsers/users',
        fetching: 'adminUsers/fetching'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Edicion Usuario'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    mounted () {
      this.fetchUsers()
    },

    methods: {
      ...mapActions({
        fetchUsers: 'adminUsers/fetchUsers',
        newUser: 'adminUsers/newUser',
        updateUser: 'adminUsers/updateUser',
        deleteUser: 'adminUsers/deleteUser',
      }),

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      _deleteItem (item) {
        this.deletedItem = item
        this.confirmDialog = true
      },

      deleteItem() {
        this.deleteUser(this.deletedItem)
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
          this.updateUser(this.editedItem)
        } else {
          this.newUser(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
