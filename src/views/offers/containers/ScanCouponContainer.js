import React from 'react';
import { ContentLoader } from '../../../components';
// import { RedeemCouponContent } from '../../';
import apiClient from '../../../services/apiClient';

const RedeemCoupon = ({ match: { params: { id }}}) => {
  return (
    <ContentLoader asyncFunc={apiClient.getCoupon} params={id} >
      {/* {({ coupon }) => <RedeemCouponContent coupon={coupon} />} */}
    </ContentLoader>
  )
}

export default RedeemCoupon;
