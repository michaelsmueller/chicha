import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, isLoggedIn, ...rest }) {
  console.log('PrivateRoute');
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
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
