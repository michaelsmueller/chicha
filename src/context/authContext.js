import React, { Component } from 'react';
import apiClient from '../services/apiClient';
export const AuthContext = React.createContext();

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ status, userId, error, handleRegister, handleSignIn, handleLogout }) => {
            return (
              <Comp
                status={status}
                userId={userId}
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
  state = { status: 'loading', userId: null, error: null };

  componentDidMount() {
    apiClient.whoami()
      .then(({ data: { _id } }) => this.setState({ status: 'loggedIn', userId: _id }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 401:
              this.setState({ status: 'loggedOut', userId: null, error: null });
              break;
            default:
              this.setState({ status: 'error', userId: null, error: response.statusText });
          }
        } else {
          this.setState({ status: 'error', userId: null, error: 'cannot connect to server' });
        }
      })
  }

  handleRegister = ({ username, password }) => {
    apiClient.register({ username, password })
      .then(({ data: { _id } }) => this.setState({ status: 'loggedIn', userId: _id }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 409:
              this.setState({ status: 'loggedOut', userId: null, error: 'username already exists' });
              break;
            case 422:
              this.setState({ status: 'loggedOut', userId: null, error: 'problem validating form data' });
              break;
            default:
              this.setState({ status: 'error', userId: null, error: response.statusText });
          }
        } else {
          this.setState({ status: 'error', userId: null, error: 'cannot connect to server' });
        }
      })
  };

  handleSignIn = ({ username, password }) => {
    apiClient.signIn({ username, password })
      .then(({ data: { _id } }) => this.setState({ status: 'loggedIn', userId: _id }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 401:
              this.setState({ status: 'loggedOut', userId: null, error: 'wrong username or password' });
              break;
            default:
              this.setState({ status: 'error', userId: null, error: response.statusText });
          }
        } else {
          this.setState({ status: 'error', userId: null, error: 'cannot connect to server' });
        }
      })
  };

  handleLogout = () => {
    apiClient.logout()
      .then(() => this.setState({ status: 'loggedOut', userId: null, error: null }))
      .catch(({ response }) => this.setState({ status: 'error', userId: null, error: response.statusText }));
  };

  render() {
    const { children } = this.props;
    const { status, userId, error } = this.state;
    return (
      <AuthContext.Provider
        value={{
          status,
          userId,
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
