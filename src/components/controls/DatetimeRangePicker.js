import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatetimeRangePickerComponent from '../../helpers/datetimerangepickercomponent';

class DatetimeRangePicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);

    this.state = {
      startDate: props.attributes[props.attributes.startdatefieldname] || moment().startOf('day'),
      endDate: props.attributes[props.attributes.enddatefieldname] || moment().endOf('day'),
      // eslint-disable-next-line react/no-unused-state
      ranges: {
        Today: [moment().startOf('day'), moment()],
        Yesterday: [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
        'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
        'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
    };
  }

  handleEvent(event, picker) {
    const state = this.state;
    const props = this.props;
    const { startDate, endDate } = state;
    if ((startDate !== picker.startDate || endDate !== picker.endDate)
      && event.type !== 'show') {
      const dates = {
        startDate: picker.startDate,
        endDate: picker.endDate,
      };
      this.setState(dates);
      props.onChange(props.control, picker);
    }
  }

  render() {
    const props = this.props;
    const state = this.state;
    const start = state.startDate.format('MMMM D, YYYY');
    const end = state.endDate.format('MMMM D, YYYY');
    let label = `${start} - ${end}`;
    if (start === end) label = start;
    const { attributes, containerStyle, buttonStyle } = props;

    return (
      <div className="bootstrap_style form-group" style={containerStyle || { padding: '10px' }}>
        <div className="date-range-picker">
          <DatetimeRangePickerComponent
            startDate={state.startDate}
            endDate={state.endDate}
            onApply={this.handleEvent}
            {...attributes}
            ranges={attributes.enableranges && state.ranges}
          >
            <button type="button"
              className="selected-date-range-btn btn btn-primary font-awesome"
              style={buttonStyle || {
                      width: '100%',
                      fontSize: '18px',
                      fontWeight: 500,
                      backgroundColor: '#1681FF'
                    }}>
              <div className="pull-left">
                <i className="fa fa-calendar" />
                &nbsp;
                <span>{label}</span>
              </div>
              <div className="pull-right">
                <i className="fa fa-angle-down" />
              </div>
            </button>
          </DatetimeRangePickerComponent>
        </div>
      </div>
    );
  }
}

DatetimeRangePicker.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  option: PropTypes.string.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func
};
DatetimeRangePicker.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onChange: null,
};

export default DatetimeRangePicker;
