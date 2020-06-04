import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { Error } from '../';
import { LoadingOverlayWithTimer } from '../../components/';
import { isValidFbEvent, getFbEventId } from '../../helpers/validate';

export default class AddEvent extends Component {
  state = { url: '', isWaiting: false, error: null };

  resetErrorMessage = () => setTimeout(() => this.setState({ error: null }), 3000);

  addEvent = (validUrl) => {
    apiClient.addEvent({ url: validUrl })
      .then(({ data: { _id } }) => {
        this.setState({ isWaiting: false });
        this.props.history.push(`/events/${_id}`);
      })
      .catch(({ response }) => {
        this.setState({ isWaiting: false });
        if (response !== undefined) {
          switch (response.status) {
            case 409:
              this.setState({ error: 'we already have this event in our database' });
              this.resetErrorMessage();
              break;
            default:
              this.setState({ error: 'there was a problem trying to add this event' });
              this.resetErrorMessage();
          }
        } else {
          this.setState({ error: 'cannot connect to server' });
          this.resetErrorMessage();
        }
      })
  }

  validateEvent = () => {
    const { url } = this.state;
    if (!url) {
      this.setState({ error: 'please copy and paste a Facebook event link', isWaiting: false });
      this.resetErrorMessage();
    } else {
      if (isValidFbEvent(url)) {
        const fbEventId = getFbEventId(url);
        const validUrl = `https://facebook.com/events/${fbEventId}`;
        this.addEvent(validUrl);
      }
      else {
        this.setState({ error: 'link is not a valid Facebook event', isWaiting: false });
        this.resetErrorMessage();
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isWaiting: true });
    this.validateEvent();
  };

  stopWaiting = () => this.setState({ isWaiting: false });

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { url, error, isWaiting } = this.state;
    return (
      <LoadingOverlayWithTimer isActive={isWaiting} stopWaiting={this.stopWaiting} key={isWaiting}>
        <div className='add-event'>
          <h1 className='title'>Add Event</h1>
          <form onSubmit={this.handleSubmit} autoComplete='off'>
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
          {error && <Error error={error} />}
        </div>
      </LoadingOverlayWithTimer>
    );
  }
}
