import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../context/authContext';
import { getPasswordStrength } from '../helpers/validate';
import { Error } from './'

class Register extends Component {
  state = { username: '', password: '', passwordStrength: 0 };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onError, onRegister } = this.props;
    const { username, password, passwordStrength } = this.state;
    if (!username || !password) onError('Please fill out both username and password')
    else if (passwordStrength < 3) onError('Password is too easy to guess, please strengthen')
    else onRegister({ username, password });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === 'password') this.setState({ passwordStrength: getPasswordStrength(value) });
  }

  passwordInputColor = () => {
    if (this.state.passwordStrength < 3 ) return '#fef200'
    else return '#87C548'
  }

  render() {
    const { username, password } = this.state;
    const { error } = this.props;
    const passwordInputStyle = password ? { border: `3px solid ${this.passwordInputColor()}`} : null;
    return (
      <div className='register'>
      <img className='logo' alt='chicha logo' src='/chicha-logo-black.png' />
        <h1 className='title'>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='username'
            value={username}
            onChange={this.handleChange}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='password'
            value={password}
            onChange={this.handleChange}
            style={passwordInputStyle}
          />
          <button type='submit' value='submit'>Register</button>
        </form>
        {error && <Error error={error} />}
        <p className='footer-prompt'>
          Already have an account? <Link to='/'>Sign in here</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Register);
