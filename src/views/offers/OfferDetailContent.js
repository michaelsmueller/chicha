import React from 'react';

const OfferDetailContent = ({ offer, getCoupon }) => {
  const { partner, image, description, cost } = offer || '';

  const handleClick = (e) => {
    console.log('click');
    getCoupon(offer);
  }

  return (
    <div className='offer-detail'>
      <div className='offer-image-container'><img alt={partner} src={image} /></div>
      <h1 className='title'>{partner}</h1>
      <h2 className='cost'>{cost} points</h2>
      <p className='description'>{description}</p>
      <button onClick={handleClick}>Get coupon</button>
    </div>
  );
}

export default OfferDetailContent;
