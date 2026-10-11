
import PropTypes from 'prop-types';

import './Button.scss';


const Button = ({ primary, onClick, text, disabled = false }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      style={{ cursor: disabled ? 'none' : 'pointer' }}
      className={`dnk-btn ${primary ? 'dnk-btn-primary' : ''}`}>
      { text }
    </button>
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired
};

export default Button;
