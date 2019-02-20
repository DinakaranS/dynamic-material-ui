import React from 'react';
import PropTypes from 'prop-types';
import * as Controls from './controls/index';

export const DynamicComponent = (props) => {
  const CustomComponent = Controls.default[props.map];
  return <CustomComponent {...props} />;
};

DynamicComponent.propTypes = {
  map: PropTypes.string.isRequired
};

export default DynamicComponent;
