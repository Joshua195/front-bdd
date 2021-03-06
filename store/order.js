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
  async fetchOrdersById({commit}, payload) {
    const { _id } = payload
    commit('fetching')
    const response = await api.get(`order/${_id}`)
    if (response.ok) {
      commit('success', response.data)
    } else {
      commit('error', response.problem)
    }
  },
  async fetchOrders({commit}) {
    commit('fetching')
    const response = await api.get(`order`)
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
        dispatch('fetchOrdersById', { _id: payload.idUser })
        resolve(true)
      } else {
        resolve(false)
      }
    })
  },
  async updateOrder({ commit, dispatch }, payload) {
    const { name, price, description, _id } = payload
    const response = await api.patch(`order/${_id}`, { name, price, description })
    if (response.ok) {
      dispatch('fetchProducts')
    } else {
      commit('error', response.problem)
    }
  },
  async deleteOrder({ commit, dispatch }, payload) {
    const { _id } = payload
    const response = await api.delete(`order/${_id}`)
    if (response.ok) {
      dispatch('fetchProducts')
    } else {
      commit('error', response.problem)
    }
  },
  setSuccessOrder({ commit  }, status) {
    commit('statusOrder', true)
  }
}
