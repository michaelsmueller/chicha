import React, { Component } from 'react';
import { withAuth } from '../context/authContext';

class Events extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Events</h1>
        <button onClick={this.props.onLogout}>Logout</button>
      </div>
    );
  }
}

export default withAuth(Events);
