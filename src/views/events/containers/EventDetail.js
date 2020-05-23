import React from 'react';
import { ContentLoader } from '../../../components';
import { EventDetailContent } from '../../';
import apiClient from '../../../services/apiClient';

const EventDetail = ({ match: { params: { id }}}) => {
  return (
    <ContentLoader asyncFunc={apiClient.getEvent} params={id} >
      {({ event }) => <EventDetailContent event={event} />}
    </ContentLoader>
  )
}

export default EventDetail;
