import React, { Component } from 'react';
import { ProfileUpdateForm } from '/';
import { withAuth } from '../context/authContext';
import apiClient from '../services/apiClient';

class ProfileUpdate extends Component {
  state = { user: {}, status: 'loading', error: null };

  componentDidMount = () => {
    const { user } = this.props;
    apiClient
      .getUser(user._id)
      .then(({ data }) => {
        const { user } = data;
        this.setState({ user, status: 'loaded', error: null });
      })
      .catch((error) => this.setState({ status: 'error', error: error.message }))
  }

  render() {
    const { user, status, error } = this.state;
    return <ProfileUpdateForm user={user} status={status} error={error} />
  }
}

export default withAuth(ProfileUpdate);
