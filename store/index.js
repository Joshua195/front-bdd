import { api } from '../plugins/api'

export const state = () => ({
  authUser: null
})

export const getters = {
  authUser: state => {
    return state.authUser
  }
}

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  login({ commit }, { username, password }) {
    return new Promise(async (resolve, reject) => {
      const response = await api.post('user/login', { username, password })
      if (response.ok) {
        commit('SET_USER', response.data)
        resolve()
      } else {
        reject(response.data)
      }
    })
  },

  async logout({ commit }) {
    await api.post('logout')
    commit('SET_USER', null)
  }
}
