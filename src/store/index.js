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
        browsingHistory: [],    // 浏览的历史记录
        singleOrder: '',  // 直接支付时的单条商品记录
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
        SET_SINGLEORDER(state, singleOrder) {
            state.singleOrder = singleOrder
        },
        addHistory(state, history) {
            if (state.browsingHistory.length === 0) {
                state.browsingHistory.push(history)
            } else {
                let flag = state.browsingHistory.findIndex(item => item === history)
                if(flag === -1){
                    state.browsingHistory.push(history)
                }
            }
        },
        resetState(state) {
            state.token = ''
            state.temporaryAddress = ''
            state.shopOrderList = []
            state.browsingHistory = []
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
        GET_HISTORY(state) {
            return state.browsingHistory
        },
        GET_SINGLEORDER(state) {
            return state.singleOrder
        },
    }
})
