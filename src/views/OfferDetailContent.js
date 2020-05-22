import React from 'react';

const OfferDetailContent = ({ offer }) => {
  const { partner, image, description, cost } = offer || '';
  return (
    <div className='offer-detail'>
      <div className='offer-image-container'>
        <img alt={partner} src={image} />
      </div>
      <div className='offer-info'>
        <h1 className='offer-partner'>{partner}</h1>
        <h2 className='cost'>{cost}</h2>
        <p className='description'>{description}</p>
      </div>
    </div>
  );
}

export default OfferDetailContent;
