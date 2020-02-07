import isEmpty from 'lodash/isEmpty';
import React from 'react';

export function getInputProps(props) {
  const attributes = props.attributes;
  const { InputProps = {} } = attributes;
  if (!isEmpty(InputProps)) {
    const { InputAdornment = {} } = InputProps;
    if (!isEmpty(InputAdornment)) {
      const INPUTADORMENT = props.library.InputAdornment;
      const ICON = props.library.Icon;
      const {
        position = 'start', icon, text, textstyle = {}
      } = InputAdornment;
      return {
        [`${position}Adornment`]: (
          <INPUTADORMENT {...InputAdornment}>
            {icon ? (
              <ICON>
                {icon}
              </ICON>
            ) : !isEmpty(textstyle) ? <div style={textstyle}>{text || ''}</div> : text || ''}
          </INPUTADORMENT>)
      }
    }
  }
  return {};
}

export default {
  getInputProps
}
