import axios from 'axios';

class ApiClient {
  constructor() {
    this.apiClient = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URI, withCredentials: true });
  }

  whoami = () => this.apiClient.get('/whoami');
  signIn = (body) => this.apiClient.post('/signin', body);
  logout = () => this.apiClient.get('/logout');

  register = (body) => this.apiClient.post('/users', body);
  getUser = (id) => this.apiClient.get(`/users/${id}`);
  editUser = (id, body) => this.apiClient.put(`/users/${id}`, body);
  deleteUser = (id) => this.apiClient.delete(`/users/${id}`);
  getHeavies = () => this.apiClient.get('/users/heavies');

  addEvent = (body) => this.apiClient.post('/events', body);
  getEvent = (id) => this.apiClient.get(`/events/${id}`);
  getEvents = () => this.apiClient.get('/events');
  editEvent = (id, body) => this.apiClient.put(`/events/${id}`, body);
  deleteEvent = (id) => this.apiClient.delete(`/events/${id}`);
  searchEvents = (query) => this.apiClient.get(`/events/search?query=${query}`);

  getVotes = () => this.apiClient.get('/votes');
  createVote = (body) => this.apiClient.post('/votes', body);
  changeVote = (id, body) => this.apiClient.put(`/votes/${id}`, body);
  removeVote = (id, eventId, direction) => this.apiClient.delete(`/votes/${id}?eventid=${eventId}&direction=${direction}`);

  getOffer = (id) => this.apiClient.get(`/offers/${id}`);
  getOffers = () => this.apiClient.get('/offers');
}

const apiClient = new ApiClient();
export default apiClient;
