import React from 'react';
import { withAuth } from '../context/authContext';
import { ContentLoader } from '../components';
import { Events } from '.'
import apiClient from '../services/apiClient';

const EventsContainer = (props) => {
  const { userId } = props;
  return (
    <ContentLoader asyncFunc={apiClient.getEvents}>
      {(data) => <Events events={data.events} userId={userId} />}
    </ContentLoader>
  );
};

export default withAuth(EventsContainer);
