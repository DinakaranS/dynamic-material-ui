import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-simple-tooltip';

export const ToolTipComponent = (props) => {
  const { tooltip } = props;
  return (
    <Tooltip style={tooltip.style || { top: 35, height: '20px' }}
      arrow={tooltip.arrow || 8}
      background={tooltip.background || '#000'}
      border={tooltip.border || '#000'}
      color={tooltip.color || '#FFF'}
      content={<div style={tooltip.contentstyle || { width: '50px' }}>{tooltip.content || 'Tool Tip'}</div>}
      fadeDuration={tooltip.fadeDuration || 0}
      fadeEasing={tooltip.fadeEasing || 'linear'}
      fixed={tooltip.fixed || false}
      fontFamily={tooltip.fontFamily || 'inherit'}
      fontSize={tooltip.fontSize || '0.7em'}
      offset={tooltip.offset || 0}
      padding={tooltip.padding || 16}
      placement={tooltip.placement || 'right'}
      radius={tooltip.radius || 5}
      zIndex={tooltip.zIndex || 50}>
      <img src={tooltip.imageurl || 'https://s3.amazonaws.com/geoviewer.io/img/icons8-info-48.png'}
        alt=""
        style={tooltip.imagestyle || { width: '20px', height: '20px' }} />
    </Tooltip>
  )
};

ToolTipComponent.propTypes = {
  tooltip: PropTypes.object,
};

ToolTipComponent.defaultProps = {
  tooltip: null,
};

export default ToolTipComponent;
