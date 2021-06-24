import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import galleries from './galleries'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    galleries
  }
})
