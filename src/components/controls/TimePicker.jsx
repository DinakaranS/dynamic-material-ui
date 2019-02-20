import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import TooltipComponent from '../TooltipComponent';

function transformAttrs(props) {
  const {
    value,
    minDate,
    maxDate
  } = props.attributes;
  const modifiedAttrs = {
    value: value ? new Date(moment(props.attributes.value).format()) : undefined,
    minDate: minDate ? new Date(moment(props.attributes.minDate).format()) : (minDate === undefined) ? undefined : new Date(),
    maxDate: maxDate ? new Date(moment(props.attributes.maxDate).format()) : (maxDate === undefined) ? undefined : new Date()
  };
  const attrs = Object.assign({}, props.attributes, modifiedAttrs);
  return attrs;
}

/** DatePicker Component */
class DatePickerCustom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
      attributes: props ? transformAttrs(props) : {},
      transformedAttrs: props ? transformAttrs(props) : {}
    };

    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(props) {
    const attrs = transformAttrs(props);
    this.setState({
      attributes: attrs,
      transformedAttrs: attrs
    });
  }
  onChange(...args) {
    const attrs = Object.assign({}, this.state.transformedAttrs, {
      value: args[0]
    });
    this.setState({
      attributes: attrs
    });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.control, ...args);
    }
  }
  render() {
    return (<div style={{ display: 'flex' }}><MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker onChange={this.onChange} {...this.state.attributes} />
    </MuiPickersUtilsProvider>
      {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
    </div>)
  }
}

DatePickerCustom.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  option: PropTypes.string.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func,
};
export default DatePickerCustom;
