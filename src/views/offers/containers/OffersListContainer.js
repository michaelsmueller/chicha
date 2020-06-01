import React from 'react';
import { ContentLoader } from '../../../components';
import { OffersList } from '../../';
import apiClient from '../../../services/apiClient';

const OffersListContainer = ({ setOffer, openModal }) => {
  return (
    <ContentLoader asyncFunc={apiClient.getOffers} >
      {({ offers }) => <OffersList offers={offers} setOffer={setOffer} openModal={openModal} />}
    </ContentLoader>
  )
}

export default OffersListContainer;
