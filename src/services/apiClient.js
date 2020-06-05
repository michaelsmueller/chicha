import axios from 'axios';

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });

    this.apiClient.interceptors.request.use((request) => {
      console.log('Starting Request', request);
      return request;
    });
    
    this.apiClient.interceptors.response.use((response) => {
      console.log('Response:', response);
      return response;
    });
  }

  whoami = () => this.apiClient.get('/whoami');
  signIn = (body) => this.apiClient.post('/signin', body);
  logout = () => this.apiClient.get('/logout');

  register = (user) => this.apiClient.post('/users', user);
  getUser = (userId) => this.apiClient.get(`/users/${userId}`);
  editUser = (userId, body) => this.apiClient.put(`/users/${userId}`, body);
  deleteUser = (userId) => this.apiClient.delete(`/users/${userId}`);
  getHeavies = () => this.apiClient.get('/users/heavies');

  addCoupon = (userId, body) => this.apiClient.patch(`/users/${userId}/coupons`, body);
  getUserWithCoupon = (couponId) => this.apiClient.get(`/users/find?coupon=${couponId}`);
  redeemCoupon = (userId, couponId) => this.apiClient.patch(`/users/${userId}/coupons/${couponId}`);

  getOffer = (offerId) => this.apiClient.get(`/offers/${offerId}`);
  getOffers = () => this.apiClient.get('/offers');

  addEvent = (body) => this.apiClient.post('/events', body);
  getEvent = (eventId) => this.apiClient.get(`/events/${eventId}`);
  getEvents = () => this.apiClient.get('/events');
  editEvent = (eventId, body) => this.apiClient.put(`/events/${eventId}`, body);
  deleteEvent = (eventId) => this.apiClient.delete(`/events/${eventId}`);
  searchEvents = (query) => this.apiClient.get(`/events/search?query=${query}`);

  getVotes = () => this.apiClient.get('/votes');
  createVote = (body) => this.apiClient.post('/votes', body);
  changeVote = (voteId, body) => this.apiClient.put(`/votes/${voteId}`, body);
  removeVote = (voteId, eventId, direction) => this.apiClient.delete(`/votes/${voteId}?eventid=${eventId}&direction=${direction}`);

}

const apiClient = new ApiClient();
export default apiClient;
