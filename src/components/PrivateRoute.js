import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, status, ...rest }) {
  console.log('PrivateRoute');
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
