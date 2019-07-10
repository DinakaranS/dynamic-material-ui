import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Label Component */
function Label(props) {
  const { library, component, attributes } = props;
  const TYPOGRAPHY = library[component];

  const toolTip = React.useMemo(() => (attributes.tooltip
    ? <TooltipComponent tooltip={attributes.tooltip} /> : null), []);

  const typography = React.useMemo(() => (
    <TYPOGRAPHY {...attributes}>
      {attributes.text}
    </TYPOGRAPHY>
  ), []);

  return (
    <div style={attributes.tooltip ? { display: 'flex' } : null}>
      {typography}
      {toolTip}
    </div>
  )
}

Label.propTypes = {
  attributes: PropTypes.object,
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
};
Label.defaultProps = {
  attributes: null,
  library: null,
};
export default Label;
