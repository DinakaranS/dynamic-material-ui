import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Radio Component */
class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.attributes.value || props.attributes.defaultValue || '' };
    this.onChange = this.onChange.bind(this);
  }

  onChange(...args) {
    const value = args[1];
    const props = this.props;
    this.setState({ value });
    if (typeof props.onChange === 'function') {
      props.onChange(props.control, ...args);
    }
  }

  render() {
    const props = this.props;
    const { value } = this.state;
    const FORMCONTROL = props.library.FormControl;
    const FORMLABEL = props.library.FormLabel;
    const RADIOGROUP = props.library.RadioGroup;
    const FORMCONTROLLABEL = props.library.FormControlLabel;
    const RADIO = props.library[props.component];
    return (
      <div style={props.attributes.style}>
        {!props.control.options
          ? (
            <div style={{ display: 'flex' }}>
              <FORMCONTROLLABEL {...props.attributes.formcontrollabel}
                control={<RADIO {...props.attributes} value={value} onChange={this.onChange} />}
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
              <RADIOGROUP {...props.attributes.radiogroup} value={value} onChange={this.onChange}>
                {props.control.options.map((option, index) => {
                  return (<FORMCONTROLLABEL {...option} control={<RADIO {...option.radio} />} key={index} />);
                })}
              </RADIOGROUP>
            </FORMCONTROL>
          )}
      </div>
    )
  }
}

Radio.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  option: PropTypes.string.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func
};
Radio.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onChange: null,
};
export default Radio;
