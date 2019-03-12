import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
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
    const { transformedAttrs } = this.state;
    const props = this.props;
    const attrs = Object.assign({}, transformedAttrs, {
      value: args[0]
    });
    this.setState({
      attributes: attrs
    });
    if (typeof props.onChange === 'function') {
      props.onChange(props.control, ...args);
    }
  }

  render() {
    const props = this.props;
    const { attributes } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker onChange={this.onChange} {...attributes} />
        </MuiPickersUtilsProvider>
        {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}
      </div>
    )
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

DatePickerCustom.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onChange: null,
};
export default DatePickerCustom;
