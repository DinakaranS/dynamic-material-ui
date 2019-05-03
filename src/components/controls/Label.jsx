import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Label Component */
// const Label = props => (<div {...props.attributes}>
//   <div style={{ display: 'flex' }} >
//     <span>{props.attributes.text}</span>
//     {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}</div>
// </div>);
function Label(props) {
  const { library, component, attributes } = props;
  const TYPOGRAPHY = library[component];
  return (
    <div style={{ display: 'flex' }}>
      <TYPOGRAPHY {...attributes}>
        {attributes.text}
      </TYPOGRAPHY>
      {attributes.tooltip && <TooltipComponent tooltip={attributes.tooltip} />}
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
