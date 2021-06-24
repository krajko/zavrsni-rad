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
}

const GalleryService = new Galleries();
export default GalleryService;