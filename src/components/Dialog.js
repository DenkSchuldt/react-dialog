
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';

import Button from './Button';

import './Dialog.scss';

import icClose from './../images/ic-close.svg';


const Dialog = (props) => {
  const {
    title, onClose, cancelable, children, onConfirm, onCancel,
    confirmText, cancelText, className, draggable
  } = props;
  let dialog = useRef()
  const onCloseClick = () => {
    dialog.current.classList.add('dnk-dialog-hide-background');
    setTimeout(() => {
      onClose();
    }, 90);
  };
  return (
    <div
      ref={dialog}
      className={`dnk-dialog ${className || ''}`}
      onClick={cancelable ? onCloseClick : undefined}>
      <div style={{ margin: 'auto' }}>
        <Draggable
          disabled={!draggable}
          cancel='.dnk-dialog-body'>
          <div className='dnk-dialog-content-wrapper'>
            <div
              className={`dnk-dialog-content ${draggable ? 'dnk-draggable' : ''}`}
              onClick={e => e.stopPropagation()}>
              <div className='dnk-dialog-content-toolbar'>
                <img
                  onClick={onCloseClick}
                  className='dnk-pointer'
                  src={icClose}
                  alt=''/>
              </div>
              {
                title &&
                <header className='dnk-dialog-header'>
                  { title }
                </header>
              }
              <div className='dnk-dialog-body'>
                { children }
                {
                  (onConfirm || onCancel) &&
                  <div className='dnk-dialog-body-buttons'>
                    {
                      onCancel &&
                      <Button
                        onClick={onCancel}
                        text={cancelText}/>
                    }
                    {
                      onConfirm &&
                      <Button
                        primary
                        onClick={onConfirm}
                        text={confirmText}/>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  )
}

Dialog.propTypes = {
  title: PropTypes.string,
  cancelable: PropTypes.bool,
  draggable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
};

Dialog.defaultProps = {
  draggable: true,
  confirmText: 'OK',
  cancelText: 'CANCEL',
  cancelable: true
};

export default Dialog;
