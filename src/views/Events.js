import React, { Component } from 'react';

export default class Events extends Component {
  render() {
    return (
      <div>
        <h1>Events</h1>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}
