import React, { Component } from 'react';
import { withAuth } from '../context/authContext';
import apiClient from '../services/apiClient';

class Offers extends Component {
  state = { user: undefined };

  componentDidMount = async () => {
    const { userId } = this.props;
    try {
      const userResponse = await apiClient.getUser(userId);
      const { user } = userResponse.data;
      this.setState({ user });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { user } = this.state;
    const { points } = user || 0;
    return (
      <div>
        <h1>Offers</h1>
        <h2>
          {points} points
        </h2>
      </div>
    );
  }
}

export default withAuth(Offers);
