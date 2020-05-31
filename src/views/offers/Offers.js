import React, { Component } from 'react';
import { withAuth } from '../../context/authContext';
import { Modal } from '../../components/';
import { CouponsList, OfferDetail, OffersListContainer } from '../'
import apiClient from '../../services/apiClient';

class Offers extends Component {
  state = { user: null, showing: 'offers', activeModal: null };

  openModal = (offerId) => {
    console.log('Offers openModel, offerId', offerId);
    this.setState({ activeModal: offerId })
  }
  closeModal = () => this.setState({ activeModal: null })

  componentDidMount = async () => {
    const { userId } = this.props;
    try {
      const userResponse = await apiClient.getUser(userId);
      const { user } = userResponse.data;
      this.setState({ user });
    } catch(error) {
      console.log(error);
    }
  }

  setShowing = (showing) => this.setState({ showing });

  getCoupon = (offer) => {
    console.log('Offers getCoupon');
    console.log('offer', offer);
    apiClient.addCoupon(this.props.userId, offer);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, image, bio, url } = this.state;
    const user = { username, password, image, bio, url };
    const id = this.props.user._id;
    apiClient.editUser(id, user)
      .then((response) => this.props.history.push(`/profile`))
      .catch((error) => console.log(error))
  };

  render() {
    const { user, showing, activeModal } = this.state;
    const { points } = user || 0;
    return (
      <div className='offers'>
        <h1 className='title'>Offers</h1>
        {points && <h2>{points} points</h2>}
        <OffersCouponsButtons setShowing={this.setShowing} />
        {showing === 'offers' && <OffersListContainer openModal={this.openModal} />}
        {showing === 'coupons' && <CouponsList coupons={user.coupons} />}
        <Modal activeModal={activeModal} onClose={this.closeModal} title='Offer'>
          <OfferDetail
            offerId={activeModal}
            getCoupon={this.getCoupon}
            // sort={this.sort} sortBy={sortBy} clearSort={this.clearSort}
            // filter={this.filter} filterBy={filterBy} clearFilter={this.clearFilter}
          />
        </Modal>
      </div>
    );
  }
}

const OffersCouponsButtons = ({ setShowing }) => {
  const handleClick = (e) => setShowing(e.target.value);
  // const sortButtonStyle = { backgroundColor: sortBy ? '#ccfcff' : 'white' };
  // const filterButtonStyle = { backgroundColor: filterBy ? '#ccfcff' : 'white' };
  return (
    <div className='offers-coupons-buttons'>
      <button onClick={handleClick} value='offers'>Offers</button>
      <button onClick={handleClick} value='coupons'>My coupons</button>
    </div>
  )
};

export default withAuth(Offers);
