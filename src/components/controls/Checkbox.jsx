import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Checkbox Component */
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
  }
  onCheck(...args) {
    if (typeof this.props.onCheck === 'function') {
      this.props.onCheck(this.props.control, ...args);
    }
  }
  render() {
    const props = this.props;
    const CHECKBOX = props.library[props.component];
    const FORMCONTROL = this.props.library.FormControl;
    const FORMLABEL = this.props.library.FormLabel;
    const FORMGROUP = this.props.library.FormGroup;
    const FORMCONTROLLABEL = this.props.library.FormControlLabel;
    const FORMHELPERTEXT = this.props.library.FormHelperText;
    return (<div style={props.attributes.style}>
      {!this.props.control.options ? <div style={{ display: 'flex' }} >
        <FORMCONTROLLABEL {...props.attributes.formcontrollabel} control={<CHECKBOX {...props.attributes} onChange={this.onCheck} />}
          label={props.attributes.label} />{this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
      </div>:
      <FORMCONTROL {...props.attributes.formcontrol}>
        <div style={{ display: 'flex' }}>
          <FORMLABEL {...props.attributes.formlabel}>{props.attributes.formlabel ? props.attributes.formlabel.text : ''}</FORMLABEL>
          {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
        </div>
        <FORMGROUP {...props.attributes.formgroup}>
          {this.props.control.options.map((option, index) => {
            return (<FORMCONTROLLABEL {...option} control={<CHECKBOX {...option.check} onChange={this.onCheck} />} key={index} />);
          })}
        </FORMGROUP>
        <FORMHELPERTEXT {...props.attributes.formhelpertext}>{props.attributes.formhelpertext ? props.attributes.formhelpertext.text : ''} </FORMHELPERTEXT>
      </FORMCONTROL>}
    </div>);
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
export default Checkbox;
