import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: true,
    buyGoods: [],
    lastLogin: false,
    info: {
      cart: [],
      cash: [],
      collect: [],
      coupon: [],
      user: {
        name: ''
      }
    },
    // 文案参数
    wenan: ''
  },
  getters: {
    info: state => state.info,
    isUserNeedLogin: state => {
      const user = sessionStorage.getItem('user data')
      if (typeof user == 'string' && user !== 'undefined') {
        store.dispatch('INFO', JSON.parse(user))
      }
      return !state.info.user.name
    }
  },
  mutations: {
    loadStatus(state, flag) {
      state.loading = flag
    },
    lastLoginStatus(state, status) {
      state.lastLogin = status
    },
    addGoods(state, goods) {
      state.buyGoods.push(goods);
    },
    removeGoods(state, goods) {
      const cur_index = state.buyGoods.findIndex(item => item.id === goods);
      state.buyGoods.splice(cur_index, 1)
    },
    UPDATE_INFO(state, info) {
      if (info.user && info.user.name) {
        state.info = {
          ...state.info,
          ...info
        }
      } else {
        state.info = {
          user: {}
        }
      }
    }
  },

  actions: {
    // 修改个人信息
    INFO({
      commit,
      state
    }, info) {
      // console.log(info)
      info ? commit('UPDATE_INFO', info)
      : commit('UPDATE_INFO', {})
    },
  }
})

export default store