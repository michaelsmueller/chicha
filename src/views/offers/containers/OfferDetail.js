import React from 'react';
import { ContentLoader } from '../../../components';
import { OfferDetailContent } from '../../';
import apiClient from '../../../services/apiClient';

const OfferDetail = ({ match: { params: { id }}}) => {
  return (
    <ContentLoader asyncFunc={apiClient.getOffer} params={id} >
      {({ offer }) => <OfferDetailContent offer={offer} />}
    </ContentLoader>
  )
}

export default OfferDetail;
