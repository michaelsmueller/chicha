import React from 'react';
import { ContentLoader } from '../../../components';
import { RedeemedCouponsList } from '../..';
import apiClient from '../../../services/apiClient';

const RedeemedCoupons = ({ partnerId }) => {
  return (
    <ContentLoader asyncFunc={apiClient.getRedeemedCoupons} params={partnerId} >
      {({ redeemedCoupons }) => <RedeemedCouponsList redeemedCoupons={redeemedCoupons} />}
    </ContentLoader>
  );
}

export default RedeemedCoupons;
