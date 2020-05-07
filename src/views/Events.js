import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export default class Events extends Component {
  logout = () => {
    console.log('logout');
    apiClient
      .logout()
      .then(() => {
        console.log('logged out');
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Events</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
