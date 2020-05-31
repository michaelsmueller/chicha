import React, { Component } from 'react';
import { withAuth } from '../../context/authContext';
import { OffersListContainer, CouponsList } from '../'
import apiClient from '../../services/apiClient';

class Offers extends Component {
  state = { user: null, showing: 'offers' };

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

  render() {
    const { user, showing } = this.state;
    const { points } = user || 0;
    console.log('user', user);
    console.log('showing', showing);
    return (
      <div className='offers'>
        <h1 className='title'>Offers</h1>
        {points && <h2>{points} points</h2>}
        <OffersCouponsButtons setShowing={this.setShowing} />
        {showing === 'offers' && <OffersListContainer />}
        {showing === 'coupons' && <CouponsList coupons={user.coupons} />}
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
