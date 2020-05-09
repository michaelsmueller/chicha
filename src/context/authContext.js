import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export const AuthContext = React.createContext();

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ status, user, error, handleRegister, handleSignIn, handleLogout }) => {
            return (
              <Comp
                status={status}
                user={user}
                error={error}
                onRegister={handleRegister}
                onSignIn={handleSignIn}
                onLogout={handleLogout}
                {...this.props}
              />
            );
          }}
        </AuthContext.Consumer>
      );
    }
  };
};

class AuthProvider extends Component {
  state = { status: 'loading', user: null, error: null };

  componentDidMount() {
    apiClient
    .whoami()
    .then((user) => this.setState({ status: 'loggedIn', user }))
    .catch(({ response }) => {
      if (response.status === 401) this.setState({ status: 'loggedOut', user: null, error: null });
      else this.setState({ status: 'error', user: null, error: response.statusText });
    });
  }

  handleRegister = ({ username, password }) => {
    apiClient
      .register({ username, password })
      .then(({ data: user }) => this.setState({ status: 'loggedIn', user }))
      .catch(({ response }) => this.setState({ status: 'error', user: null, error: response.statusText }));
  };

  handleSignIn = ({ username, password }) => {
    apiClient
      .signIn({ username, password })
      .then(({ data: user }) => this.setState({ status: 'loggedIn', user }))
      .catch(({ response }) => {
        switch (response.status) {
          case 401:
            this.setState({ status: 'loggedOut', user: null, error: 'wrong password' });
            break;
          case 404:
            this.setState({ status: 'loggedOut', user: null, error: 'unknown user' });
            break;
          default:
            this.setState({ status: 'loggedOut', user: null, error: response.statusText });
        }
      })
  };

  handleLogout = () => {
    apiClient
      .logout()
      .then(() => this.setState({ status: 'loggedOut', user: null, error: null }))
      .catch(({ response }) => this.setState({ status: 'error', user: null, error: response.statusText }));
  };

  render() {
    const { children } = this.props;
    const { status, user, error } = this.state;
    return (
      <AuthContext.Provider
        value={{
          status,
          user,
          error,
          handleRegister: this.handleRegister,
          handleSignIn: this.handleSignIn,
          handleLogout: this.handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
