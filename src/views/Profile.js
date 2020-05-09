import React, { Component } from 'react';
import { withAuth } from '../context/authContext';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <button onClick={this.props.onLogout}>Logout</button>
      </div>
    );
  }
}

export default withAuth(Profile);
