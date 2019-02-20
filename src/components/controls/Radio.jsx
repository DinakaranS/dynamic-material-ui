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
    this.setState({ value });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.control, ...args);
    }
  }

  render() {
    const props = this.props;
    const FORMCONTROL = this.props.library.FormControl;
    const FORMLABEL = this.props.library.FormLabel;
    const RADIOGROUP = this.props.library.RadioGroup;
    const FORMCONTROLLABEL = this.props.library.FormControlLabel;
    const RADIO = this.props.library[props.component];
    // const OPTION = this.props.library[props.option];
    return (<div style={props.attributes.style}>
      {!this.props.control.options ?
        <div style={{ display: 'flex' }} >
          <FORMCONTROLLABEL {...props.attributes.formcontrollabel} control={<RADIO {...props.attributes} value={this.state.value} onChange={this.onChange} />}
            label={props.attributes.label} />{this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
        </div> :
        <FORMCONTROL {...props.attributes.formcontrol}>
          <div style={{ display: 'flex' }}>
            <FORMLABEL {...props.attributes.formlabel}>{props.attributes.formlabel ? props.attributes.formlabel.text : ''}</FORMLABEL>
            {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
          </div>
          <RADIOGROUP {...props.attributes.radiogroup} value={this.state.value} onChange={this.onChange}>
            {this.props.control.options.map((option, index) => {
              return (<FORMCONTROLLABEL {...option} control={<RADIO {...option.radio} />} key={index} />);
            })}
          </RADIOGROUP>
        </FORMCONTROL>}
    </div>)
    // return (
    //   <div>
    //     <div style={{ display: 'flex' }}>
    //       <h3 style={props.attributes.titleStyle}>{props.attributes.title}</h3>
    //       {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
    //     </div>
    //     <RADIO {...props.attributes} onChange={this.onChange}>
    //       {this.props.control.options.map((option, index) => {
    //         return (
    //           <OPTION {...option} key={index}>
    //             {}
    //           </OPTION>
    //         );
    //       })}
    //     </RADIO>
    //   </div>);
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
export default Radio;
