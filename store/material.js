import { api } from '../plugins/api'

export const state = () => ({
  material: null,
  fetching: false,
  error: null
})

export const getters = {
  fetching: state => {
    return state.fetching
  },
  material: state => {
    return state.material || []
  }
}

export const mutations = {
  fetching(state) {
    state.fetching = true
    state.error = null
    state.material = null
  },
  success(state, payload) {
    state.material = payload
    state.fetching = false
    state.error = null
  },
  error(state, error) {
    state.fetching = false
    state.error = error
    state.material = null
  }
}

export const actions = {
  success({ commit }, payload) {
    commit('success', payload)
  },
  error({ commit }, error = null) {
    commit('error', error)
  },
  async fetchMaterial({commit}) {
    commit('fetching')
    const response = await api.get(`material`)
    if (response.ok) {
      commit('success', response.data)
    } else {
      commit('error', response.problem)
    }
  },
  async newMaterial({ commit, dispatch }, payload) {
    const response = await api.post(`material`, payload)
    if (response.ok) {
      dispatch('fetchMaterial')
    } else {
      commit('error', response.problem)
    }
  },
  async updateMaterial({ commit, dispatch }, payload) {
    const { name, price, unit, _id, idUser } = payload
    const response = await api.patch(`material/${_id}`, { name, price, unit, idUser })
    if (response.ok) {
      dispatch('fetchMaterial')
    } else {
      commit('error', response.problem)
    }
  },
  async deleteMaterial({ commit, dispatch }, payload) {
    const { _id } = payload
    const response = await api.delete(`material/${_id}`)
    if (response.ok) {
      dispatch('fetchMaterial')
    } else {
      commit('error', response.problem)
    }
  }
}
