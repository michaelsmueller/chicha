import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

export default class ScanCoupon extends Component {
  state = { result: null }

  handleScan = (couponId) => {
    if (couponId) {
      this.props.setScanned(couponId);
      this.props.openModal('scan');
    }
  }

  handleError = (error) => console.log(error);

  openImageDialog = () => this.refs.qrReader1.openImageDialog();

  render () {
    return (
      <div className='scan-coupon'>
        <QrReader ref='qrReader1' delay={300} onError={this.handleError} onScan={this.handleScan} style={{ width: '100%' }} legacyMode />
        <input type="button" value="Submit QR Code" onClick={this.openImageDialog} />
      </div>
    );
  };
}
