/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import validation from '../../helpers/validation';
import TooltipComponent from '../TooltipComponent';
import { getInputProps } from '../../helpers/util';

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

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      errorText: props.attributes.errorText || '',
      value: this.format(props.attributes.value) || ''
    });
  }

  format(value) {
    let formattedValue = value;
    const props = this.props;
    const formatter = props.formatter;
    let number = numeral(value).value() || 0;
    if (props.formatter && props.formatter.func && props.formatter.func.format) {
      number = numeral(number)[props.formatter.func.format.name](props.formatter.func.format.value).value();
      formattedValue = number;
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
    const props = this.props;
    const formatter = props.formatter;
    if (props.formatter && props.formatter.func && props.formatter.func.unformat) {
      unformattedValue = numeral(value)[props.formatter.func.unformat.name](props.formatter.func.unformat.value).value();
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
    const props = this.props;
    if (props.rules && props.rules.validation) {
      for (let i = 0; i < props.rules.validation.length; i += 1) {
        const data = props.rules.validation[i];
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
    const props = this.props;
    const formatter = props.formatter;
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
    const props = this.props;
    this.setState({
      value: args[0].target.value
    });
    const formattedValue = this.getFormattedValue(args[0].target.value);
    if (typeof props.onChange === 'function') {
      props.onChange(props.control, args[0], formattedValue);
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
      props.onBlur(props.control, args[0], formattedValue);
    }
  }

  onFocus(...args) {
    const props = this.props;
    const formattedValue = this.getFormattedValue(args[0].target.value);
    this.setState({
      value: this.unformat(args[0].target.value)
    });
    if (typeof props.onFocus === 'function') {
      props.onFocus(props.control, args[0], formattedValue);
    }
  }

  render() {
    const props = this.props;
    const { value, errorText } = this.state;
    const TEXTFIELD = props.library[props.component];
    return (
      <div style={{ display: 'flex' }}>
        <TEXTFIELD {...props.attributes}
          InputProps={getInputProps(props)}
          value={value}
          error={!!errorText}
          helperText={errorText || ''}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus} />
        {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}
      </div>
    );
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

TextField.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  formatter: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
};
export default TextField;
