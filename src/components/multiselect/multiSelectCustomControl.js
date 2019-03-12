import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

export const ControlComponent = (props) => {
  const { selectProps } = props;
  return (
    <div style={selectProps.floatingLabelStyles}>
      <p style={selectProps.floatingLabelTextStyles}>{selectProps.floatingLabelText}</p>
      <components.Control {...props} />
    </div>
  );
};

ControlComponent.propTypes = {
  selectProps: PropTypes.object.isRequired,
};

export default ControlComponent;
