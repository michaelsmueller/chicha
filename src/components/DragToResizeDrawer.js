import React, { Component } from 'react';

export default class DragToResizeDrawer extends Component {
  state = { isResizing: false, marginTop: 350 };

  isTouchOnHandle = (clientY) => {
    const distanceBelowHandle = clientY - this.state.marginTop;
    if (distanceBelowHandle < 40) return true;
    else return false;
  }

  onTouchStart = (e) => {
    const { clientY } = e.touches[0];
    const touchIsOnHandle = this.isTouchOnHandle(clientY);
    if (touchIsOnHandle) this.setState({ isResizing: true })
  }

  onTouchMove = (e) => {
    const { isResizing } = this.state;
    const { clientY } = e.touches[0];
    const maxTopMargin = window.innerHeight * 0.8; // map container height is 80vh;
    const marginTop = Math.max(0, clientY < maxTopMargin ? clientY : maxTopMargin );
    if (isResizing) this.setState({ marginTop });
  }

  onTouchEnd = (e) => this.setState({ isResizing: false })

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
  render() {
    const { marginTop } = this.state;
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
