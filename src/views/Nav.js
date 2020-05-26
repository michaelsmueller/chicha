import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/events'>
            <i className='material-icons'>event</i>      
            <br />Events
          </Link>
        </li>
        <li>
          <Link to='/add-event'>
            <i className='material-icons'>note_add</i>      
            <br />Add&nbsp;Event
          </Link>
        </li>
        <li>
          <Link to='/heavyweights'>
            <i className='material-icons md-36'>whatshot</i>      
            <br />Heavies
          </Link>
        </li>
        <li>
          <Link to='/offers'>
            <i className='material-icons md-48'>local_offer</i>      
            <br />Offers
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <i className='material-icons'>face</i>      
            <br />Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
