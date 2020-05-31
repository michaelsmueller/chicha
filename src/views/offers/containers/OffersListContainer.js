import React from 'react';
import { ContentLoader } from '../../../components';
import { OffersList } from '../../';
import apiClient from '../../../services/apiClient';

const OffersListContainer = () => {
  return (
    <ContentLoader asyncFunc={apiClient.getOffers} >
      {({ offers }) => <OffersList offers={offers} />}
    </ContentLoader>
  )
}

export default OffersListContainer;
