import React, { Component } from 'react';
import { EditEventForm } from '/';
import apiClient from '../services/apiClient';

export default class EditEvent extends Component {
  state = { event: {}, status: 'loading', error: null };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    apiClient
      .getEvent(id)
      .then(({ data }) => {
        const { event } = data;
        this.setState({ event, status: 'loaded', error: null });
      })
      .catch((error) => this.setState({ status: 'error', error: error.message }))
  }

  render() {
    const { event: { data }, status, error } = this.state;
    const { id } = this.props.match.params;
    return <EditEventForm data={data} id={id} status={status} error={error} />
  }
}
