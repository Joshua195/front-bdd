import { api } from '../plugins/api'

export const state = () => ({
  payload: null,
  fetching: false,
  error: null,
  isSuccess: false
})

export const getters = {
  fetching: state => {
    return state.fetching
  },
  products: state => {
    return state.payload || []
  },
  isSuccess: state => {
    return state.isSuccess
  }
}

export const mutations = {
  setSuccess(state, status) {
    state.isSuccess = status
    state.fetching = false
    state.error = null
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
  registerUser({ commit }, payload) {
    return new Promise( async (resolve, reject) => {
      const response = await api.post('user', payload)
      if (response.ok) {
        commit('setSuccess', true)
        resolve()
      } else {
        commit('setSuccess', false)
        commit('error', response.problem)
        reject(response.problem)
      }
    })
  },
  setStatus({ commit }) {
    commit('setStatus', false)
  }
}
