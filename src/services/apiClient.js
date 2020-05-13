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

  register(body) {
    return this.apiClient.post('/users', body);
  }

  signIn(body) {
    return this.apiClient.post('/signin', body);
  }

  logout() {
    return this.apiClient.get('/logout');
  }

  addEvent(body) {
    return this.apiClient.post('/events', body);
  }

  getEvent(id) {
    return this.apiClient.get(`/events/${id}`);
  }

  editEvent(id, body) {
    return this.apiClient.put(`/events/${id}`, body);
  }

  deleteEvent(id) {
    return this.apiClient.delete(`/events/${id}`);
  }

  getEvents() {
    return this.apiClient.get('/events');
  }
}

const apiClient = new ApiClient();
export default apiClient;
