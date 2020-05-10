import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { withAuth } from '../context/authContext';

const AnonRoute = (props) => {
  const { component: Comp, status, ...rest } = props;
  return (
    <Route
      { ...rest }
      render={ (props) =>
        status !== 'loggedIn' ? (
          <Comp { ...props } />
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
