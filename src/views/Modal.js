import React from 'react';

const Modal = ({ show, onClear, onClose, title, children }) => {
  if(!show) return null;
  return (
    <div className='modal'>
      <div className='header'>
        <button className='close' onClick={onClose}>
          <i className='material-icons'>close</i>    
        </button>
        <h1 className='title'>{title}</h1>
        <button onClick={onClear}>Clear</button>
      </div>
      {children}
    </div>
  );
}

export default Modal;
