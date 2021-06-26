import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

const store = {
    namespaced: true,
    state: {
        galleries: [],
        query: null,
        gallery: {},
        currentPage: 1,
        lastPage: false,
        user: {},
        isLoading: false
    },
    actions,
    mutations,
    getters
}

export default store;