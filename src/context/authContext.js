import React, { Component } from 'react';
import apiClient from '../services/apiClient';
export const AuthContext = React.createContext();

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ STATUS, userId, error, handleError, handleRegister, handleSignIn, handleLogout }) => {
            return (
              <Comp
                STATUS={STATUS}
                userId={userId}
                error={error}
                onError={handleError}
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
  state = { STATUS: 'LOADING', userId: null, error: null };

  resetErrorMessage = () => setTimeout(() => this.setState({ error: null }), 3000);

  componentDidMount = () => {
    console.log('AuthProvider componentDidMount');
    apiClient.whoami()
      .then(({ data: { _id } }) => this.setState({ STATUS: 'LOGGED_IN', userId: _id }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 401:
              this.setState({ STATUS: 'LOGGED_OUT', userId: null, error: null });
              break;
            default:
              this.setState({ STATUS: 'ERROR', userId: null, error: response.statusText });
              this.resetErrorMessage();
          }
        } else {
          this.setState({ STATUS: 'ERROR', userId: null, error: 'cannot connect to server' });
          this.resetErrorMessage();
        }
      })
  }

  handleRegister = ({ username, password }) => {
    apiClient.register({ username, password })
      .then(({ data: { _id } }) => this.setState({ STATUS: 'LOGGED_IN', userId: _id }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 409:
              this.setState({ STATUS: 'LOGGED_OUT', userId: null, error: 'username already exists' });
              this.resetErrorMessage();
              break;
            case 422:
              this.setState({ STATUS: 'LOGGED_OUT', userId: null, error: 'problem validating form data' });
              this.resetErrorMessage();
              break;
            default:
              this.setState({ STATUS: 'ERROR', userId: null, error: response.statusText });
              this.resetErrorMessage();
          }
        } else {
          this.setState({ STATUS: 'ERROR', userId: null, error: 'cannot connect to server' });
          this.resetErrorMessage();
        }
      })
  };

  handleSignIn = ({ username, password }) => {
    apiClient.signIn({ username, password })
      .then(({ data: { _id } }) => this.setState({ STATUS: 'LOGGED_IN', userId: _id }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 401:
              this.setState({ STATUS: 'LOGGED_OUT', userId: null, error: 'wrong username or password' });
              this.resetErrorMessage();
              break;
            default:
              this.setState({ STATUS: 'ERROR', userId: null, error: response.statusText });
              this.resetErrorMessage();
          }
        } else {
          this.setState({ STATUS: 'ERROR', userId: null, error: 'cannot connect to server' });
          this.resetErrorMessage();
        }
      })
  };

  handleLogout = () => {
    apiClient.logout()
      .then(() => this.setState({ STATUS: 'LOGGED_OUT', userId: null, error: null }))
      .catch(({ response }) => {
        if (response !== undefined) this.setState({ STATUS: 'ERROR', userId: null, error: response.statusText });
        else this.setState({ STATUS: 'ERROR', userId: null, error: 'cannot connect to server' });
        this.resetErrorMessage();
      })
  };

  handleError = (error) => {
    this.setState({ STATUS: 'ERROR', error });
    this.resetErrorMessage();
  }

  render() {
    const { children } = this.props;
    const { STATUS, userId, error } = this.state;
    return (
      <AuthContext.Provider
        value={{
          STATUS,
          userId,
          error,
          handleError: this.handleError,
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
