import React from 'react';
import { ContentLoader } from '../../../components';
import { HeavyweightsList } from '../../';
import apiClient from '../../../services/apiClient';

const Heavyweights = () => {
  return (
    <div className='heavyweights'>
      <h1 className='title'>Heavyweights</h1>
      <ContentLoader asyncFunc={apiClient.getHeavyweights}>
        {({ heavyweights }) => <HeavyweightsList heavyweights={heavyweights} />}
      </ContentLoader>
    </div>
  )
}

export default Heavyweights;
