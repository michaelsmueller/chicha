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
      .catch((error) => this.setState({ status: 'error', error }))
  }

  render() {
    const { event, status } = this.state;
    return <EventPage status={status} event={event} />
  }
}
