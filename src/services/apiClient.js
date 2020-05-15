import axios from 'axios';

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  // auth
  whoami = () => this.apiClient.get('/whoami');
  signIn = (body) => this.apiClient.post('/signin', body);
  logout = () => this.apiClient.get('/logout');

  // user
  register = (body) => this.apiClient.post('/users', body);
  getUser = (id) => this.apiClient.get(`/users/${id}`);
  editUser = (id, body) => this.apiClient.put(`/users/${id}`, body);

  // event
  addEvent = (body) => this.apiClient.post('/events', body);
  getEvent = (id) => this.apiClient.get(`/events/${id}`);
  getEvents = () => this.apiClient.get('/events');
  editEvent = (id, body) => this.apiClient.put(`/events/${id}`, body);
  deleteEvent = (id) => this.apiClient.delete(`/events/${id}`);
}

const apiClient = new ApiClient();
export default apiClient;
