import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import LoadingOverlay from 'react-loading-overlay';

const LOADING_MESSAGES = [
  'cleaning up',
  'cleaning up',
  'cleaning up',
  'saving event data',
  'saving event data',
  'saving event data',
  'processing event data',
  'processing event data',
  'processing event data',
  'retrieving event data',
  'retrieving event data',
  'retrieving event data',
  'connecting to Facebook',
  'connecting to Facebook',
  'connecting to Facebook',
];

export default class AddEvent extends Component {
  state = { url: '', waiting: false, seconds: 0, intervalId: undefined };

  handleSubmit = (e) => {
    e.preventDefault();
    this.startCountdown();
    const { url } = this.state;
    apiClient.addEvent({ url })
      .then(({ data: { _id } }) => {
        this.stopCountdown();
        this.props.history.push(`/events/${_id}`);
      })
      .catch((error) => {
        this.stopCountdown();
        console.log(error);
      })
  };

  timer = () => {
    if (this.state.seconds > 1) this.setState((prevState) => {
      return { seconds: prevState.seconds - 1 }
    })
    else this.stopCountdown();
  }

  startCountdown = () => {
    this.setState({ seconds: LOADING_MESSAGES.length - 1, waiting: true, intervalId: setInterval(this.timer, 1000) })
  }

  stopCountdown = () => {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: undefined, waiting: false })
  }

  cleanForm = () => this.setState({ url: '' });

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { url, waiting: isActive, seconds } = this.state;
    return (
      <LoadingOverlay active={isActive} spinner text={LOADING_MESSAGES[seconds]}>
        <div className='add-event'>
          <h1>Add Event</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='event-url'>Facebook event link</label>
            <input
              type='text'
              name='url'
              id='event-url'
              placeholder='https://www.facebook.com/events/1652513591570864/'
              value={url}
              onChange={this.handleChange}
            />
            <button type='submit' value='submit'>Add event</button>
          </form>
        </div>
      </LoadingOverlay>
    );
  }
}
