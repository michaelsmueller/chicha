import React from 'react';
import { Switch } from 'react-router-dom';
import { AnonRoute, PrivateRoute } from './components';
import AuthProvider from './context/authContext';
import { Events, Home, Register } from './views';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <div className='App'>
        <Switch>
          <AnonRoute exact path='/' component={Home} />
          <AnonRoute exact path='/register' component={Register} />
          <PrivateRoute exact path='/events' component={Events} />
        </Switch>
      </div>
    </AuthProvider>
  )
}

export default App;
