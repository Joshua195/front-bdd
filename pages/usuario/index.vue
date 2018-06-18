<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <v-avatar size="200px">
          <img
            class="img-circle elevation-7 mb-1"
            src="/user.png"
          >
        </v-avatar>
        <div class="headline">{{ user.name }} <span style="font-weight:bold">{{ user.firstName }}</span></div>
        <div class="subheading text-xs-center grey--text pt-1 pb-3">Telefono: {{ user.telephone }}</div>
        <div class="subheading text-xs-center grey--text pt-1 pb-3">Nombre de usuario: {{ user.username }}</div>
        <div class="subheading text-xs-center grey--text pt-1 pb-3">
          <v-btn block @click="openModal()">Modificar datos</v-btn>
        </div>
      </div>
    </v-flex>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Perfil de Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nombre" v-model="user.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    // middleware: 'auth',
    data: () => {
      return {
        user: {},
        dialog: false
      }
    },
    mounted() {
      this.user = this.$store.state.authUser
    },
    methods: {
      openModal() {
        this.dialog = true
      }
    }
  }
</script>
