<template>
  <v-app dark>
    <v-content>
      <v-container fluid fill-height>
          <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),
  }
</script>
