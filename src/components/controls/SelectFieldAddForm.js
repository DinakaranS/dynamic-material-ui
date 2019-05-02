import React from 'react';
import PropTypes from 'prop-types';
import MultiSelectField, { components } from 'react-select';
import map from 'lodash/map';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import validation from '../../helpers/validation';
import TooltipComponent from '../TooltipComponent';
import { FormGenerator } from '../FormGenerator';
// import { ControlComponent } from '../multiselect/multiSelectCustomControl';

const CustomInput = Icon => (props) => {
  return (
    <div style={{ display: 'flex' }}>
      {Icon}
      <components.Input {...props} />
    </div>
  );
};

/*eslint-disable*/
function inputComponent({ inputRef, ...props }) {
  const style = {display: 'flex', padding: '8px 14px',};
  return <div ref={inputRef} {...props} style={style}/>;
}

/*eslint-disable*/
const CustomControl = library => (props) => {
  const TextField = library.TextField;
  const className = props.selectProps.classes && props.selectProps.classes.input;
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputProps={{
        inputComponent,
        inputProps: {
          className,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
};

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

  onChange(...args) {
    const props = this.props;
    const value = args[0].target.value;
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
    if (typeof props.onChange === 'function') {
      props.onChange(props.control, '', '', value);
    }
  }

  handleChange(selectedOption) {
    const props = this.props;
    this.setState({ selectedOption });
    if (typeof props.onChange === 'function') {
      const s = isArray(selectedOption) ? selectedOption : [selectedOption];
      props.onChange(props.control, '', '', map(s, 'value').join(';'));
    }
  }

  getProperValueForReactSelect() {
    const props = this.props;
    const selectedOption = [];
    const options = props.control.options;
    const o = props.attributes.selected || props.attributes.value;
    const k = isArray(o) ? o : o && o.toString().split(';');
    map(k, function (value) {
      const f = find(options, { value });
      f && selectedOption.push({ value: f.value, label: f.primaryText || f.label || '' });
    });
    return selectedOption
  }

  styles(style = {}) {
    return {
      menu(base) {
        return Object.assign({}, base, { zIndex: '20000 !important' }, style.menu)
      },
      control(base) {
        return Object.assign({}, base, style.control)
      },
      placeholder(base) {
        return Object.assign({}, base, style.placeholder)
      },
      singleValue(base) {
        return Object.assign({}, base, style.singleValue)
      },
      input(base) {
        return Object.assign({}, {
          ...base,
          '& input': {
            font: 'inherit',
          },
        }, style.input)
      },
    }
  }

  get pannelData() {
    const ui = [];
    try {
      const props = this.props;
      const state = this.state;
      const v = state.selectedOption;
      if (v &&isArray(v) &&v.length <= 10) {
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
        for (let i = 0; i < v.length; i += 1) {
          const n = i+1;
          const t = addform.text;
          const text = addform.showselected ? `${t} #${ v[i].label}` : t;
          const guid = addform.guid + n;
          const patch = props.control.patchdata ? props.control.patchdata[guid] || {} : {};
          const k = {
            expansionPanel: { defaultExpanded: addform.defaultExpanded || false },
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
    const SELECTFIELD = props.library[props.component];
    const FORMCONTROL = props.library.FormControl;
    const INPUTLABEL = props.library.InputLabel;
    const FORMHELPERTEXT = props.library.FormHelperText;
    const ICON = props.library.Icon;
    const NOSSR = props.library.NoSsr;
    const OPTION = props.library[props.option];
    const GRID = props.library.Grid;
    const { selectedOption, value, errorText } = this.state;
    const { attributes } = props;
    const size = 12;
    return (<div>
      <div style={{ display: 'flex' }}>
        {props.attributes.nativeselect
          ? (
            <FORMCONTROL {...props.attributes.formControl}>
              <INPUTLABEL htmlFor={props.control.id}>{props.attributes.label}</INPUTLABEL>
              <SELECTFIELD {...attributes}
                           inputProps={{
                             name: props.control.id,
                             id: props.control.id,
                           }}
                           value={value}
                           errorText={errorText}
                           onChange={this.onChange}>
                {props.control.options.map((option, index) => {
                  const primaryText = option.primaryText;
                  option = Object.assign({}, option, { primaryText: null });
                  return (
                    <OPTION {...option} key={index}>
                      {primaryText}
                    </OPTION>
                  );
                })}
              </SELECTFIELD>
              <FORMHELPERTEXT {...attributes.errorStyle}>{props.attributes.errorText}</FORMHELPERTEXT>
            </FORMCONTROL>
          )
          : (
            <div style={Object.assign({}, {
              width: '100%', marginTop: '10px', marginRight: '5px', maxWidth: '100%'
            }, props.attributes.style)}>
              <NOSSR>
                <MultiSelectField {...attributes}
                                  components={{
                                    Input: CustomInput(attributes.inputIcon ? <ICON>{attributes.inputIcon}</ICON> : null),
                                    Control: CustomControl(props.library),
                                  }}
                                  textFieldProps={{
                                    label: attributes.label || attributes.placeholder,
                                    InputLabelProps: {
                                      shrink: true,
                                    },
                                  }}
                                  value={selectedOption}
                                  onChange={this.handleChange}
                                  isMulti={attributes.isMulti}
                                  options={props.control.options.map((option) => {
                                    return { value: option.value, label: option.primaryText || option.label || '' }
                                  })}
                                  styles={this.styles(attributes.componentstyle)} />
              </NOSSR>
            </div>
          )}
        {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}
      </div>
      {props.control.addform && selectedOption && isArray(selectedOption) && (
        <GRID item xs={size} sm={size} md={size} xl={size} lg={size}>
          <FormGenerator data={this.pannelData} library={props.library} guid="" />
        </GRID>
      )}</div>
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
SelectField.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onChange: null,
};
export default SelectField;
