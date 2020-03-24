import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Label Component */
function Label(props) {
  const { library, component, attributes } = props;
  const TYPOGRAPHY = library[component];
  const LINK = library.Link;

  const toolTip = React.useMemo(() => (attributes.tooltip
    ? <TooltipComponent tooltip={attributes.tooltip} /> : null), []);

  // const preventDefault = (event) => { event.preventDefault(); console.log('clicked') } ;

  const link = React.useMemo(() => (attributes.link ? (
    <LINK {...attributes.link}>
      {attributes.link.text}
    </LINK>
  ) : null), [attributes.link]);

  const typography = React.useMemo(() => (
    <TYPOGRAPHY {...attributes}>
      {attributes.text}
      {link}
    </TYPOGRAPHY>
  ), [attributes]);

  const style = attributes.containerstyle ? attributes.containerstyle : { display: 'flex' };

  return (
    <div style={style}>
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
