import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from './views/SignIn';
import Register from './views/Register';
import Home from './views/Home';

import { AnonRoute, PrivateRoute } from './components';

import apiClient from './services/apiClient';
import Events from './views/Events';

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

  render() {
    const { isLoggedIn, isLoading } = this.state;
    return (
      <div>
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
          <div className='App'>
            <Switch>
              <Route exact path={'/'} component={Home} />
              <AnonRoute exact path={'/signin'} isLoggedIn={isLoggedIn}>
                <SignIn onSignIn={this.handleSignIn} />
              </AnonRoute>
              <AnonRoute exact path={'/register'} isLoggedIn={isLoggedIn}>
                <Register onRegister={this.handleRegister} />
              </AnonRoute>
              <PrivateRoute exact path={'/events'} isLoggedIn={isLoggedIn} component={Events} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
