import React, { Component } from 'react';

export default class DragToResizeDrawer extends Component {
  state = { isResizing: false, lastTouchY: 350 };

  isTouchOnHandle = (clientY) => {
    const distanceFromHandle = Math.abs(clientY - this.state.lastTouchY);
    if (distanceFromHandle < 30) return true;
    else return false;
  }

  onTouchStart = (e) => {
    const { clientY } = e.touches[0];
    const touchIsOnHandle = this.isTouchOnHandle(clientY);
    if (touchIsOnHandle) this.setState({ isResizing: true })
  }

  onTouchEnd = (e) => this.setState({ isResizing: false })

  onTouchMove = (e) => {
    const { isResizing } = this.state;
    const { clientY } = e.touches[0];
    const touchIsOnHandle = this.isTouchOnHandle(clientY);
    if (isResizing & touchIsOnHandle) this.setState({ lastTouchY: clientY });
  }

  componentDidMount = () => {
    document.addEventListener('onTouchStart', this.onTouchStart);
    document.addEventListener('onTouchMove', this.onTouchMove);
    document.addEventListener('onTouchEnd', this.onTouchEnd);
  }

  componentWillUnmount = () => {
    document.removeEventListener('onTouchStart', this.onTouchStart);
    document.removeEventListener('onTouchMove', this.onTouchMove);
    document.removeEventListener('onTouchEnd', this.onTouchEnd);
  }

  calculateTopMargin = () => {
    const { lastTouchY } = this.state;
    const maxTopMargin = window.innerHeight * 0.8;  // mapContainer is height 80vh
    return Math.max(0, lastTouchY < maxTopMargin ? lastTouchY : maxTopMargin );
  }

  render() {
    const marginTop = this.calculateTopMargin();
    const dragHandleStyle = { marginTop };
    const draggerStyle = {
      marginTop: marginTop + 20,
      overflow: this.state.isResizing ? 'hidden' : 'scroll',
      paddingBottom: marginTop + 70,
    }
    return (
      <div className='drag-to-resize-container' onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
        <div className='drag-handle' style={dragHandleStyle}><i className='material-icons'>drag_handle</i></div>
        <div className='dragger' style={draggerStyle}>{this.props.children}</div>
      </div>
    );
  }
}
