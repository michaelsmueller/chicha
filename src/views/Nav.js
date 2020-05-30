import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/events' activeClassName='selected'>
            <i className='material-icons'>event</i>
            <br />Events
          </NavLink>
        </li>
        <li>
          <NavLink to='/add-event' activeClassName='selected'>
            <i className='material-icons'>note_add</i>
            <br />Add&nbsp;Event
          </NavLink>
        </li>
        <li>
          <NavLink to='/heavyweights' activeClassName='selected'>
            <i className='material-icons'>whatshot</i>
            <br />Heavies
          </NavLink>
        </li>
        <li>
          <NavLink to='/offers' activeClassName='selected'>
            <i className='material-icons'>local_offer</i>
            <br />Offers
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile' activeClassName='selected'>
            <i className='material-icons'>face</i>
            <br />Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
