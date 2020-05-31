import React from 'react';
import { ContentLoader } from '../../../components';
import { OffersList } from '../../';
import apiClient from '../../../services/apiClient';

const OffersListContainer = ({ openModal }) => {
  return (
    <ContentLoader asyncFunc={apiClient.getOffers} >
      {({ offers }) => <OffersList offers={offers} openModal={openModal} />}
    </ContentLoader>
  )
}

export default OffersListContainer;
