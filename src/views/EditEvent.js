import React from 'react';
import { withRouter } from 'react-router-dom';
import { ContentLoader } from '../components/';
import { EditEventForm } from '/';
import apiClient from '../services/apiClient';

const EditEvent = (props) => {
  const { id } = props.match.params;
  return (
    <ContentLoader asyncFunc={apiClient.getEvent} params={id} >
      {(data) => <EditEventForm data={data.event.data} id={id} />}
    </ContentLoader>
  )
}

export default withRouter(EditEvent);
