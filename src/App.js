import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnonRoute, PrivateRoute } from './components';
import AuthProvider from './context/authContext';
import { AddEvent, EditEvent, EventDetail, Events, Heavyweights, Home, Nav, Offers, Profile, Register } from './views';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <div className='App'>
        <Switch>
          <AnonRoute exact path='/' component={Home} />
          <AnonRoute exact path='/register' component={Register} />
          <PrivateRoute path='/' component={Layout} />
        </Switch>
      </div>
    </AuthProvider>
  )
}

const Layout = () => {
  return <div>
    <Nav />
    <Route exact path='/events' component={Events} />
    <Route exact path='/events/:id' component={EventDetail} />
    <Route exact path='/events/:id/edit' component={EditEvent} />
    <Route exact path='/add-event' component={AddEvent} />
    <Route exact path='/heavyweights' component={Heavyweights} />
    <Route exact path='/offers' component={Offers} />
    <Route exact path='/profile' component={Profile} />
  </div>
}

export default App;
