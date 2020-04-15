import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: null
  },
  mutations: {
    setDb (state, db): void {
      state.db = db
    }
  },
  actions: {
    loadDb ({ commit }, db): void {
      commit('setDb', db)
    }
  },
  modules: {
  }
})
