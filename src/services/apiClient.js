import axios from 'axios';

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  whoami() {
    return this.apiClient.get('/whoami');
  }

  signIn(body) {
    return this.apiClient.post('/signin', body);
  }

  register(body) {
    return this.apiClient.post('/users', body);
  }

  logout() {
    return this.apiClient.get('/logout');
  }
}

const apiClient = new ApiClient();
export default apiClient;
