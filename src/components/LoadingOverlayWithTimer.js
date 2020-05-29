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
  state = { isTimeLeft: false, seconds: 0, intervalId: undefined };

  timer = () => {
    if (this.state.seconds > 1) this.setState((prevState) => {
      return { seconds: prevState.seconds - 1 };
    }) 
    else this.stopCountdown();
  }

  startCountdown = () => this.setState({
      isTimeLeft: true,
      seconds: LOADING_MESSAGES.length - 1,
      intervalId: setInterval(this.timer, 1000),
  })

  stopCountdown = () => {
    clearInterval(this.state.intervalId);
    this.setState({ isTimeLeft: false, seconds: 0, intervalId: undefined });
    this.props.stopWaiting();
  }

  componentDidMount = () => {
    if (this.props.isActive) this.startCountdown();
  }

  componentWillUnmount = () => clearInterval(this.state.intervalId);

  render() {
    const { children, isActive } = this.props;
    const { isTimeLeft, seconds } = this.state;
    return (
      <LoadingOverlay active={isActive && isTimeLeft} spinner text={LOADING_MESSAGES[seconds]}>
        {children}
      </LoadingOverlay>
    );
  }
}
