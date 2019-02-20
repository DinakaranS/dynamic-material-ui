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
  const TYPOGRAPHY = props.library[props.component];
  return (<div style={{ display: 'flex' }} ><TYPOGRAPHY {...props.attributes} > {props.attributes.text} </TYPOGRAPHY>
    {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}</div>)
}
Label.propTypes = {
  attributes: PropTypes.object,
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
};
export default Label;
