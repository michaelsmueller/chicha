import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/authContext';
import Home from './views/Home';
import Register from './views/Register';
import Events from './views/Events';
import './App.css';

class App extends Component {

  render() {
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
}

export default App;
