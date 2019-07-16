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

  const labelWrapper = React.useMemo(() => (attributes.tooltip ? (
    <div style={{ display: 'flex' }}>
      {typography}
      {toolTip}
    </div>
  ) : <>{typography}</>));

  return (
    <>
      {labelWrapper}
    </>
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
