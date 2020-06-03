import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { withAuth } from '../context/authContext';

const PrivateRoute = ({ component: Comp, STATUS, history, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        STATUS === 'LOGGED_IN' ? (
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

export default withAuth(withRouter(PrivateRoute));
