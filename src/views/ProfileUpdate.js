import React from 'react';
import { ContentLoader } from '../components/';
import { ProfileUpdateForm } from '/';
import { withAuth } from '../context/authContext';
import apiClient from '../services/apiClient';

const ProfileUpdate = (props) => {
  const { userId } = props;
  return (
    <ContentLoader asyncFunc={apiClient.getUser} params={userId} >
      {(data) => <ProfileUpdateForm user={data.user} />}
    </ContentLoader>
  )
}

export default withAuth(ProfileUpdate);
