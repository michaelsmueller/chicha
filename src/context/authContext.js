import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import withLoading from '../components/withLoading';

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
      .then(({ data: user }) => this.setState({ status: 'loggedIn', user }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 401:
              this.setState({ status: 'loggedOut', user: null, error: null });
              break;
            default:
              this.setState({ status: 'error', user: null, error: response.statusText });
          }
        } else {
          this.setState({ status: 'error', user: null, error: 'cannot connect to server' });
        }
      })
  }

  handleRegister = ({ username, password }) => {
    apiClient
      .register({ username, password })
      .then(({ data: user }) => this.setState({ status: 'loggedIn', user }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 409:
              this.setState({ status: 'loggedOut', user: null, error: 'username already exists' });
              break;
            case 422:
              this.setState({ status: 'loggedOut', user: null, error: 'problem validating form data' });
              break;
            default:
              this.setState({ status: 'error', user: null, error: response.statusText });
          }
        } else {
          this.setState({ status: 'error', user: null, error: 'cannot connect to server' });
        }
      })
  };

  handleSignIn = ({ username, password }) => {
    apiClient
      .signIn({ username, password })
      .then(({ data: user }) => this.setState({ status: 'loggedIn', user }))
      .catch(({ response }) => {
        if (response !== undefined) {
          switch (response.status) {
            case 401:
              this.setState({ status: 'loggedOut', user: null, error: 'wrong username or password' });
              break;
            default:
              this.setState({ status: 'error', user: null, error: response.statusText });
          }
        } else {
          this.setState({ status: 'error', user: null, error: 'cannot connect to server' });
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
