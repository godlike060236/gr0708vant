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
        token: '',
        shopOrderList: [],  // 购物车去结算的时候存入vuex
        temporaryAddress: '',   // 结算时候选择的地址
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_ORDER(state, shopOrderList) {
            state.shopOrderList = shopOrderList
        },
        SET_ADDRESS(state, temporaryAddress) {
            state.temporaryAddress = temporaryAddress
        },
    },
    getters: {
        GET_TOKEN(state) {
            return state.token
        },
        GET_ORDER(state) {
            return state.shopOrderList
        },
        GET_ADDRESS(state) {
            return state.temporaryAddress
        },
    }
})
