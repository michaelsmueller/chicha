import React, { Component } from 'react';
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

export default class LoadingOverlayWithTimer extends Component {
  state = { isActive: this.props.isActive, seconds: 0, intervalId: undefined };

  timer = () => {
    if (this.state.seconds > 1) this.setState((prevState) => {
      return { seconds: prevState.seconds - 1 }
    })
    else this.stopCountdown();
  }

  startCountdown = () => {
    this.setState({ seconds: LOADING_MESSAGES.length - 1, isActive: true, intervalId: setInterval(this.timer, 1000) })
  }

  stopCountdown = () => {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: undefined, isActive: false })
  }

  render() {
    const { children, isActive } = this.props;
    const { seconds } = this.state;
    return (
      <LoadingOverlay active={isActive} spinner text={LOADING_MESSAGES[seconds]}>
        {children}
      </LoadingOverlay>
    )
  }
}
