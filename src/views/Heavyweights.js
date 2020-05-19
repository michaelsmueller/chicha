import React from 'react';
import { ContentLoader } from '../components';
import { HeavyweightsList } from './';
import apiClient from '../services/apiClient';

const Heavyweights = () => {
  return (
    <div className='heavyweights'>
    <h1>Heavyweights</h1>
    <ContentLoader asyncFunc={apiClient.getHeavyweights}>
      {(data) => <HeavyweightsList heavyweights={data.heavyweights} />}
    </ContentLoader>
    </div>
  )
}

export default Heavyweights;
