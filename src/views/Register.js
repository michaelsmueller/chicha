import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../context/authContext';
import { Error } from './'

class Register extends Component {
  state = { username: '', password: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onRegister } = this.props;
    if (username !== '' && password !== '') {
      onRegister({ username, password });
      this.cleanForm();
    }
  };

  cleanForm = () => this.setState({ username: '', password: '' });

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, password } = this.state;
    const { error } = this.props;
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
          />
          <button type='submit' value='submit'>Register</button>
        </form>
        {/* {error && <Error error={error} />} */}
        <p className='footer-prompt'>
          Already have an account? <Link to='/'>Sign in here</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Register);
