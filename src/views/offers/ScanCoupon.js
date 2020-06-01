import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import apiClient from '../../services/apiClient';

export default class ScanCoupon extends Component {
  state = { result: null }

  handleScan = (couponId) => {
    if (couponId) {
      this.props.openModal('scan');
      this.props.setScanned(couponId)
      console.log(couponId);
    }
  }

  handleError = (error) => console.log(error);

  render () {
    return (
      <div className='scan-coupon'>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  };
}
