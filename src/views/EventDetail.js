import React from 'react';
import { withRouter } from 'react-router-dom';
import { ContentLoader } from '../components/';
import { EventPage } from './';
import apiClient from '../services/apiClient';

const EventDetail = (props) => {
  const { id } = props.match.params;
  return (
    <ContentLoader asyncFunc={apiClient.getEvent} params={id} >
      {(data) => <EventPage event={data.event} />}
    </ContentLoader>
  )
}

export default withRouter(EventDetail);
