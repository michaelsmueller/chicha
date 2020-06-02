import React from 'react';
import { getTitle } from '../helpers/string';

const Modal = ({ activeModal, onClose, title, onClear, children }) => {
  if (!activeModal) return null;
  return (
    <div className='modal'>
      <div className='header'>
        <button className='close' onClick={onClose}><i className='material-icons'>close</i></button>
        <h1 className='title'>{getTitle(title)}</h1>
        <div className='clear'>{onClear && <button className='clear' onClick={onClear}>Clear</button>}</div>
      </div>
      {children}
    </div>
  );
}

export default Modal;
