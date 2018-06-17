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
    const response = await api.get(`product`)
    if (response.ok) {
      commit('success', response.data)
    } else {
      commit('error', response.problem)
    }
  },
  async newProduct({ commit, dispatch }, payload) {
    const response = await api.post(`product`, payload)
    if (response.ok) {
      dispatch('fetchProducts')
    } else {
      commit('error', response.problem)
    }
  },
  async updateProduct({ commit, dispatch }, payload) {
    const { name, price, description, _id } = payload
    const response = await api.patch(`product/${_id}`, { name, price, description })
    if (response.ok) {
      dispatch('fetchProducts')
    } else {
      commit('error', response.problem)
    }
  },
  async deleteProduct({ commit, dispatch }, payload) {
    const { _id } = payload
    const response = await api.delete(`product/${_id}`)
    if (response.ok) {
      dispatch('fetchProducts')
    } else {
      commit('error', response.problem)
    }
  }
}
