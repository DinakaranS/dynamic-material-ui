import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Toggle Component */
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(...args) {
    const props = this.props;
    if (typeof props.onToggle === 'function') {
      props.onToggle(props.control, ...args);
    }
  }

  render() {
    const props = this.props;
    const FORMCONTROL = props.library.FormControl;
    const FORMLABEL = props.library.FormLabel;
    const FORMGROUP = props.library.FormGroup;
    const FORMCONTROLLABEL = props.library.FormControlLabel;
    const FORMHELPERTEXT = props.library.FormHelperText;
    const TOGGLE = props.library[props.component];
    return (
      <div style={props.attributes.style}>
        {!props.control.options
          ? (
            <div style={{ display: 'flex' }}>
              <FORMCONTROLLABEL {...props.attributes.formcontrollabel}
                control={<TOGGLE {...props.attributes} onChange={this.onToggle} />}
                label={props.attributes.label} />
              {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}
            </div>
          )
          : (
            <FORMCONTROL {...props.attributes.formcontrol}>
              <div style={{ display: 'flex' }}>
                <FORMLABEL {...props.attributes.formlabel}>{props.attributes.formlabel ? props.attributes.formlabel.text : ''}</FORMLABEL>
                {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}
              </div>
              <FORMGROUP {...props.attributes.formgroup}>
                {props.control.options.map((option, index) => {
                  return (<FORMCONTROLLABEL {...option} control={<TOGGLE {...option.toggle} onChange={this.onToggle} />} key={index} />);
                })}
              </FORMGROUP>
              <FORMHELPERTEXT {...props.attributes.formhelpertext}>
                {props.attributes.formhelpertext ? props.attributes.formhelpertext.text : ''}
              </FORMHELPERTEXT>
            </FORMCONTROL>
          )}
      </div>
    )
  }
}

Toggle.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
  onToggle: PropTypes.func
};

Toggle.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onToggle: null,
};
export default Toggle;
