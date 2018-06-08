import { api } from '../plugins/api'

export const state = () => ({
  payload: null,
  fetching: false,
  error: null
})

export const getters = {
  fetching: state => {
    return state.fetching
  },
  products: state => {
    return state.payload || []
  }
}

export const mutations = {
  fetching(state) {
    state.fetching = true
    state.error = null
    state.payload = null
  },
  success(state, payload) {
    state.payload = payload
    state.fetching = false
    state.error = null
  },
  error(state, error) {
    state.fetching = false
    state.error = error
    state.payload = null
  }
}

export const actions = {
  success({ commit }, payload) {
    commit('success', payload)
  },
  error({ commit }, error = null) {
    commit('error', error)
  },
  async fetchProducts({commit}) {
    commit('fetching')
    setTimeout(() => {
      commit('success', products)
    }, 2000)
    // const response = api.get(`products`)
    // if (response.ok) {
    //   commit('success', response.data)
    // } else {
    //   commit('error', error.problem)
    // }
  }
}

const products = [
  {
    name: 'Frozen Yogurt',
    price: 23.56,
    description: 'Frozen yogurt description'
  },
  {
    name: 'Ice cream sandwich',
    price: 123,
    description: 'Ice screen sandwich description',
  },
  {
    name: 'Eclair',
    price: 262,
    description: 'eclair description'
  },
  {
    name: 'Cupcake',
    price: 305,
    description: 'cupcake description',
  },
  {
    name: 'Gingerbread',
    price: 356,
    description: 'gingerbread description',
  },
  {
    name: 'Jelly bean',
    price: 375,
    description: 'jelly bean description',
  },
  {
    name: 'Lollipop',
    price: 392,
    description: 'lollipop description',
  },
  {
    name: 'Honeycomb',
    price: 408,
    description: 'honeycomb description',
  },
  {
    name: 'Donut',
    price: 452,
    description: 'donut description',
  },
  {
    name: 'KitKat',
    price: 518,
    description: 'kit kat description'
  }
]
