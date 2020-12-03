import { Module } from 'vuex'
import * as types from '@/store/mutation-types'
import { queryCurrentUser } from '@/services/user'

const user: Module<any, any> = {
    namespaced: true,
    state: {
        name: 'test'
    },
    mutations: {
        [types.SET_USERINFO](state, { data }) {
            Object.assign(state, data)
        },
    },
    actions: {
        async getUserInfo({ commit }) {
            commit(types.SET_USERINFO, await queryCurrentUser())
        },
    },
}

export default user