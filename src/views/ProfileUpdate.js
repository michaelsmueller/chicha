import React from 'react';
import { ContentLoader } from '../components';
import { ProfileUpdateForm } from './';
import { withAuth } from '../context/authContext';
import apiClient from '../services/apiClient';

const ProfileUpdate = ({ userId }) => {
  return (
    <ContentLoader asyncFunc={apiClient.getUser} params={userId} >
      {({ user }) => <ProfileUpdateForm user={user} />}
    </ContentLoader>
  );
}

export default withAuth(ProfileUpdate);
