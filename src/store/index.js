import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存储到sessionStorage；storage into sessionStorage
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  getters: {
    GET_TOKEN(state) {
      return state.token
    }
  }
})
