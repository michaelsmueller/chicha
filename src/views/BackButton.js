import React from 'react';
import { withRouter } from 'react-router-dom';

const BackButton = ({ history }) => {
  const handleClick = () => history.goBack();
  return (
    <button onClick={handleClick} className='back-button'>
      &nbsp;<i className='material-icons'>arrow_back_ios</i>
    </button>
  );
};

export default withRouter(BackButton);
