import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import validation from './../../helpers/validation';
import TooltipComponent from '../TooltipComponent';
import Icon from '@material-ui/core/Icon';

/** Textfield Component */
class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.format = this.format.bind(this);
    this.getFormattedValue = this.getFormattedValue.bind(this);
    this.state = {
      errorText: props.attributes.errorText || '',
      value: this.format(props.attributes.value) || this.format(props.attributes.defaultValue) || ''
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      errorText: props.attributes.errorText || '',
      value: this.format(props.attributes.value) || ''
    });
  }
  format(value) {
    let formattedValue = value;
    const formatter = this.props.formatter;
    let number = numeral(value).value() || 0;
    if (this.props.formatter && this.props.formatter.func && this.props.formatter.func.format) {
      formattedValue = number = numeral(number)[this.props.formatter.func.format.name](this.props.formatter.func.format.value).value();
    }
    if (formatter) {
      switch (formatter.type) {
        case 'number':
          formattedValue = numeral(number).format(formatter.expression);
          break;
        default:
          break;
      }
    }
    return formattedValue;
  }
  unformat(value) {
    let unformattedValue = value;
    const formatter = this.props.formatter;
    if (this.props.formatter && this.props.formatter.func && this.props.formatter.func.unformat) {
      unformattedValue = numeral(value)[this.props.formatter.func.unformat.name](this.props.formatter.func.unformat.value).value();
    }
    if (formatter) {
      switch (formatter.type) {
        case 'number':
          unformattedValue = numeral(unformattedValue).value();
          break;
        default:
          break;
      }
    }
    return unformattedValue;
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
  getFormattedValue(val) {
    const formatter = this.props.formatter;
    let value = val;
    if (formatter) {
      switch (formatter.type) {
        case 'number':
          value = numeral(val).value();
          break;
        default:
          break;
      }
    }
    return value;
  }
  onChange(...args) {
    this.setState({
      value: args[0].target.value
    });
    const formattedValue = this.getFormattedValue(args[0].target.value);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.control, args[0], formattedValue);
    }
  }
  onBlur(...args) {
    const props = this.props;
    const validator = this.validate(this.format(args[0].target.value));
    const formattedValue = this.getFormattedValue(args[0].target.value);
    this.setState({
      value: this.format(args[0].target.value)
    });
    if (!validator.isValid) {
      this.setState({
        errorText: validator.message
      });
    } else {
      this.setState({
        errorText: ''
      });
    }
    if (typeof props.onBlur === 'function') {
      props.onBlur(this.props.control, args[0], formattedValue);
    }
  }
  onFocus(...args) {
    const formattedValue = this.getFormattedValue(args[0].target.value);
    this.setState({
      value: this.unformat(args[0].target.value)
    });
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.props.control, args[0], formattedValue);
    }
  }
  getInputProps(props){
    const attributes = props.attributes;
    if (attributes.InputProps){
      if (attributes.InputProps.InputAdornment){
        const INPUTADORMENT = props.library.InputAdornment;
        return { startAdornment: (<INPUTADORMENT {...attributes.InputProps.InputAdornment} > { attributes.InputProps.InputAdornment.icon ? <Icon>{attributes.InputProps.InputAdornment.icon} </Icon> : '' } </INPUTADORMENT>) }
      }
    }
    return {};
  }
  render() {
    const props = this.props;
    const TEXTFIELD = props.library[props.component];
    return (<div style={{ display: 'flex' }}>
      <TEXTFIELD {...props.attributes} InputProps={this.getInputProps(props)} value={this.state.value} error={!!this.state.errorText} helperText={this.state.errorText ? this.state.errorText : ''} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} />
      {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
    </div>);
  }
}

TextField.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  option: PropTypes.string.isRequired,
  rules: PropTypes.object,
  formatter: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};
export default TextField;
