import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { withAuth } from '../context/authContext';

const PrivateRoute = ({ component: Comp, STATUS, history, ...rest }) => {
  console.log('PrivateRoute, history.action', history.action);
  console.log('PrivateRoute, rest', rest);
  // if (action === 'POP' || action === 'REPLACE') console.log('pop or replace');
  // if (history)
  // console.log('history', history);
  // if (history.action === 'REPLACE') console.log('LOGGED IN FROM ', history.location.state.from.state.from.pathname);
  // console.log('PrivateRoute rest', rest);
  // console.log('rest.location.state', rest.location.state);
  // if (rest.location.state) console.log('FROM HERE: ', rest.location.state.from.pathname);
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
