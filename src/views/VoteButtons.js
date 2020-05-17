import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export default class VoteButtons extends Component {
  state = { direction: 0, total: 0 };

  handleUpvote = (e) => {
    console.log('upvoting');
    e.preventDefault();
    const { event: { _id: id } } = this.props;
    let { direction } = this.state;
    if (direction < 1) direction = 1;
    else direction = 0;
    apiClient.vote({ id, direction })
      .then((response) => this.setState({ direction }))
      .catch((error) => console.log(error))
  }

  handleDownvote = (e) => {
    console.log('downvoting');
    e.preventDefault();
    const { event: { _id: id } } = this.props;
    let { direction } = this.state;
    if (direction > -1) direction = -1;
    else direction = 0;
    apiClient.vote({ id, direction })
      .then((response) => this.setState({ direction }))
      .catch((error) => console.log(error))
  }

  componentDidMount = () => {
    const { user, event } = this.props;
    console.log('user', user);
    console.log('event', event);
    if (user.votes.length) {
      console.log('user has votes');
    } else {
      console.log('user has no votes');
    }
    // this.setState({ event: this.props.event });
  }

  render() {
    const { upvotes, downvotes } = this.props.event;
    const { direction } = this.state;
    return (
      <div className='votes'>
        <div>direction {direction} </div>
        <button onClick={this.handleUpvote}>↑</button>
        <div>{upvotes || 0 - downvotes || 0}</div>
        <button onClick={this.handleDownvote}>↓</button>
      </div>
    );
  }
}
