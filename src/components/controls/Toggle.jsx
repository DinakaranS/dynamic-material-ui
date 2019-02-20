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
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(this.props.control, ...args);
    }
  }
  render() {
    const props = this.props;
    const FORMCONTROL = this.props.library.FormControl;
    const FORMLABEL = this.props.library.FormLabel;
    const FORMGROUP = this.props.library.FormGroup;
    const FORMCONTROLLABEL = this.props.library.FormControlLabel;
    const FORMHELPERTEXT = this.props.library.FormHelperText;
    const TOGGLE = props.library[props.component];
    return (<div style={props.attributes.style}>
      {!this.props.control.options ?
        <div style={{ display: 'flex' }} >
          <FORMCONTROLLABEL {...props.attributes.formcontrollabel} control={<TOGGLE {...props.attributes} onChange={this.onToggle} />}
            label={props.attributes.label} />{this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
        </div> :
        <FORMCONTROL {...props.attributes.formcontrol}>
          <div style={{ display: 'flex' }}>
            <FORMLABEL {...props.attributes.formlabel}>{props.attributes.formlabel ? props.attributes.formlabel.text : ''}</FORMLABEL>
            {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
          </div>
          <FORMGROUP {...props.attributes.formgroup}>
            {this.props.control.options.map((option, index) => {
              return (<FORMCONTROLLABEL {...option} control={<TOGGLE {...option.toggle} onChange={this.onToggle} />} key={index} />);
            })}
          </FORMGROUP>
          <FORMHELPERTEXT {...props.attributes.formhelpertext}>{props.attributes.formhelpertext ? props.attributes.formhelpertext.text : ''} </FORMHELPERTEXT>
        </FORMCONTROL>}
    </div>)
    // return (<div style={{ display: 'flex' }}>
    //   <TOGGLE {...props.attributes} onToggle={this.onToggle} />
    //   {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
    // </div>)
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
export default Toggle;
