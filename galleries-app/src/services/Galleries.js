import HttpService from './Base.js'

class Galleries extends HttpService {
    async index(page) {
        const { data } = await this.http.get(`galleries?page=${page}`);
        return data;
    }

    async searchIndex(query, page) {
        const { data } = await this.http.get(`galleries/search?query=${query}&page=${page}`);
        return data;
    }

    async getUser(id) {
        const { data } = await this.http.get(`/user/${id}`);
        return data;
    }

    async userIndex(id, page) {
        const { data } = await this.http.get(`galleries/user/${id}?page=${page}`);
        return data;
    }

    async searchUser(id, query, page) {
        const { data } = await this.http.get(`galleries/user/${id}/search?query=${query}&page=${page}`);
        return data;
    }

    async getGallery(id) {
        const { data } = await this.http.get(`galleries/${id}`);
        return data;
    }

    async create(gallery) {
        const { data } = await this.http.post('galleries', gallery);
        return data;
    }
    async edit(id, gallery) {
        const { data } = await this.http.patch(`galleries/${id}`, gallery);
        return data;
    }

    async destroy(id) {
        const { data } = await this.http.delete(`galleries/${id}`);
        return data;
    }

    async addComment(comment) {
        const { data } = await this.http.post(`comments`, comment);
        return data;
    }

    async deleteComment(id) {
        const { data } = await this.http.delete(`comments/${id}`);
        return data;
    }
}

const GalleryService = new Galleries();
export default GalleryService;