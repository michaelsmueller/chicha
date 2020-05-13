import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../context/authContext';

const PrivateRoute = ({ component: Comp, status, ...rest }) => {
  return (
    <Route
      {...rest}
      render={ (props) =>
        status === 'loggedIn' ? (
          <Comp {...props} />
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

export default withAuth(PrivateRoute);
