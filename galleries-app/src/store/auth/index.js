import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

const token = JSON.parse(localStorage.getItem('token'));

const store = {
    namespaced: true,
    state: {
        token: token,
        activeUser: {}
    },
    actions,
    mutations,
    getters
};

export default store;