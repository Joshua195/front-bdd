<template>
  <v-layout justify-center>
    <v-flex>
      <v-card class="elevation-24">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form v-if="!$store.state.authUser" @submit.prevent="login">
            <p class="error" v-if="formError">{{ formError }}</p>
            <v-text-field prepend-icon="person" name="username" label="Login" type="text" v-model="formUsername"></v-text-field>
            <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="formPassword"></v-text-field>
            <button type="submit">Login</button>
          </v-form>
          <div v-else>
            <pre>Usuario logeado</pre>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary" to="/inspire">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    layout (contex) {
      return 'withoutNavigation'
    },
    name: "login",
    data() {
      return {
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    },
    methods: {
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
