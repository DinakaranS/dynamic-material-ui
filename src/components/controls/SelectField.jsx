import React from 'react';
import PropTypes from 'prop-types';
import MultiSelectField, { components } from 'react-select';
import Creatable from 'react-select/creatable';
import map from 'lodash/map';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import validation from '../../helpers/validation';
import TooltipComponent from '../TooltipComponent';
import SelectFieldCreateDialog from '../../helpers/SelectFieldCreateDialog';

const CustomInput = Icon => (props) => {
  return (
    <div style={{ display: 'flex' }}>
      {Icon}
      <components.Input {...props} />
    </div>
  );
};

const createOption = label => ({
  label,
  value: label ? label.toLowerCase().replace(/\W/g, '') : '',
});

/*eslint-disable*/
function inputComponent({inputRef, ...props}) {
  const style = {display: 'flex', padding: '8px 14px', minHeight: 40};
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
      modelopen: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateOption = this.handleCreateOption.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.attributes.selected,
      errorText: props.attributes.errorText || '',
      selectedOption: this.getProperValueForReactSelect(props.attributes.selected),
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
    this.setState({selectedOption});
    if (typeof props.onChange === 'function') {
      const s = isArray(selectedOption) ? selectedOption : [selectedOption];
      props.onChange(props.control, '', '', map(s, 'value').join(';'));
    }
  }

  getProperValueForReactSelect(selected) {
    const props = this.props;
    const selectedOption = [];
    const options = props.control.options;
    const o = selected || props.attributes.selected || props.attributes.value;
    const k = isArray(o) ? o : o && o.toString().split(';');
    map(k, function (value) {
      const f = find(options, {value});
      f && selectedOption.push({value: f.value, label: f.primaryText || f.label || ''});
    });
    return selectedOption
  }

  styles(style = {}) {
    return {
      menu(base) {
        return Object.assign({}, base, {zIndex: '20000 !important'}, style.menu)
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

  handleCreateOption(event) {
    this.setState({modelopen: true});
  };

  handleSave(response) {
    const props = this.props;
    this.setState({modelopen: false});
    this.handleChange(createOption(response[props.control.id]));
    props.onSubmitModel(response, props.control.id);
  }

  handleClose() {
    this.setState({modelopen: false});
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
    const {selectedOption, value, errorText, modelopen} = this.state;
    const {attributes} = props;
    return (
      <div style={{display: 'flex'}}>
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
                  option = Object.assign({}, option, {primaryText: null});
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
                {attributes.isCreatable ?
                  (<Creatable {...attributes}
                              components={{
                                Input: CustomInput(attributes.inputIcon ?
                                  <ICON>{attributes.inputIcon}</ICON> : null),
                                Control: CustomControl(props.library)
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
                                return {
                                  value: option.value,
                                  label: option.primaryText || option.label || ''
                                }
                              })}
                              styles={this.styles(attributes.componentstyle)}
                              onCreateOption={this.handleCreateOption}/>)
                  :
                  (<MultiSelectField {...attributes}
                                     components={{
                                       Input: CustomInput(attributes.inputIcon ?
                                         <ICON>{attributes.inputIcon}</ICON> : null),
                                       Control: CustomControl(props.library)
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
                                       return {value: option.value, label: option.primaryText || option.label || ''}
                                     })}
                                     styles={this.styles(attributes.componentstyle)}/>)}
              </NOSSR>
            </div>
          )}
        {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip}/>}
        {modelopen &&
        <SelectFieldCreateDialog open={modelopen} library={props.library}
                                 handleSave={(response) => {
                                   this.handleSave(response)
                                 }}
                                 handleClose={this.handleClose}
                                 model={props.control.model}/>}
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
  onChange: PropTypes.func,
  onSubmitModel: PropTypes.func
};
SelectField.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onChange: null,
  onSubmitModel: null
};
export default SelectField;
