import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { Link } from 'react-router-dom';
import { withAuth } from '../context/authContext';

class Profile extends Component {
  state = { user: {}, status: 'loading', error: null };

  componentDidMount = () => {
    const { userId } = this.props;
    apiClient
      .getUser(userId)
      .then(({ data }) => {
        const { user } = data;
        this.setState({ user, status: 'loaded', error: null });
      })
      .catch((error) => this.setState({ status: 'error', error: error.message }))
  }

  deleteUser = () => {
    const { user: { _id } } = this.state;
    const { onLogout } = this.props;
    apiClient
      .deleteUser(_id)
        .then(() => onLogout())
        .catch((error) => this.setState({ status: 'error', error: error.message }))
  }

  render() {
    const { onLogout } = this.props;
    const { user: { username, image, bio, url } } = this.state;
    return (
      // need to use a loader here
      <div className='profile'>
        {image && <img alt='portrait' src={image} />}
        <h1>{username}</h1>
        {bio && <p className='bio'>{bio}</p>}
        {url && <a href={url}>{url}</a>}
        <br />
        <Link to='/profile/edit'><button>Edit profile</button></Link>
        <button onClick={this.deleteUser}>Delete profile</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  }
}

export default withAuth(Profile);
