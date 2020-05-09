import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../context/authContext';
import { Error } from './'

class Home extends Component {
  state = { username: '', password: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onSignIn } = this.props;
    if (username !== '' && password !== '') {
      onSignIn({ username, password });
    }
  };

  cleanForm = () => this.setState({ username: '', password: '' });

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, password } = this.state;
    const { error } = this.props;
    return (
      <div>
        <h1>Home</h1>
        <p>Please sign in</p>
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
          <input type='submit' value='submit' />
        </form>
        {error && <Error error={error} />}
        <p>
          Don't have an account? <Link to='/register'>Register here</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Home);
