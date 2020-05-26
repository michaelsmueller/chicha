import React from 'react';

const Modal = ({ show, onClose, title, onClear, children }) => {
  if(!show) return null;
  return (
    <div className='modal'>
      <div className='header'>
        <button className='close' onClick={onClose}><i className='material-icons'>close</i></button>
        <h1 className='title'>{title}</h1>
        <button className='clear' onClick={onClear}>Clear</button>
      </div>
      {children}
    </div>
  );
}

export default Modal;
