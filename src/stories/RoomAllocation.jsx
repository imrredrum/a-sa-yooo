import React from 'react';
import PropTypes from 'prop-types';
import RoomAllocationComponent from '../pages/RoomAllocation';

export function RoomAllocation(props) {
  return <RoomAllocationComponent {...props} />;
}

RoomAllocation.propTypes = {
  guest: PropTypes.number,
  room: PropTypes.number,
  onChange: PropTypes.func,
};

RoomAllocation.defaultProps = {
  guest: 0,
  room: 0,
  onChange: (result) => console.log(result),
};
