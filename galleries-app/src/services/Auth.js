import HttpService from './Base.js';

class Auth extends HttpService {
    async register(user) {
        const { data } = await this.http.post('register', user);
        return data;
    }

    async login(credentials) {
        const { data } = await this.http.post('login', credentials);
        return data;
    }

    async getMyProfile() {
        const { data } = await this.http.post('me');
        return data;
    }
    
    async logout() {
        const { data } = this.http.post('logout');
        return data;
    }
}

const AuthService = new Auth();
export default AuthService;