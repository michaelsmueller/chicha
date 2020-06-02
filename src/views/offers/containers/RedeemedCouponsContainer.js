import React from 'react';
import { ContentLoader } from '../../../components';
import { RedeemedCoupons } from '../..';
import apiClient from '../../../services/apiClient';

const RedeemedCouponsContainer = ({ partnerId }) => {
  return (
    <ContentLoader asyncFunc={apiClient.getCoupons} params={partnerId} >
      {({ coupons }) => <RedeemedCoupons coupons={coupons} />}
    </ContentLoader>
  );
}

export default RedeemedCouponsContainer;
