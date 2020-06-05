import React from 'react';
import QRCode from 'qrcode.react';
import { Theme } from "../../context/themeContext";

const CouponsList = ({ coupons, theme }) => {
  return (
    <div className='coupons-list'>
      {coupons.length
        ? <Theme.Consumer>{({ theme }) => <CouponPreviews coupons={coupons} theme={theme} />}</Theme.Consumer>
        : null
      }
    </div>
  );
};

const CouponPreviews = ({ coupons, theme }) => {
  return (
    <div className='coupon-previews'>
      {coupons.map((coupon) => {
        if (coupon.status === 'valid') return <CouponPreview key={coupon._id} coupon={coupon} theme={theme} />
        else return null;
      })}
    </div>
  );
};

const CouponPreview = ({ coupon, theme }) => {
  const { _id: couponId, offer } = coupon;
  const { partner, description } = offer || '';
  const bgColor = theme === 'light' ? 'white' : '#212121';
  const fgColor = theme === 'light' ? '#212121' : 'rgba(255, 255, 255, 0.9)';
  return (
    <div className='coupon-preview-container'>
      <div className='qr-code'><QRCode value={couponId} fgColor={fgColor} bgColor={bgColor} renderAs='svg' /></div>
      <div className='coupon-preview'>
        {partner && <div className='partner'>{partner}</div>}
        {description && <div className='description'>{description}</div>}
        <div className='coupon-id'>Your reedeem code: <br /> {couponId}</div>
      </div>
    </div>
  );
};

export default CouponsList;
