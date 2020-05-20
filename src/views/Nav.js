import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/events'>
            Events
          </Link>
        </li>
        <li>
          <Link to='/add-event'>
            Add&nbsp;Event
          </Link>
        </li>
        <li>
          <Link to='/heavyweights'>
            Heavyweights
          </Link>
        </li>
        <li>
          <Link to='/offers'>
            Offers
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
