import React from 'react';
import PropTypes from 'prop-types';
import validation from './../../helpers/validation';
import TooltipComponent from '../TooltipComponent';
import MenuItem from '@material-ui/core/MenuItem';
import MultiSelectField from 'react-select';
import map from 'lodash/map';
import find from 'lodash/find';
import { ControlComponent } from '../multiselect/multiSelectCustomControl';

/** SelectField Component */
class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.attributes.selected,
      errorText: props.attributes.errorText || '',
      selectedOption: this.getProperValueForReactSelect(),
    };
    this.onChange = this.onChange.bind(this);
    this.selectionRenderer = this.selectionRenderer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.attributes.selected,
      errorText: props.attributes.errorText || '',
      selectedOption: this.getProperValueForReactSelect(),
    });
  }

  validate(value) {
    let isValid = true;
    if (this.props.rules && this.props.rules.validation) {
      for (const data of this.props.rules.validation) {
        isValid = validation[data.rule](value, data.value);
        if (!isValid) {
          return {
            isValid: false,
            message: data.message
          };
        }
      }
    }
    return {
      isValid: true,
      message: ''
    };
  }

  onChange(...args) {
    const value = args[0].target.value
    const validator = this.validate(value);
    if (!validator.isValid) {
      this.setState({
        errorText: validator.message,
        value
      });
    } else {
      this.setState({
        errorText: '',
        value
      });
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.control, '', '', value);
    }
  }

  menuItemsDetails(values) {
    return this.props.control.options.map((d, value) => (
      <MenuItem
        key={d.primaryText}
        insetChildren
        checked={values && values.indexOf(d.value) > -1}
        value={d.value}
        primaryText={d.primaryText}
      />
    ));
  }

  selectionRenderer(values) {
    if (!this.props.attributes.multiple) { return this.getProperData(values); }
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return this.getProperData(values[0]);
      default:
        return this.props.control.props.floatingLabelText ? `${values.length} ${this.props.control.props.floatingLabelText.toLowerCase()} selected` :`${values.length} items selected`;
    }
  }

  getProperData(value){
    const b = this.props.control.options.find(function (a) {
      return value && a.value && a.value === value;
    });
    return (b && b.primaryText) || '';
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    // console.log('Option selected:', selectedOption);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.control, '', '', map(selectedOption, 'value'));
    }
  }

  getProperValueForReactSelect(){
    const selectedOption = [];
    const options = this.props.control.options;
    const o = this.props.attributes.selected || this.props.attributes.value;
    map(o, function (value) {
      const f = find(options, { value });
      f && selectedOption.push({ value: f.value, label: f.primaryText || f.label || '' });
    });
    return selectedOption
  }

  static get styles() {
    return { menu(base) { return Object.assign({}, base, { zIndex: '20000 !important' }) } }
  }

  render() {
    const props = this.props;
    const SELECTFIELD = this.props.library[props.component];
    const FORMCONTROL = this.props.library.FormControl;
    const INPUTLABEL = this.props.library.InputLabel;
    const OPTION = this.props.library[props.option];
    const { selectedOption, value } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        {props.attributes.isMulti ?
          <div style={Object.assign({}, { width: '100%', marginTop: '25px', marginRight: '5px', maxWidth: '100%' }, props.attributes.style)}>
            <MultiSelectField menuPlacement={props.attributes.menuPlacement || 'auto'} captureMenuScroll={props.attributes.captureMenuScroll||false} menuShouldScrollIntoView={props.attributes.menuShouldScrollIntoView || false} components={props.attributes.enablefloatingLabel ? { Control: ControlComponent } : null} value={selectedOption} onChange={this.handleChange} isMulti {...props.attributes} options={props.control.options.map((option) => { return { value: option.value, label: option.primaryText || option.label || '' } })} styles={SelectField.styles} />
          </div>:
          <FORMCONTROL {...props.attributes.formControl} >
            <INPUTLABEL htmlFor={props.control.id}>{this.state.value}</INPUTLABEL>
            <SELECTFIELD {...props.attributes}inputProps={{
              name: props.control.id,
              id: props.control.id,
            }} value={this.state.value} errorText={this.state.errorText} onChange={this.onChange} >
              {this.props.control.options.map((option, index) => {
                const primaryText = option.primaryText;
                option = Object.assign({}, option, { primaryText: undefined });
                return (
                  <OPTION {...option} key={index}>
                    {primaryText}
                  </OPTION>
                );
              })}
            </SELECTFIELD>
          </FORMCONTROL>}
        {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
      </div>
    );
  }
}

SelectField.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  option: PropTypes.string.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func
};
export default SelectField;
