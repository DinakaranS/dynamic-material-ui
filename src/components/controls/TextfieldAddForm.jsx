import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Icon from '@material-ui/core/Icon';
import validation from '../../helpers/validation';
import TooltipComponent from '../TooltipComponent';
import { FormGenerator } from '../FormGenerator';

/** Textfield Component */
class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    // this.onFocus = this.onFocus.bind(this);
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

  // onBlur(...args) {
  //   const props = this.props;
  //   const validator = this.validate(this.format(args[0].target.value));
  //   const formattedValue = this.getFormattedValue(args[0].target.value);
  //   this.setState({
  //     value: this.format(args[0].target.value)
  //   });
  //   if (!validator.isValid) {
  //     this.setState({
  //       errorText: validator.message
  //     });
  //   } else {
  //     this.setState({
  //       errorText: ''
  //     });
  //   }
  //   if (typeof props.onBlur === 'function') {
  //     props.onBlur(props.control, args[0], formattedValue);
  //   }
  // }
  //
  // onFocus(...args) {
  //   const props = this.props;
  //   const formattedValue = this.getFormattedValue(args[0].target.value);
  //   this.setState({
  //     value: this.unformat(args[0].target.value)
  //   });
  //   if (typeof props.onFocus === 'function') {
  //     props.onFocus(props.control, args[0], formattedValue);
  //   }
  // }

  getInputProps(props){
    const attributes = props.attributes;
    if (attributes.InputProps){
      if (attributes.InputProps.InputAdornment){
        const INPUTADORMENT = props.library.InputAdornment;
        return {
          startAdornment: (
            <INPUTADORMENT {...attributes.InputProps.InputAdornment}>
              { attributes.InputProps.InputAdornment.icon ? (
                <Icon>
                  {attributes.InputProps.InputAdornment.icon}
                </Icon>
              ) : '' }
            </INPUTADORMENT>)
        }
      }
    }
    return {};
  }

  get pannelData() {
    const ui = [];
    try {
      const props = this.props;
      const state = this.state;
      const v = state.value;
      if (v && v <= 10) {
        const p = {
          id: 'expansionpannel',
          type: 'expansionpannel',
          props: {
            id: 'expansionpannel',
            style: {
              marginTop: 15
            }
          },
          options: [],
          layout: {
            xs: {
              col: 12
            },
            sm: {
              col: 12
            },
            md: {
              col: 12
            },
            lg: {
              col: 12
            }
          }
        };
        const addform = props.control.addform;
        const data = addform.data || [];
        for (let i = 0; i < v; i += 1) {
          const n = i+1;
          const t = addform.text;
          const text = addform.shownumber ? `${t} #${n}` : t;
          const guid = addform.guid + n;
          const patch = props.control.patchdata ? props.control.patchdata[guid] || {} : {};
          const k = {
            expansionPanel: {},
            expansionPanelSummary: {
              icon: 'expand_more',
            },
            headerTypography: { text },
            expansionPanelDetails: {
              style: { width: '100%' }
            },
            content: { guid, data, patch }
          };
          p.options.push(k);
        }
        ui.push(p)
      }
    } catch (e) {
      console.log(e)
    }
    return ui;
  }

  render() {
    const props = this.props;
    const state = this.state;
    const { value, errorText } = this.state;
    const TEXTFIELD = props.library[props.component];
    const GRID = props.library.Grid;
    const size = 12;
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <TEXTFIELD {...props.attributes} InputProps={this.getInputProps(props)} value={value} error={!!errorText} helperText={errorText || ''} onChange={this.onChange} />
          {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}
        </div>
        {props.control.addform && state.value && state.value <= 10 && (
        <GRID item xs={size} sm={size} md={size} xl={size} lg={size}>
          <FormGenerator data={this.pannelData} library={props.library} guid="" />
        </GRID>
)}
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
