import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { withAuth } from '../context/authContext';

const AnonRoute = ({ component: Comp, status, ...rest }) => {
  return (
    <Route
      {...rest}
        render={(props) =>
          status !== 'loggedIn' ? (
            <Comp {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/events',
                state: { from: props.location },
              }}
          />
        )
      }
    />
  );
}

export default withAuth(AnonRoute);
