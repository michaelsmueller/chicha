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
  const { partner, image, description, cost } = offer || '';
  return (
    <div className='coupon-preview'>
        {image && <img alt={partner} src={image} />}
        <div className='coupon-info'>
          {partner && <p className='partner'>{partner}</p>}
          {description && <p className='description'>{description}</p>}
        </div>
        <QRCode value={'http://localhost:3000/events/5ebb4e71532ad00017e677f1'} renderAs='svg' />
        <div className='cost'>{cost}</div>
    </div>
  );
};

export default CouponsList;
