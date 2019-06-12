import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import TooltipComponent from '../TooltipComponent';

function transformAttrs(props) {
  const defaultValue = new Date(moment().startOf('day').add(7, 'hours').format());
  const {
    value,
    minDate,
    maxDate
  } = props.attributes;
  const modifiedAttrs = {
    value: value === 'Invalid date' ? defaultValue : value ? new Date(moment(props.attributes.value).format()) : defaultValue,
    minDate: minDate ? new Date(moment(props.attributes.minDate).format()) : (minDate === undefined) ? undefined : new Date(),
    maxDate: maxDate ? new Date(moment(props.attributes.maxDate).format()) : (maxDate === undefined) ? undefined : new Date()
  };
  return Object.assign({}, props.attributes, modifiedAttrs);
}

/** DatePicker Component */
class DatePicker extends React.Component {
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
    const props = this.props;
    const { transformedAttrs } = this.state;
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
    const MUITHEAMPROVIDER = props.library.MuiThemeProvider;
    const CREATEMUITHEME = props.library.createMuiTheme;
    return (
      <MUITHEAMPROVIDER theme={CREATEMUITHEME({
        zIndex: {
          modal: attributes.zindex || 2000,
        },
        palette: {
          primary: { main: attributes.color || '#4285f4' },
        },
      })}>
        <div style={{ display: 'flex' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker onChange={this.onChange} {...attributes} />
          </MuiPickersUtilsProvider>
          {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}
        </div>
      </MUITHEAMPROVIDER>
    )
  }
}

DatePicker.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  option: PropTypes.string.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func,
};
DatePicker.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onChange: null,
};
export default DatePicker;
