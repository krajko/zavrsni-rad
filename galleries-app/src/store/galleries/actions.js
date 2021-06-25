import GalleryService from '../../services/Galleries.js'

export const actions = {

    // Galleries
    async getIndex(store) {
        let data;

        if (store.getters.query) {
            data = await GalleryService.searchIndex(store.getters.query, store.getters.currentPage);
        } else {
            data = await GalleryService.index(store.getters.currentPage);
        }

        store.dispatch('handlePageData', data);
    },

    // My Galleries
    async getMyGalleries(store) {
        let data;

        if (store.getters.query) {
            data = await GalleryService.searchUser(store.rootGetters['auth/activeUser'].id, store.getters.query, store.getters.currentPage)
        } else {
            data = await GalleryService.userIndex(store.rootGetters['auth/activeUser'].id, store.getters.currentPage);
        }

        store.dispatch('handlePageData', data);
    },

    async create(store, data) {
        await GalleryService.create(data);
    },

    async edit(store, { id, gallery }) {
        await GalleryService.edit(id, gallery);
    },

    async delete(store, id) {
        await GalleryService.destroy(id);
        store.commit('deleteGallery', id);
    },

    // Author's galleries
    async getUser(store, id) {
        const data = await GalleryService.getUser(id);
        store.commit('setUser', data);
    },

    async getUserGalleries(store, id) {
        let data;

        if (store.getters.query) {
            data = await GalleryService.searchUser(id, store.getters.query, store.getters.currentPage);
        } else {
            data = await GalleryService.userIndex(id, store.getters.currentPage);
        }

        store.dispatch('handlePageData', data);
    },

    // Pages
    handlePageData(store, { data, current_page, next_page_url }) {
        if (current_page === 1) {
            store.commit('resetGalleries');
            store.commit('setLastPage', false);
            store.commit('setGalleries', data);
        } else {
            store.commit('loadGalleries', data);
        }

        if (next_page_url === null) {
            store.commit('setLastPage', true);
        }

        store.commit('setCurrentPage', current_page);
    },

    nextPage(store) {
        store.commit('incPage');
    },

    resetPage(store) {
        store.commit('setCurrentPage', 1);
    },

    // Query
    setQuery(store, query) {
        store.commit('setQuery', query);
    },

    resetQuery(store) {
        store.commit('resetQuery');
    },

    // Gallery
    async getGallery(store, id) {
        const gallery = await GalleryService.getGallery(id);
        store.commit('setGallery', gallery);
    },

    // Comments 
    async addComment(store, data) {
        const comment = await GalleryService.addComment(data);
        store.commit('addComment', comment);
    },

    async deleteComment(store, id) {
        await GalleryService.deleteComment(id);
        store.commit('deleteComment', id);
    }
}