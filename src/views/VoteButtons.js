import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export default class VoteButtons extends Component {
  state = { vote: 0, total: 0 };

  handleUpvote = (e) => {
    console.log('upvoting');
    e.preventDefault();
    const { event: { _id: id } } = this.props;
    const { vote } = this.state;
    let direction;
    if (vote < 1) direction = 1;
    else direction = 0;
    apiClient.vote({ id, direction })
      .then((response) => this.setState({ vote: direction }))
      .catch((error) => console.log(error))
  }

  handleDownvote = (e) => {
    console.log('downvoting');
    e.preventDefault();
    const { event: { _id: id } } = this.props;
    let { vote } = this.state;
    let direction;
    if (vote > -1) direction = -1;
    else direction = 0;
    apiClient.vote({ id, direction })
      .then((response) => this.setState({ vote: direction }))
      .catch((error) => console.log(error))
  }

  componentDidMount = () => {
    const { user, user: { votes }, event, event: { _id: eventId } } = this.props;
    // console.log('user', user);
    // console.log('event', event);
    if (votes.length) {
      const voteOnThisEvent = votes.filter((vote) => vote.event === eventId);
      if (voteOnThisEvent.length) {
        const { vote } = voteOnThisEvent[0];
        console.log('vote is', vote);
        this.setState({ vote });
        console.log('matching vote', voteOnThisEvent);
      }
    } else {
      // console.log('user has no votes');
    }
    // this.setState({ event: this.props.event });
  }

  render() {
    const { upvotes, downvotes } = this.props.event;
    const { vote } = this.state;
    return (
      <div className='votes'>
        <div>vote state {vote} </div>
        <button onClick={this.handleUpvote}>↑</button>
        <div>{upvotes || 0 - downvotes || 0}</div>
        <button onClick={this.handleDownvote}>↓</button>
      </div>
    );
  }
}
