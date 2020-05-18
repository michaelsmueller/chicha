import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export default class VoteButtons extends Component {
  state = { vote: undefined, total: 0 };

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
    const direction = vote?.direction || 0;
    try {
      if (!direction) this.createVote(eventId, newDirection);
      else if (direction === newDirection ) this.removeVote(vote);
      else this.changeVote(vote, newDirection);
    } catch(error) {
      console.log(error);
    }
  }

  createVote = async (eventId, newDirection) => {
    const createResponse = await apiClient.createVote({ eventId, direction: newDirection });
    this.setState({ vote: createResponse.data.newVote });
  }

  removeVote = async (vote) => {
    await apiClient.removeVote(vote._id);
    this.setState({ vote: undefined });
  }

  changeVote = async (vote, newDirection) => {
    const { _id: id } = vote;
    await apiClient.changeVote(id, { direction: newDirection });
    this.setState((prevState) => {
      const vote = {...prevState.vote}
      vote.direction = newDirection;
      return { vote };
    });
  }

  componentDidMount = () => this.setState({ vote: this.props.vote });

  render() {
    const { vote } = this.state;
    const direction = vote?.direction || 0;
    return (
      <div className='votes'>
        <div>vote direction {direction} </div>
        <button onClick={this.handleUpvote}>↑</button>
        {/* <div>{upvotes || 0 - downvotes || 0}</div> */}
        <button onClick={this.handleDownvote}>↓</button>
      </div>
    );
  }
}
