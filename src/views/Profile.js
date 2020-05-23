import React from 'react';
import { ContentLoader } from '../components';
import { ProfileContent } from './';
import { withAuth } from '../context/authContext';
import apiClient from '../services/apiClient';

const Profile = ({ userId, onLogout }) => {
  const deleteUser = () => {
    apiClient.deleteUser(userId)
      .then(() => onLogout())
      .catch((error) => console.log(error))
  }

  return (
    <ContentLoader asyncFunc={apiClient.getUser} params={userId} >
      {({ user }) => <ProfileContent user={user} deleteUser={deleteUser} onLogout={onLogout} />}
    </ContentLoader>
  );
}

export default withAuth(Profile);
