import React, { Component } from 'react';
import { EditEventForm } from '/';
import apiClient from '../services/apiClient';

export default class EditEvent extends Component {
  state = {
    event: {},
    isLoading: true,   // to do: refactor by creating content loader
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    apiClient
      .getEvent(id)
      .then(({ data }) => {
        const { event } = data;
        this.setState({ event, isLoading: false });
      })
      .catch((error) => console.log(error))
  }

  render() {
    const { event, isLoading } = this.state;
    console.log('props', this.props);
    if (isLoading) {
      return <div>Loading....</div>
    } else {
      return <EditEventForm event={event} />
    }
  }
}
