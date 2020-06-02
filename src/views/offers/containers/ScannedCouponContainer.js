import React from 'react';
import { ContentLoader } from '../../../components';
import { ScannedCoupon } from '../../';
import apiClient from '../../../services/apiClient';

const ScannedCouponContainer = ({ couponId, redeemCoupon }) => {
  return (
    <ContentLoader asyncFunc={apiClient.getUserWithCoupon} params={couponId} >
      {(data) => <ScannedCoupon userId={data.userId} coupon={data.coupon} redeemCoupon={redeemCoupon} />}
    </ContentLoader>
  )
}

export default ScannedCouponContainer;
