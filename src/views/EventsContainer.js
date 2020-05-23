import React from 'react';
import { withAuth } from '../context/authContext';
import { ContentLoader } from '../components';
import { Events } from '.'
import apiClient from '../services/apiClient';

const EventsContainer = ({ userId }) => {
  return (
    <ContentLoader asyncFunc={apiClient.getEvents}>
      {({ events }) => <Events events={events} userId={userId} />}
    </ContentLoader>
  );
};

export default withAuth(EventsContainer);
