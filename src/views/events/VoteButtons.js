import React, { Component } from 'react';
import apiClient from '../../services/apiClient';

export default class VoteButtons extends Component {
  state = { vote: undefined, votes: undefined };

  handleUpvote = (e) => {
    e.preventDefault();
    this.handleVote(1);
  }

  handleDownvote = (e) => {
    e.preventDefault();
    this.handleVote(-1);
  }

  handleVote = (newDirection) => {
    const { event: { _id: eventId } } = this.props;
    const { vote } = this.state;
    const { direction } = vote || 0;
    try {
      if (!direction) this.createVote(eventId, newDirection);
      else if (direction === newDirection) this.removeVote(vote, newDirection);
      else this.changeVote(vote, newDirection);
    } catch(error) {
      console.log(error);
    }
  }

  createVote = async (eventId, newDirection) => {
    const { votes } = this.state;
    const createResponse = await apiClient.createVote({ eventId, direction: newDirection });
    this.setState({ vote: createResponse.data.newVote, votes: votes + newDirection });
  }

  removeVote = async (vote, newDirection) => {
    const { votes } = this.state;
    const { _id: id, event: eventId } = vote;
    await apiClient.removeVote(id, eventId, -1 * newDirection);
    this.setState({ vote: undefined, votes: votes - newDirection });
  }

  changeVote = async (vote, newDirection) => {
    const { votes } = this.state;
    const { _id: id, event: eventId } = vote;
    await apiClient.changeVote(id, { eventId, direction: newDirection });
    this.setState((prevState) => {
      const vote = {...prevState.vote}
      vote.direction = newDirection;
      return { vote, votes: votes + 2 * newDirection };
    });
  }

  componentDidMount = () => {
    const { vote, event: { votes } } = this.props;
    this.setState({ vote, votes })
  }

  render() {
    const { vote, votes } = this.state;
    const { direction } = vote || 0;
    const upvoteStyle = { color: direction === 1 ? 'red' : 'black' };
    const downvoteStyle = { color: direction === -1 ? 'red' : 'black' };
    return (
      <div className='votes'>
        <button style={upvoteStyle} onClick={this.handleUpvote}>↑</button>
        <div>{votes}</div>
        <button style={downvoteStyle} onClick={this.handleDownvote}>↓</button>
      </div>
    );
  }
}
