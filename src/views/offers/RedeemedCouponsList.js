import React from 'react';
import { showLocalDateTime } from '../../helpers/dateTime';

const RedeemedCouponsList = ({ redeemedCoupons }) => {
  return (
    <div className='redeemed-coupons-list'>
      {redeemedCoupons.map((redeemedCoupon, i) => <RedeemedCoupon key={i} redeemedCoupon={redeemedCoupon} />)}
    </div>
  );
};

const RedeemedCoupon = ({ redeemedCoupon }) => {
  const { username, coupons: { redeemedOn, offer: { description } } } = redeemedCoupon;
  return (
    <div className='redeemed-coupon-info'>
      <div className='customer'>{username}</div>
      <div className='description'>{description}</div>
      <div className='redeemed-on'>Redeemed on {showLocalDateTime(redeemedOn)}</div>
    </div>
  );
};

export default RedeemedCouponsList;
