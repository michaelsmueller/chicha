import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { EventPage } from './';

export default class EventDetail extends Component {
  state = { event: {}, status: 'loading', error: ''};

  componentDidMount = () => {
    const { id } = this.props.match.params;
    apiClient
      .getEvent(id)
      .then(({ data }) => {
        const { event } = data;
        this.setState({ event, status: 'loaded' });
      })
      .catch((error) => {
        console.log('caught error EventDetail', error);
        this.setState({ status: 'error', error: error.message });
        })
  }

  render() {
    const { event, status, error } = this.state;
    return <EventPage event={event} status={status} error={error} />
  }
}
