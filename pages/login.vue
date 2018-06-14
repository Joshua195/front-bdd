<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-24">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Inicio de sesion</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-alert :value="formError" type="error">
            {{formError}}
          </v-alert>
          <v-alert :value="isSuccess" type="success">
            Registro completo, por favor inicie sesion
          </v-alert>
          <v-form @submit.prevent="login">
            <v-text-field prepend-icon="person" name="username" label="Usuario" type="text" v-model="formUsername"></v-text-field>
            <v-text-field id="password" prepend-icon="lock" name="password" label="Contraseña" type="password" v-model="formPassword"></v-text-field>
            <v-card-actions>
              <v-btn v-if="!isSuccess" color="primary" to="/register">Registro</v-btn>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    layout (contex) {
      return 'centered'
    },
    name: "login",
    data() {
      return {
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    },
    computed: {
      ...mapGetters({
        isSuccess: 'user/isSuccess'
      })
    },
    watch: {
      isSuccess() {
        if (this.isSuccess) {
          setTimeout(() => {
            this.setSuccess()
          }, 3000)
        }
      }
    },
    methods: {
      ...mapActions({
        setSuccess: 'user/setSuccess'
      }),
      async login() {
        try {
          await this.$store.dispatch('login', {
            username: this.formUsername,
            password: this.formPassword
          })
          this.formUsername = ''
          this.formPassword = ''
          this.formError = null
          $nuxt.$router.push('/products')
        } catch (e) {
          this.formError = e.message
        }
      },
      async logout() {
        try {
          await this.$store.dispatch('logout')
        } catch (e) {
          this.formError = e.message
        }
      }
    }
  }
</script>

<style scoped>

</style>
