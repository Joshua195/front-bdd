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
  coupons: state => {
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
  async fetchCoupons({commit}) {
    commit('fetching')
    const response = await api.get(`coupon`)
    if (response.ok) {
      commit('success', response.data)
    } else {
      commit('error', response.problem)
    }
  },
  async fetchCouponsEnable({commit}) {
    commit('fetching')
    const response = await api.get(`coupon/enable`)
    if (response.ok) {
      commit('success', response.data)
    } else {
      commit('error', response.problem)
    }
  },
  async newCoupon({ commit, dispatch }, payload) {
    const response = await api.post(`coupon`, payload)
    if (response.ok) {
      dispatch('fetchCoupons')
    } else {
      commit('error', response.problem)
    }
  },
  // check this method
  async updateCoupon({ commit, dispatch }, payload) {
    const { name, price, description, _id } = payload
    const response = await api.patch(`coupon/${_id}`, { name, price, description })
    if (response.ok) {
      dispatch('fetchCoupons')
    } else {
      commit('error', response.problem)
    }
  },
  async deleteCoupon({ commit, dispatch }, payload) {
    const { _id } = payload
    const response = await api.delete(`coupon/${_id}`)
    if (response.ok) {
      dispatch('fetchCoupons')
    } else {
      commit('error', response.problem)
    }
  }
}
