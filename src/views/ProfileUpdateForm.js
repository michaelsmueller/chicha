import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withLoading from '../components/withLoading';
import apiClient from '../services/apiClient';

class ProfileUpdateForm extends Component {
  state = {
    username: this.props.user.username,
    password: '',
    image: this.props.user.image,
    bio: this.props.user.bio,
    url: this.props.user.url,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, image, bio, url } = this.state;
    const user = { username, password, image, bio, url };    
    const id = this.props.user._id;
    apiClient
      .editUser(id, user)
      .then((response) => {
        this.props.history.push(`/profile`);
      })
      .catch((error) => console.log(error))
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, password, image, bio, url } = this.state;
    return (
      <div className='profile-update'>
        <h1>Edit Profile</h1>
        <form onSubmit={this.handleSubmit}>

          <label htmlFor='name'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder={username}
            value={username || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder={password}
            value={password || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='image'>Image</label>
          <input
            type='text'
            name='image'
            id='image'
            placeholder={image}
            value={image || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='bio'>Bio</label>
          <input
            type='text'
            name='bio'
            id='bio'
            placeholder={bio}
            value={bio || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='ticket_uri'>Link</label>
          <input
            type='text'
            name='url'
            id='url'
            placeholder={url}
            value={url || ''}
            onChange={this.handleChange}
          />

          <button type='submit' value='submit'>Save profile</button>
        </form>
      </div>
    );
  }  
}

export default withRouter(withLoading(ProfileUpdateForm));
