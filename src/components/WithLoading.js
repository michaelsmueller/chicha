import React from 'react';

const WithLoading = (Comp) => {
  return ({ status, ...props }) => {
    if (status !== 'loading') return (<Comp {...props} />);
    return (<p>Loading...</p>);
  }
}

export default WithLoading;
