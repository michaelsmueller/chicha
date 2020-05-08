import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Register from './views/Register';
import Home from './views/Home';

import { AnonRoute, PrivateRoute } from './components';

import apiClient from './services/apiClient';
import Events from './views/Events';

import './App.css';

class App extends Component {
  state = {
    user: null,
    status: 'loading',
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then((user) => {
        this.setState({
          user,
          status: 'loggedIn'
        });
      })
      .catch((error) => {
        this.setState({
          user: null,
          status: 'error'
        });
      });
  }

  handleSignIn = ({ username, password }) => {
    apiClient
      .signIn({ username, password })
      .then(({ data: user }) => {
        this.setState({
          status: 'loggedIn',
          user,
        });
      })
      .catch((error) => {
        this.setState({
          status: 'error',
          user: null,
        });
      });
  };

  handleRegister = ({ username, password }) => {
    apiClient
      .register({ username, password })
      .then(({ data: user }) => {
        this.setState({
          status: 'loggedIn',
          user,
        });
      })
      .catch((error) => {
        this.setState({
          status: 'error',
          user: null,
        });
      });
  };

  logout = () => {
    apiClient
      .logout()
      .then(() => {
        this.setState({
          status: 'loggedOut',
          user: null,
        });
      })
      .catch((error) => {
        this.setState({
          status: 'error',
        });
      });
  }

  render() {
    const { status } = this.state;
    return (
      <div className='App'>
        {status === 'loading' && <div> Loading.......</div>}
        {! (status === 'loading') && (
          <div className='App'>
            <Switch>
              <AnonRoute exact path={'/'} status={status}>
                <Home onSignIn={this.handleSignIn} />
              </AnonRoute>
              <AnonRoute exact path={'/register'} status={status}>
                <Register onRegister={this.handleRegister} />
              </AnonRoute>
              <PrivateRoute exact path={'/events'} status={status}>
                <Events logout={this.logout} />
              </PrivateRoute>
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
