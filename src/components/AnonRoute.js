import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { withAuth } from '../context/authContext';

const AnonRoute = ({ component: Comp, STATUS, history, ...rest }) => {
  console.log('AnonRoute, history.action', history.action);
  console.log('AnonRoute, rest', rest);
  let pathname;
  if (history.action === 'REPLACE') pathname = rest.location?.state?.from?.pathname;
  else pathname = '/events';
  return (
    <Route
      {...rest}
      render={(props) =>
        STATUS !== 'LOGGED_IN' ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname,
              // pathname: '/events',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default withAuth(withRouter(AnonRoute));
