import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { withAuth } from '../context/authContext';

const AnonRoute = ({ component: Comp, STATUS, history, ...rest }) => {
  console.log('AnonRoute, history.action', history.action);
  console.log('AnonRoute, rest', rest);
  // if (action === 'POP' || action === 'REPLACE') console.log('pop or replace');
  // console.log('props.location.state.from', props.location.state.from.pathname);
  // let pathname; 
  // if (props.location.state.from.pathname === '/foo') {
  //   pathname = '/foo'
  // } else pathname = '/events';
  let pathname;
  if (history.action === 'REPLACE') {
    console.log('OK REPLACING PATHNAME');
    pathname = rest.location?.state?.from?.pathname;
  } else pathname = '/events';
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
              // state: { from: props.location.state.from },
            }}
          />
        )
      }
    />
  );
}

export default withAuth(withRouter(AnonRoute));
