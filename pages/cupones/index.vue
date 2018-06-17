<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3">Cupones</h3>
              <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
              <v-divider class="my-3"></v-divider>
              <div class="title mb-3">Check out our newest features!</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    // middleware: 'auth',
    data: () => {
      return {
        user: 'user'
      }
    }
  }
</script>
