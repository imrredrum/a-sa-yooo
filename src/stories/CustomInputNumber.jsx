import React from 'react';
import PropTypes from 'prop-types';
import CustomInputNumberComponent from '../components/CustomInputNumber';

export function CustomInputNumber(props) {
  return <CustomInputNumberComponent {...props} />;
}

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

CustomInputNumber.defaultProps = {
  min: 0,
  step: 1,
  value: 0,
  onChange: () => {},
  onBlur: () => {},
  disabled: false,
};
