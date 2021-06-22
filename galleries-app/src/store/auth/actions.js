import Auth from '../../services/Auth'

export const actions = {

    async register(store, data) {
        const { user, token } = await Auth.register(data);
        localStorage.setItem('token', JSON.stringify(token));

        store.commit('setActiveUser', user);
        store.commit('setToken', token);
    },

    async login(store, credentials) {
        const { user, token } = await Auth.login(credentials);
        localStorage.setItem('token', JSON.stringify(token));

        store.commit('setActiveUser', user);
        store.commit('setToken', token);
    },

    async getActiveUser(store) {
        if (store.getters.isAuth) {
            const activeUser = await Auth.getMyProfile();
            store.commit('setActiveUser', activeUser);
        } else {
            store.commit('setActiveUser', {});
        }
    },

    async logout(store) {
        await Auth.logout();

        store.commit('setToken', null);
        store.commit('setActiveUser', {});
        localStorage.removeItem('token');
    }
}