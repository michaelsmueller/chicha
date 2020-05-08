import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, status, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        status === 'loggedIn' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
