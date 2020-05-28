import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import LoadingOverlayWithTimer from '../../components/LoadingOverlayWithTimer';

export default class AddEvent extends Component {
  state = { url: '', isWaiting: false };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isWaiting: true });
    const { url } = this.state;
    apiClient.addEvent({ url })
      .then(({ data: { _id } }) => {
        console.log('successful response');
        this.setState({ isWaiting: false });
        this.props.history.push(`/events/${_id}`);
      })
      .catch((error) => {
        console.log('error');
        this.setState({ isWaiting: false });
        console.log(error);
      })
  };

  stopWaiting = () => this.setState({ isWaiting: false });

  cleanForm = () => this.setState({ url: '' });

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { url, isWaiting } = this.state;
    return (
      <LoadingOverlayWithTimer isActive={isWaiting} stopWaiting={this.stopWaiting} key={isWaiting}>
        <div className='add-event'>
          <h1 className='title'>Add Event</h1>
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
      </LoadingOverlayWithTimer>
    );
  }
}
