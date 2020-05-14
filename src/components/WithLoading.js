import React from 'react';
import Error from '../views/Error';
import Loading from '../views/Loading';

const withLoading = (Comp) => {
  return ({ status, error, ...props }) => {
    switch (status) {
      case 'loading':
        return <Loading />;
      case 'error':
        return <Error error={error} />;
      default:
        return <Comp {...props} />;
    }
  }
}

export default withLoading;
