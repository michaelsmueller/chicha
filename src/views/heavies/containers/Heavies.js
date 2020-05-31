import React from 'react';
import { ContentLoader } from '../../../components';
import { HeaviesList } from '../..';
import apiClient from '../../../services/apiClient';

const Heavies = () => {
  return (
    <div className='heavies'>
      <h1 className='title'>Heavies</h1>
      <ContentLoader asyncFunc={apiClient.getHeavies}>
        {({ heavies }) => <HeaviesList heavies={heavies} />}
      </ContentLoader>
    </div>
  )
}

export default Heavies;
