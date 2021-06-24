import GalleryService from '../../services/Galleries.js'

export const actions = {

    async getIndex(store, page) {
        const data = await GalleryService.index(page);
        store.dispatch('handlePageData', data);
    },

    async searchIndex(store, { query, page }) {
        const data = await GalleryService.searchIndex(query, page);
        store.dispatch('handlePageData', data);
    },

    async getUserIndex(store, { id, page }) {
        const data = await GalleryService.userIndex(id, page);
        store.dispatch('handlePageData', data);
    },

    async searchUser(store, { id, query, page }) {
        const data = await GalleryService.searchUser(id, query, page);
        store.dispatch('handlePageData', data);
    },

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
    },

    async getGallery(store, id) {
        const gallery = await GalleryService.getGallery(id);
        store.commit('setGallery', gallery);
    }
}