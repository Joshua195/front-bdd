<template>
  <v-card class="marginInTemplate test">
    <v-data-table
      :items="products"
      class="elevation-3"
      :hide-actions="true"
      hide-headers
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-justify">{{ props.item.quantity }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    name: "items",
    props: {
      items: []
    },
    data: () => {
      return {
        products: this.items || []
      }
    }
  }
</script>

<style scoped>

</style>
