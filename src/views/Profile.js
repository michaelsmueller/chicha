import React, { Component } from 'react';
import { ContentLoader } from '../components';
import { ProfileContent } from './';
import { withAuth } from '../context/authContext';
import apiClient from '../services/apiClient';

class Profile extends Component {
  deleteUser = () => {
    const { userId, onLogout } = this.props;
    apiClient
      .deleteUser(userId)
        .then(() => onLogout())
        .catch((error) => console.log(error))
  }

  render() {
    const { userId } = this.props;
    return (
      <ContentLoader asyncFunc={apiClient.getUser} params={userId} >
        {(data) => <ProfileContent user={data.user} deleteUser={this.deleteUser} />}
      </ContentLoader>
    );
  }
}

export default withAuth(Profile);
