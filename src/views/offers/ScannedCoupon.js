import React from 'react';
import { showLocalDateTime } from '../../helpers/dateTime';

const ScannedCoupon = ({ userId, coupon, redeemCoupon }) => {
  const { _id: couponId, offer } = coupon;
  const { partner, description } = offer || '';
  const isValid = coupon.status === 'valid';
  const buttonStyle = { opacity: isValid ? 1 : 0.4 };
  const handleClick = (e) => {
    if (isValid) {
      const confirmed = window.confirm(`Ok to use coupon now?`);
      if (confirmed) redeemCoupon(userId, couponId);
    }
  }
  return (
    <div className='scanned-coupon'>
      <div style={buttonStyle} className='coupon-preview'>
        {partner && <div className='partner'>{partner}</div>}
        {description && <div className='description'>{description}</div>}
        <div className='coupon-id'>Reedeem code: <br /> {couponId}</div>
      </div>
      {coupon.status === 'redeemed' && <div className='redeemed'>This coupon isn't valid since it was used on <br /> {showLocalDateTime(coupon.redeemedOn)}</div>}
      <button style={buttonStyle} onClick={handleClick}>Redeem coupon</button>
    </div>
  );
};

export default ScannedCoupon;
