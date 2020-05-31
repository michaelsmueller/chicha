import React from 'react';

const Modal = ({ activeModal, onClose, title, onClear, children }) => {
  if (!activeModal) return null;
  return (
    <div className='modal'>
      <div className='header'>
        <button className='close' onClick={onClose}><i className='material-icons'>close</i></button>
        <h1 className='title'>{title}</h1>
        {onClear && <button className='clear' onClick={onClear}>Clear</button>}
      </div>
      {children}
    </div>
  );
}

export default Modal;
