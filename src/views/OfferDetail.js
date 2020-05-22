import React from 'react';
import { withRouter } from 'react-router-dom';
import { ContentLoader } from '../components';
import { OfferDetailContent } from '.';
import apiClient from '../services/apiClient';

const OfferDetail = (props) => {
  const { id } = props.match.params;
  return (
    <ContentLoader asyncFunc={apiClient.getOffer} params={id} >
      {(data) => <OfferDetailContent offer={data.offer} />}
    </ContentLoader>
  )
}

export default withRouter(OfferDetail);
