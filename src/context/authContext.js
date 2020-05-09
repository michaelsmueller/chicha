import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export const AuthContext = React.createContext();

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ status, user, errorMessage, handleRegister, handleSignIn, handleLogout }) => {
            return (
              <Comp
                status={status}
                user={user}
                errorMessage={errorMessage}
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
  state = { status: 'loading', user: null, errorMessage: null };

  componentDidMount() {
    apiClient
    .whoami()
    .then((user) => this.setState({ status: 'loggedIn', user }))
    .catch(({ response }) => {
      console.log('response in component did mount', response);
      if (response.status === 401) this.setState({ status: 'loggedOut', user: null });
      else this.setState({ status: 'error', user: null });
    });
  }

  handleRegister = ({ username, password }) => {
    apiClient
      .register({ username, password })
      .then(({ data: user }) => this.setState({ status: 'loggedIn', user }))
      .catch((error) => this.setState({ status: 'error', user: null }));
  };

  handleSignIn = ({ username, password }) => {
    apiClient
      .signIn({ username, password })
      .then(({ data: user }) => this.setState({ status: 'loggedIn', user }))
      .catch(({ response }) => {
        switch (response.status) {
          case 401:
            this.setState({ status: 'loggedOut', user: null, errorMessage: 'wrong password' });
            break;
          case 404:
            this.setState({ status: 'loggedOut', user: null, errorMessage: 'unknown user' });
            break;
          default:
            this.setState({ status: 'loggedOut', user: null, errorMessage: 'login error' });
        }
      })
  };

  handleLogout = () => {
    apiClient
      .logout()
      .then(() => this.setState({ status: 'loggedOut', user: null }))
      .catch((error) => this.setState({ status: 'error', user: null }));
  };

  render() {
    const { children } = this.props;
    const { status, user, errorMessage } = this.state;
    return (
      <AuthContext.Provider
        value={{
          status,
          user,
          errorMessage,
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
