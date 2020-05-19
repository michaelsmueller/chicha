import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { withAuth } from '../context/authContext';

const AnonRoute = (props) => {
  const { component: Comp, STATUS, ...rest } = props;
  return (
    <Route
      {...rest}
      render={ (props) =>
        STATUS !== 'LOGGED_IN' ? (
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
