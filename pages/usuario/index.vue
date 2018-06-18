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
                <v-text-field label="Nombre" v-model="objectUser.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Apellido Paterno" v-model="objectUser.firstName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Apellido Materno" v-model="objectUser.lastName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Usuario" v-model="objectUser.username"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Telefono" v-model="objectUser.telephone"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancel()">Cancelar</v-btn>
          <v-btn color="blue darken-30" flat @click.native="saveUser()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    middleware: 'auth',
    data: () => {
      return {
        user: {},
        dialog: false,
        objectUser: {}
      }
    },
    mounted() {
      this.user = JSON.parse(JSON.stringify(this.$store.state.authUser))
      this.objectUser = JSON.parse(JSON.stringify(this.$store.state.authUser))
    },
    methods: {
      ...mapActions({
        updateUser: 'user/updateUser'
      }),
      openModal() {
        this.dialog = true
      },
      saveUser() {
        this.updateUser(this.user)
          .then(() => {
            this.dialog = false
            $nuxt.$router.push('/login')
          })
      },
      cancel() {
        this.dialog = false
        this.objectUser = JSON.parse(JSON.stringify(this.$store.state.authUser))
      }
    }
  }
</script>
