import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export default class VoteButtons extends Component {
  state = { vote: undefined, total: 0 };

  handleUpvote = async (e) => {
    console.log('upvoting');
    e.preventDefault();
    const { event: { _id: eventId } } = this.props;
    const { vote } = this.state;
    const direction = vote?.direction || 0;
    try {
      switch (direction) {
        case -1:
          const { _id: id } = vote;
          await apiClient.changeVote(id, { eventId, direction: 1 });
          // this.setState({ direction: 1 });
          break;
        case 0:
          const createVoteResponse = await apiClient.createVote({ eventId, direction: 1 });
          this.setState({ vote: createVoteResponse.data.newVote });
          break;
        case 1:
          await apiClient.removeVote(vote._id);
          this.setState({ vote: undefined });
          break;
        default:
          throw new Error('error in vote state');
      };
    } catch(error) {
      console.log(error);
    }
  }

  handleDownvote = async (e) => {
    console.log('downvoting');
    e.preventDefault();
    const { event: { _id: eventId } } = this.props;
    const { vote } = this.state;
    const direction = vote?.direction || 0;
    try {
      switch (direction) {
        case -1:
          await apiClient.removeVote(vote._id);
          this.setState({ vote: undefined });
          break;
        case 0:
          const createVoteResponse = await apiClient.createVote({ eventId, direction: -1 });
          this.setState({ vote: createVoteResponse.data.newVote });
          break;
        case 1:
          const { _id: id } = vote;
          await apiClient.changeVote(id, { eventId, direction: -1 });
          // this.setState({ direction: 1 });
          break;
        default:
          throw new Error('error in vote state');
      };
    } catch(error) {
      console.log(error);
    }
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
