export const mutations = {

    setGalleries(store, galleries) {
        store.galleries = galleries;
    },

    loadGalleries(store, galleries) {
        store.galleries = store.galleries.concat(galleries);
    },

    resetGalleries(store) {
        store.galleries = [];
    },

    setLastPage(store, value) {
        store.lastPage = value;
    },

    setGallery(store, gallery) {
        store.gallery = gallery;
    }
}