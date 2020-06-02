import React, { Component } from 'react';
// import QrReader from 'react-qr-reader';
import QrReader from 'react-qr-scanner';

export default class ScanCoupon extends Component {
  state = { result: null }

  handleScan = (couponId) => {
    if (couponId) {
      this.props.setScanned(couponId);
      this.props.openModal('scan');
    }
  }

  handleError = (error) => console.log(error);

  render () {
    return (
      <div className='scan-coupon'>
        <QrReader delay={300} onError={this.handleError} onScan={this.handleScan} style={{ width: '100%' }} />
      </div>
    );
  };
}
