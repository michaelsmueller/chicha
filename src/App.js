import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Register from './views/Register';
import Home from './views/Home';

import { AnonRoute, PrivateRoute } from './components';

import apiClient from './services/apiClient';
import Events from './views/Events';

import './App.css';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then((user) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }

  handleSignIn = ({ username, password }) => {
    apiClient
      .signIn({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleRegister = ({ username, password }) => {
    console.log('handleRegister');
    console.log(`username ${username} password ${password}`);
    apiClient
      .register({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  logout = () => {
    console.log('logout');
    apiClient
      .logout()
      .then(() => {
        console.log('logged out');
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    const { isLoggedIn, isLoading } = this.state;
    return (
      <div className='App'>
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
          <div className='App'>
            <Switch>
              <AnonRoute exact path={'/'} isLoggedIn={isLoggedIn}>
                <Home onSignIn={this.handleSignIn} />
              </AnonRoute>
              <AnonRoute exact path={'/register'} isLoggedIn={isLoggedIn}>
                <Register onRegister={this.handleRegister} />
              </AnonRoute>
              <PrivateRoute exact path={'/events'} isLoggedIn={isLoggedIn}>
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
