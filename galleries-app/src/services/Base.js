import axios from 'axios';

export default class HttpService {
    constructor() {
        this.http = axios.create({
            baseURL: 'http://localhost:8000/api/'
        });
        
        this.http.interceptors.request.use(function (request) {
            const token = JSON.parse(localStorage.getItem('token'));
            
            if (token) {
                request.headers['Authorization'] = `Bearer ${token}`;
            }
            
            return request;
        });
        
        this.http.interceptors.response.use((response) => {
            return response;
        }, async error => {
            const originalRequest = error.config;
            const token = JSON.parse(localStorage.getItem('token'));
            
            if (token && error.response.status === 401) {
                const { data } = await this.http.post('refresh');
                localStorage.setItem('token', JSON.stringify(data));
                
                return this.http(originalRequest);
            }
            
            return Promise.reject(error);
        });
    }
}
