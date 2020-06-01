import React from 'react';

const RedeemCouponContent = ({ coupon }) => {
  // const { partner, image, description, cost } = offer || '';
  // const enoughPoints = balance >= cost;
  // const buttonStyle = { opacity: enoughPoints ? 1 : 0.4 };

  // const handleClick = () => {
  //   if (enoughPoints) {
  //     const confirmed = window.confirm(`Ok to spend ${cost} points to get coupon?`);
  //     if (confirmed) getCoupon(offer);
  //   };
  // }

  return (
    <div className='redeem-coupon'>
    redeem coupon
      {/* <div className='offer-image-container'><img alt={partner} src={image} /></div>
      <h1 className='title'>{partner}</h1>
      <h2 className='cost'>{cost} points</h2>
      <p className='description'>{description}</p>
      { !enoughPoints && <div className='not-enough-points'>You need {cost - balance} more points to get this coupon</div>}
      <button style={buttonStyle} onClick={handleClick}>Get coupon</button> */}
    </div>
  );
}

export default RedeemCouponContent;
