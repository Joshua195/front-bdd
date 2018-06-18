<template>
  <v-layout>
    <v-card>
      <v-container fluid grid-list-md transparent>
        <v-layout row wrap>
          <v-flex
            v-for="coupon in coupons"
            xs12
            :key="coupon._id"
          >
            <v-card class="my-3" hover>
              <v-card-media
                class="white--text"
                height="170px"
                :src="imageUrl">
                <v-container fill-height fluid>
                  <v-layout>
                    <v-flex xs12 align-end d-flex>
                      <span class="headline">{{ coupon.key }}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-text>
                {{ coupon.description }}
              </v-card-text>
              <v-card-actions>
                <v-btn icon class="red--text">
                  {{ coupon.quantity }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn flat class="blue--text" disabled="">Read More</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    // middleware: 'auth',
    data: () => {
      return {
        user: 'user',
        imageUrl: '/coupons.jpg'
      }
    },
    computed: {
      ...mapGetters({
        coupons: 'coupons/coupons'
      })
    },
    methods: {
      ...mapActions({
        fetchCouponsEnable: 'coupons/fetchCouponsEnable'
      })
    },
    mounted() {
      this.fetchCouponsEnable()
    }
  }
</script>
