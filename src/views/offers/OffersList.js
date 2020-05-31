import React from 'react';

const OffersList = ({ offers, openModal }) => {
  return (
    <div className='offers-list'>
      <OfferPreviews offers={offers} openModal={openModal} />
    </div>
  );
};

const OfferPreviews = ({ offers, openModal }) => {
  return (
    <div className='offer-previews'>
      {offers.map((offer) => <OfferPreview key={offer._id} offer={offer} openModal={openModal} />)}
    </div>
  );
};

const OfferPreview = ({ offer, openModal }) => {
  const { _id: offerId, partner, image, description, cost } = offer || '';
  const handleClick = () => openModal(offerId);
  return (
    <div className='offer-preview' onClick={handleClick}>
      {image && <img alt={partner} src={image} />}
      <div className='offer-info'>
        {partner && <p className='partner'>{partner}</p>}
        {description && <p className='description'>{description}</p>}
      </div>
      <div className='cost'>{cost}</div>
    </div>
  );
};

export default OffersList;
