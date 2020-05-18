import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export default class VoteButtons extends Component {
  state = { direction: 0, total: 0 };

  handleUpvote = async (e) => {
    console.log('upvoting');
    e.preventDefault();
    const { event: { _id: eventId } } = this.props;
    const { direction } = this.state;
    try {
      switch (direction) {
        case -1:
          // await apiClient.changeVote({ id, direction: 1 });
          // this.setState({ direction: 1 });
          break;
        case 0:
          await apiClient.createVote({ eventId, direction: 1 });
          this.setState({ direction: 1 });
          break;
        case 1:
          const { _id: id } = this.props.vote;
          await apiClient.removeVote(id);
          this.setState({ direction: 0 });
          break;
        default:
          throw new Error('error in vote state');
      };
    } catch(error) {
      console.log(error);
    }
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
    const { vote } = this.props;
    if (vote) this.setState({ direction: vote.direction });
  }

  render() {
    const { direction } = this.state;
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
