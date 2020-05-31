import React from 'react';

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
  const { offer } = coupon;
  const { partner, image, description, cost } = offer || '';
  return (
    <div className='coupon-preview'>
        {image && <img alt={partner} src={image} />}
        <div className='coupon-info'>
          {partner && <p className='partner'>{partner}</p>}
          {description && <p className='description'>{description}</p>}
        </div>
        <div className='cost'>{cost}</div>
    </div>
  );
};

export default CouponsList;
