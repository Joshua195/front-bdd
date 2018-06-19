import { api } from '../plugins/api'

export const state = () => ({
  users: null,
  fetching: false,
  error: null
})

export const getters = {
  fetching: state => {
    return state.fetching
  },
  users: state => {
    return state.users || []
  }
}

export const mutations = {
  fetching(state) {
    state.fetching = true
    state.error = null
    state.users = null
  },
  success(state, payload) {
    state.users = payload
    state.fetching = false
    state.error = null
  },
  error(state, error) {
    state.fetching = false
    state.error = error
    state.users = null
  }
}

export const actions = {
  success({ commit }, payload) {
    commit('success', payload)
  },
  error({ commit }, error = null) {
    commit('error', error)
  },
  async fetchUsers({commit}) {
    commit('fetching')
    const response = await api.get(`user`)
    if (response.ok) {
      commit('success', response.data)
    } else {
      commit('error', response.problem)
    }
  },
  async newUser({ commit, dispatch }, payload) {
    const response = await api.post(`user/admin`, payload)
    if (response.ok) {
      dispatch('fetchUsers')
    } else {
      commit('error', response.problem)
    }
  },
  async updateUser({ commit, dispatch }, payload) {
    const { _id, name, firstName, lastName, username, telephone } = payload
    const response = await api.patch(`user/${_id}`, { name, firstName, lastName, username, telephone })
    if (response.ok) {
      dispatch('fetchUsers')
    } else {
      commit('error', response.problem)
    }
  },
  async deleteUser({ commit, dispatch }, payload) {
    const { _id } = payload
    const response = await api.delete(`user/${_id}`)
    if (response.ok) {
      dispatch('fetchUsers')
    } else {
      commit('error', response.problem)
    }
  }
}
