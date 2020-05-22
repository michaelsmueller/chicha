import React from 'react';
import { Link } from 'react-router-dom';

const OffersList = ({ offers }) => {
  return (
    <div className='offers-list'>
      <OfferPreviews offers={offers} />
    </div>
  );
};

const OfferPreviews = ({ offers }) => {
  return (
    <div className='offer-previews'>
      {offers.map((offer) => <OfferPreview key={offer._id} offer={offer} />)}
    </div>
  )
};

const OfferPreview = ({ offer }) => {
  const { _id: offerId, partner, image, description, cost } = offer || '';
  return (
    <Link to={`/offers/${offerId}`}>
      <div className='offer-preview'>
          {image && <img alt={partner} src={image} />}
          <div className='offer-info'>
            {partner && <p className='partner'>{partner}</p>}
            {description && <p className='description'>{description}</p>}
          </div>
          <div className='cost'>{cost}</div>
      </div>
    </Link>
  );
};

export default OffersList;
