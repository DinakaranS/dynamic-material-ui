import React from 'react';
import PropTypes from 'prop-types';
import * as Controls from './controls/index';

export const DynamicComponent = (props) => {
  const { map } = props;
  const CustomComponent = Controls.default[map];
  return <CustomComponent {...props} />;
};

DynamicComponent.propTypes = {
  map: PropTypes.string.isRequired
};

export default DynamicComponent;
