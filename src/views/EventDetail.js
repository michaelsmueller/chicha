import React from 'react';
import { withRouter } from 'react-router-dom';
import { ContentLoader } from '../components';
import { EventDetailContent } from './';
import apiClient from '../services/apiClient';

const EventDetail = (props) => {
  const { id } = props.match.params;
  return (
    <ContentLoader asyncFunc={apiClient.getEvent} params={id} >
      {(data) => <EventDetailContent event={data.event} />}
    </ContentLoader>
  )
}

export default withRouter(EventDetail);
