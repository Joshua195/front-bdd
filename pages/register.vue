<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-24">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Registro</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-alert :value="showInfo" type="success">
            Registro completo, por favor inicie sesion
          </v-alert>
          <v-form @submit.prevent="register">
            <v-text-field prepend-icon="person" name="name" label="Nombre" type="text" v-model="name"></v-text-field>
            <v-text-field prepend-icon="person" name="firstName" label="Apellido paterno" type="text" v-model="firstName"></v-text-field>
            <v-text-field prepend-icon="person" name="lastName" label="Apellido materno" type="text" v-model="lastName"></v-text-field>
            <v-text-field prepend-icon="local_phone" name="tel" label="Telefono" type="text" v-model="tel"></v-text-field>
            <v-text-field prepend-icon="account_circle" name="username" label="Usuario" type="text" v-model="username"></v-text-field>
            <v-text-field id="password" prepend-icon="lock" name="password" label="Contraseña" type="password" v-model="password"></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary">Registrarme</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    layout (contex) {
      return 'centered'
    },
    name: "register",
    data: () => {
      return {
        name: '',
        firstName: '',
        lastName: '',
        tel: '',
        username: '',
        password: '',
        showInfo: false
      }
    },
    methods: {
      ...mapActions({
        registerUser: 'user/registerUser'
      }),
      register() {
        this.registerUser({
          name: this.name,
          firstName: this.firstName,
          lastName: this.lastName,
          tel: this.tel,
          username: this.username,
          password: this.password,
        })
          .then(() => {
            $nuxt.$router.push('/login')
          })
      }
    }
  }
</script>

<style scoped>

</style>
