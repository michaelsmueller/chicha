import React, { Component } from 'react';

export default class DragToResizeDrawer extends Component {
  state = { isResizing: false, lastTouchY: 350 };

  onTouchStart = (e) => this.setState({ isResizing: true })
  onTouchEnd = (e) => this.setState({ isResizing: false })
  onTouchMove = (e) => this.setState({ lastTouchY: e.touches[0].clientY})

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

  setTopMargin = () => {
    const { lastTouchY } = this.state;
    const maxTopMargin = window.innerHeight * 0.8;  // mapContainer is height 80vh
    return Math.max(0, lastTouchY < maxTopMargin ? lastTouchY : maxTopMargin );
  }

  render() {
    const marginTop = this.setTopMargin();
    const draggerStyle = {
      backgroundColor: 'white',
      marginTop,
      overflow: this.state.isResizing ? 'hidden' : 'scroll',
      paddingBottom: marginTop + 50,
    }
    return (
      <div className='dragger' style={draggerStyle} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
        <div className='drag-handle'><i className='material-icons'>drag_handle</i></div>
        {this.props.children}
      </div>
    );
  }
}
