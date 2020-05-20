import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export default class AddEvent extends Component {
  state = { url: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    const { url } = this.state;
    apiClient.addEvent({ url })
      .then(({ data: { _id } }) => this.props.history.push(`/events/${_id}`))
      .catch((error) => console.log(error))
  };

  cleanForm = () => this.setState({ url: '' });

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { url } = this.state;
    return (
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
    );
  }
}
