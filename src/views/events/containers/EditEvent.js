import React from 'react';
import { ContentLoader } from '../../../components';
import { EditEventForm } from '../../';
import { withAuth } from '../../../context/authContext';
import { Error } from '../../';
import apiClient from '../../../services/apiClient';

const EditEvent = ({ match: { params: { id }}, userId }) => {
  return (
    <div className='edit-event-container'>
      <ContentLoader asyncFunc={apiClient.getEvent} params={id}>
        {({ event }) => {
          const { creator } = event;
          if (userId === creator) return <EditEventForm data={event.data} id={id} creator={creator} />
          else return <Error error='you are not authorized to access this page' />
        }}
      </ContentLoader>
    </div>
  );
}

export default withAuth(EditEvent);
