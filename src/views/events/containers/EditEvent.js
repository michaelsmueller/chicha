import React from 'react';
import { ContentLoader } from '../../../components';
import { EditEventForm } from '../../';
import apiClient from '../../../services/apiClient';

const EditEvent = ({ match: { params: { id }}}) => {
  return (
    <ContentLoader asyncFunc={apiClient.getEvent} params={id}>
      {({event}) => <EditEventForm data={event.data} id={id} creator={event.creator} />}
    </ContentLoader>
  )
}

export default EditEvent;
