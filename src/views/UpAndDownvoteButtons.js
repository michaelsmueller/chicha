import React, { Component } from 'react';

export default class UpAndDownvoteButtons extends Component {
  handleUpvote = (e) => {
    e.preventDefault();
    const { eventId } = this.props;
    console.log('upvoting event', eventId);
    // upvoteEvent(eventId);
  }

  handleDownvote = (e) => {
    e.preventDefault();
    const { eventId } = this.props;
    console.log('downvoting event', eventId);
    // downvoteEvent(eventId);
  }

  render() {
    const { upvotes, downvotes } = this.props;
    return (
      <div className='votes'>
        <button onClick={this.handleUpvote}>↑</button>
        <div>{upvotes - downvotes}</div>
        <button onClick={this.handleDownvote}>↓</button>
      </div>
    );
  }
}
