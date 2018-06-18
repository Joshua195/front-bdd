import { api } from '../plugins/api'

export const state = () => ({
  items: null,
  fetching: false,
  error: null
})

export const getters = {
  fetching: state => {
    return state.fetching
  },
  items: state => {
    return state.items || []
  }
}

export const mutations = {
  fetching(state) {
    state.fetching = true
    state.error = null
    state.items = null
  },
  success(state, payload) {
    state.items = payload
    state.fetching = false
    state.error = null
  },
  error(state, error) {
    state.fetching = false
    state.error = error
    state.items = null
  },
  add(state, item) {
    state.fetching = false
    state.error = null
    state.items.push(item)
  }
}

export const actions = {
  success({ commit }, payload) {
    commit('success', payload)
  },
  error({ commit }, error = null) {
    commit('error', error)
  },
  addItem({ commit }, payload) {
    console.log('addItem store')
    commit('add', payload)
  }
}
