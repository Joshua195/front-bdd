import { api } from '../plugins/api'

export const state = () => ({
  orders: null,
  fetching: false,
  error: null,
  successOrder: false
})

export const getters = {
  fetching: state => {
    return state.fetching
  },
  orders: state => {
    return state.orders || []
  },
  successOrder: state => {
    return state.successOrder
  }
}

export const mutations = {
  fetching(state) {
    state.fetching = true
    state.error = null
    state.orders = null
    state.successOrder = false
  },
  success(state, payload) {
    state.orders = payload
    state.fetching = false
    state.error = null
    state.successOrder = false
  },
  error(state, error) {
    state.fetching = false
    state.error = error
    state.orders = null
    state.successOrder = false
  },
  statusOrder(state, status) {
    state.fetching = false
    state.error = null
    state.orders = null
    state.successOrder = status
  }
}

export const actions = {
  success({ commit }, payload) {
    commit('success', payload)
  },
  error({ commit }, error = null) {
    commit('error', error)
  },
  async fetchOrders({commit}, payload) {
    const { _id } = payload
    commit('fetching')
    const response = await api.get(`order/${_id}`)
    if (response.ok) {
      commit('success', response.data)
    } else {
      commit('error', response.problem)
    }
  },
  async newOrder({ commit, dispatch }, payload) {
    return new Promise( async (resolve) => {
      const response = await api.post(`order`, payload)
      if (response.ok) {
        dispatch('fetchOrders', { _id: payload.idUser })
        resolve(true)
      } else {
        resolve(false)
      }
    })
  },
  setSuccessOrder({ commit  }, status) {
    commit('statusOrder', true)
  }
}
