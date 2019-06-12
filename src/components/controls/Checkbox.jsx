import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Checkbox Component */
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.attributes.checked || props.attributes.defaultValue || '' };
    this.onCheck = this.onCheck.bind(this);
  }

  onCheck(...args) {
    const checked = args[1];
    const props = this.props;
    this.setState({ checked });
    if (typeof props.onCheck === 'function') {
      props.onCheck(props.control, ...args);
    }
  }

  render() {
    const props = this.props;
    const { checked } = this.state;
    const CHECKBOX = props.library[props.component];
    const FORMCONTROL = props.library.FormControl;
    const FORMLABEL = props.library.FormLabel;
    const FORMGROUP = props.library.FormGroup;
    const FORMCONTROLLABEL = props.library.FormControlLabel;
    const FORMHELPERTEXT = props.library.FormHelperText;
    return (
      <div style={props.attributes.style}>
        {!props.control.options ? (
          <div style={{ display: 'flex' }}>
            <FORMCONTROLLABEL {...props.attributes.formcontrollabel}
              control={<CHECKBOX {...props.attributes} checked={checked || false} onChange={this.onCheck} />}
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
                  return (
                    <FORMCONTROLLABEL {...option}
                      control={<CHECKBOX {...option.check} onChange={this.onCheck} />}
                      key={index} />
);
                })}
              </FORMGROUP>
              <FORMHELPERTEXT {...props.attributes.formhelpertext}>
                {props.attributes.formhelpertext ? props.attributes.formhelpertext.text : ''}
              </FORMHELPERTEXT>
            </FORMCONTROL>
          )}
      </div>
    );
  }
}

Checkbox.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
  onCheck: PropTypes.func
};

Checkbox.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onCheck: null
};
export default Checkbox;
