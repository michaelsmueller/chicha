import React from 'react';
import { ContentLoader } from '../../../components';
import { OfferDetailContent } from '../../';
import apiClient from '../../../services/apiClient';

const OfferDetail = ({ offerId, getCoupon }) => {
  return (
    <ContentLoader asyncFunc={apiClient.getOffer} params={offerId} >
      {({ offer }) => <OfferDetailContent offer={offer} getCoupon={getCoupon} />}
    </ContentLoader>
  )
}

export default OfferDetail;
