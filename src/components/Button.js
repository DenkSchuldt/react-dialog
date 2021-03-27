
import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';


const Button = ({ primary, onClick, text }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`dnk-btn ${primary ? 'dnk-btn-primary' : ''}`}>
      { text }
    </button>
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
};

export default Button;
