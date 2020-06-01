import React, { Component } from 'react';
import { withAuth } from '../../context/authContext';
import { Modal } from '../../components/';
import { CouponsList, OfferDetail, OffersListContainer, ScanCoupon, ScanCouponContainer } from '../'
import apiClient from '../../services/apiClient';

class Offers extends Component {
  state = { user: null, showing: 'offers', activeOfferId: null, activeScannedCouponId: null, activeModal: null };

  openModal = (activeModal) => this.setState({ activeModal });
  closeModal = () => this.setState({ activeModal: null });
  setShowing = (showing) => this.setState({ showing });
  setOffer = (offerId) => this.setState({ activeOfferId: offerId });
  setScanned = (couponId) => this.setState({ activeScannedCouponId: couponId });

  getCoupon = async (offer) => {
    this.setState({ showing: 'coupons', activeModal: null });
    await apiClient.addCoupon(this.props.userId, offer);
    this.getUser();
  }

  getUser = async () => {
    const { userId } = this.props;
    try {
      const userResponse = await apiClient.getUser(userId);
      const { user } = userResponse.data;
      this.setState({ user });
    } catch(error) {
      console.log(error);
    }
  }

  componentDidMount = this.getUser();

  render() {
    const { user, showing, activeOfferId, activeModal } = this.state;
    const { balance } = user || 0;
    return (
      <div className='offers'>
        <h1 className='title'>Offers</h1>
        <div className='balance'><h2>{balance ? balance : <>&nbsp;</> }</h2><p>points</p></div>
        <OffersCouponsButtons showing={showing} setShowing={this.setShowing} user={user} />
        {showing === 'offers' && <OffersListContainer setOffer={this.setOffer} openModal={this.openModal} />}
        {showing === 'coupons' && <CouponsList coupons={user.coupons} />}
        {showing === 'scan' && <ScanCoupon setScanned={this.setScanned} openModal={this.openModal} />}
        <Modal
          activeModal={activeModal}
          onClose={this.closeModal}
          title={activeModal}
          renderItem={() => <OfferDetail offerId={activeOfferId} getCoupon={this.getCoupon} balance={balance} />}
        />
      </div>
    );
  }
}

const OffersCouponsButtons = ({ showing, setShowing, user }) => {
  const handleClick = (e) => setShowing(e.target.value);
  const { partner } = user || '';
  const highlighted = { fontWeight: 600, borderBottom: '2px solid #ee2B7a' };
  const offersButtonStyle = showing === 'offers' ? highlighted : null;
  const couponsButtonStyle = showing === 'coupons' ? highlighted : null;
  const scanButtonStyle = showing === 'scan' ? highlighted : null;
  return (
    <div className='offers-coupons-buttons'>
      <button style={offersButtonStyle} onClick={handleClick} value='offers'>Offers</button>
      <button style={couponsButtonStyle} onClick={handleClick} value='coupons'>My coupons</button>
      {partner && <button style={scanButtonStyle} onClick={handleClick} value='scan'>Scan coupon</button>}
    </div>
  )
};

export default withAuth(Offers);
