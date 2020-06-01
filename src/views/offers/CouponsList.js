import React from 'react';
import QRCode from 'qrcode.react';

const CouponsList = ({ coupons }) => {
  return (
    <div className='coupons-list'>
      {coupons.length ? <CouponPreviews coupons={coupons}/> : null }
    </div>
  );
};

const CouponPreviews = ({ coupons }) => {
  return (
    <div className='coupon-previews'>
      {coupons.map((coupon) => <CouponPreview key={coupon._id} coupon={coupon} />)}
    </div>
  );
};

const CouponPreview = ({ coupon }) => {
  const { _id: couponId, offer } = coupon;
  const { partner, description } = offer || '';
  return (
    <div className='coupon-preview-container'>
      <div className='qr-code'><QRCode value={couponId} renderAs='svg' /></div>
      <div className='coupon-preview'>
        {partner && <div className='partner'>{partner}</div>}
        {description && <div className='description'>{description}</div>}
        <div className='coupon-id'>Your reedeem code: <br /> {couponId}</div>
      </div>
    </div>
  );
};

export default CouponsList;
