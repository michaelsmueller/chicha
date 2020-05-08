import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AnonRoute = ({ children, status, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        status !== 'loggedIn' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/events',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default AnonRoute;
