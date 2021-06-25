export const mutations = {

    // Galleries
    setGalleries(store, galleries) {
        store.galleries = galleries;
    },

    loadGalleries(store, galleries) {
        store.galleries = store.galleries.concat(galleries);
    },

    resetGalleries(store) {
        store.galleries = [];
    },

    // My Galleries
    addGallery(store, gallery) {
        store.myGalleries.unshift(gallery);
    },

    deleteGallery(store, id) {
        store.galleries = store.galleries.filter(gallery => gallery.id !== id);
    },

    // Query
    setQuery(store, value) {
        store.query = value;
    },

    resetQuery(store) {
        store.query = null;
    },

    // Pages
    setCurrentPage(store, value) {
        store.currentPage = value;
    },

    incPage(store) {
        store.currentPage++;
    },

    setLastPage(store, value) {
        store.lastPage = value;
    },

    // Author's galleries
    setUser(store, user) {
        store.user = user;
    },

    // Gallery
    setGallery(store, gallery) {
        store.gallery = gallery;
    },

    // Comments
    addComment(store, comment) {
        store.gallery.comments.unshift(comment);
    },

    deleteComment(store, id) {
        store.gallery.comments = store.gallery.comments.filter(comment => comment.id !== id);
    }


}