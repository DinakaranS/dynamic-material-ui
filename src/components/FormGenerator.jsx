import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Col, Row } from 'react-flexbox-grid';

import moment from 'moment';
import { DynamicComponent } from './DynamicComponent';
import { generateLayout } from '../helpers/filter';
import mui from '../config/mui';
import validation from '../helpers/validation';

const LIBMap = {
  MUI: {
    map: mui
  }
};

const response = {};

const getFieldValue = (...args) => {
  const a = args[0];
  const type = a.type;
  let value = null;
  switch (type) {
    case 'textfield':
      value = args[2];
      break;
    case 'selectfield':
      value = args[3];
      break;
    case 'toggle':
      value = args[2];
      break;
    case 'autocomplete':
      value = args[1];
      break;
    case 'datetimepicker':
      value = args[1];
      break;
    case 'datepicker':
      value = args[1];
      break;
    case 'timepicker':
      value = args[1];
      break;
    case 'radio':
      value = args[2];
      break;
    case 'checkbox':
      value = args[2];
      break;
    // case 'expansionpannel':
    //   value = args[2];
    //   break;
    case 'textfieldaddform':
      value = args[2];
      break;
    case 'selectfieldaddform':
      value = args[3];
      break;
    default:
      value = '';
  }
  return value;
};

const getAllMandatoryFields = (fields) => {
  const mandatoryFields = [];
  _.each(fields, (field) => {
    if (field.rules) {
      const isMandatory = _.find(field.rules.validation, { rule: 'mandatory' });
      if (isMandatory) {
        mandatoryFields.push(field);
      }
    }
  });
  return mandatoryFields;
};

const getInitialValues = (fields) => {
  const data = {};
  _.each(fields, (field) => {
    if (field.props.value === undefined) {
      data[field.id] = '';
    } else {
      data[field.id] = field.props.value;
    }
  });
  return data;
};

const getFormatedDate = (controls, date) => {
  const format = controls.props.format || 'YYYY-MM-DD HH:mm:ss';
  return controls.props.isutc ? moment.utc(date).format(format) : moment(date).format(format)
};

const updateDateRangePickerResponse = (guid, field, patch = '') => {
  response[guid][field.props.startdatefieldname] = getFormatedDate(field, response[guid][field.props.startdatefieldname] || moment().startOf('day'));
  response[guid][field.props.enddatefieldname] = getFormatedDate(field, response[guid][field.props.enddatefieldname] || moment().endOf('day'));
  if (patch) {
    if (patch[field.props.startdatefieldname] !== undefined) {
      response[guid][field.props.startdatefieldname] = getFormatedDate(field, patch[field.props.startdatefieldname]);
    }
    if (patch[field.props.enddatefieldname] !== undefined) {
      response[guid][field.props.enddatefieldname] = getFormatedDate(field, patch[field.props.enddatefieldname]);
    }
  }
};

const handleData = (guid, ...args) => {
  const controls = args[0];
  if (controls.id) {
    if (controls.type === 'datetimerangepicker') {
      const picker = args[1];
      response[guid][controls.props.startdatefieldname] = getFormatedDate(controls, picker.startDate);
      response[guid][controls.props.enddatefieldname] = getFormatedDate(controls, picker.endDate);
    } else {
      response[guid][controls.id] = getFieldValue(...args);
    }
  }
};

const updateResponse = (fields, patch, guid) => {
  _.each(fields, (field) => {
    if (field.id) {
      if (field.type === 'datetimerangepicker') {
        updateDateRangePickerResponse(guid, field, patch);
      } else if (response[guid][field.id] === '' || response[guid][field.id] === undefined) {
        response[guid][field.id] = field.props.value || field.props.defaultSelected || field.props.defaultChecked || field.props.defaultToggled || field.props.selected || '';
      } else {
        response[guid][field.id] = response[guid][field.id];
      }
      if (patch && patch[field.id] !== undefined) { // Patch update data
        response[guid][field.id] = patch[field.id];
      }
    }
  });
};

const getCurrentFormData = (fields, errors, guid) => {
  const formData = Object.assign([], fields);
  _.map(formData, (field) => {
    if (field.id) {
      if (field.type.indexOf('selectfield') !== -1) {
        field.props.selected = response[guid][field.id];
      } else if (field.type === 'checkbox') {
        field.props.checked = response[guid][field.id];
      } else if (field.type === 'datetimerangepicker') {
        field.props[field.props.startdatefieldname] = response[guid][field.props.startdatefieldname];
        field.props[field.props.enddatefieldname] = response[guid][field.props.enddatefieldname];
      } else {
        field.props.value = response[guid][field.id];
      }
      // const error = _.find(errors, {
      //   id: field.id
      // });
      // if (error) {
      //   field.props.errorText = error.message;
      // } else {
      //   field.props.errorText = '';
      // }
    }
  });
  return formData;
};

const getErrors = (fields, guid) => {
  const mandatoryFields = getAllMandatoryFields(fields);
  const errors = [];
  _.each(mandatoryFields, (field, index) => {
    _.each(field.rules.validation, (rule) => {
      const isClean = validation[rule.rule](response[guid][field.id].toString(), rule.value);
      if (!isClean) {
        const error = Object.assign({}, rule, {
          id: field.id
        });
        errors.push(error);
      }
    });
  });
  return errors;
};

const handleSubmit = (callback, data, guid) => {
  const fields = data;
  const errors = getErrors(data, guid);
  if (typeof callback === 'function') {
    const currentFormData = getCurrentFormData(fields, errors, guid);
    updateResponse(fields, null, guid);
    callback(response, errors, currentFormData);
  }
};

/** FormGenerator */
export const FormGenerator = (props) => {
  const config = LIBMap.MUI;
  const {
    forceUpdate, library, fetchResponse, formRef
  } = props;
  let { data } = props;
  data = JSON.parse(JSON.stringify(data));
  if (!forceUpdate) {
    let errors = [];
    if (props.displayErrors) {
      errors = getErrors(props.data, props.guid);
    }
    response[props.guid] = response[props.guid] || {};
    updateResponse(props.data, props.patch, props.guid);
    data = getCurrentFormData(props.data, errors, props.guid);
  } else {
    response[props.guid] = response[props.guid] || {};
    response[props.guid] = getInitialValues(data);
  }
  const layout = generateLayout(data);
  config.modules = library;
  return (
    <div>
      {
        layout.wrows.map((row, i) => (
          <Row key={i}>
            {
              row.map((field, index) => (
                <Col xs={field.layout.xs ? field.layout.xs.col : 6}
                  sm={field.layout.sm ? field.layout.sm.col : 6}
                  md={field.layout.md ? field.layout.md.col : 6}
                  lg={field.layout.lg ? field.layout.lg.col : 6}
                  style={field.style}
                  className={`${field.className} ${(field.visible === false) ? 'hidden' : 'show'}`}
                  key={index}>
                  <DynamicComponent
                    component={config.map[field.type].type}
                    map={config.map[field.type].map}
                    option={config.map[field.type].options ? config.map[field.type].options.type : ''}
                    control={field}
                    library={config.modules}
                    attributes={field.props}
                    rules={field.rules}
                    formatter={field.formatter}
                    onChange={
                      (...args) => {
                        handleData(props.guid, ...args);
                        if (typeof props.onChange === 'function') {
                          props.onChange(...args);
                        }
                      }
                    }
                    onBlur={props.onBlur}
                    onFocus={props.onFocus}
                    onCheck={
                      (...args) => {
                        handleData(props.guid, ...args);
                        if (typeof props.onCheck === 'function') {
                          props.onCheck(...args);
                        }
                      }
                    }
                    onToggle={
                      (...args) => {
                        handleData(props.guid, ...args);
                        if (typeof props.onToggle === 'function') {
                          props.onToggle(...args);
                        }
                      }
                    }
                    onShow={props.onShow}
                    onDismiss={props.onDismiss}
                    onClick={props.onClick}
                    onUpdateInput={
                      (...args) => {
                        handleData(props.guid, ...args);
                        if (typeof props.onUpdateInput === 'function') {
                          props.onUpdateInput(...args);
                        }
                      }
                    }
                    onNewRequest={props.onNewRequest}
                    filter={props.filter}
                    onSubmitModel={
                      (...args) => {
                        if (typeof props.onSubmitModel === 'function') {
                          props.onSubmitModel(...args);
                        }
                      }
                    }
                  />
                </Col>
              ))
            }
          </Row>
        ))
      }
      {
        layout.worows.map((field, index) => (
          <div key={index}
            style={field.style}
            className={`${field.className} ${(field.visible === false) ? 'hidden' : 'show'}`}>
            {
              <DynamicComponent
                component={config.map[field.type].type}
                map={config.map[field.type].map}
                option={config.map[field.type].options ? config.map[field.type].options.type : ''}
                control={field}
                library={config.modules}
                attributes={field.props}
                rules={field.rules}
                formatter={field.formatter}
                fetchResponse={fetchResponse}
                onChange={
                  (...args) => {
                    handleData(props.guid, ...args);
                    if (typeof props.onChange === 'function') {
                      props.onChange(...args);
                    }
                  }
                }
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                onCheck={
                  (...args) => {
                    handleData(props.guid, ...args);
                    if (typeof props.onCheck === 'function') {
                      props.onCheck(...args);
                    }
                  }
                }
                onToggle={
                  (...args) => {
                    handleData(props.guid, ...args);
                    if (typeof props.onToggle === 'function') {
                      props.onToggle(...args);
                    }
                  }
                }
                onShow={props.onShow}
                onDismiss={props.onDismiss}
                onClick={props.onClick}
                onUpdateInput={
                  (...args) => {
                    handleData(props.guid, ...args);
                    if (typeof props.onUpdateInput === 'function') {
                      props.onUpdateInput(...args);
                    }
                  }
                }
                onNewRequest={props.onNewRequest}
                onSubmitModel={
                  (...args) => {
                    if (typeof props.onSubmitModel === 'function') {
                      props.onSubmitModel(...args);
                    }
                  }
                }
                filter={props.filter}
              />
            }
          </div>
        ))
      }
      <button
        type="button"
        ref={formRef}
        onClick={() => {
          handleSubmit(props.onSubmit, data, props.guid);
        }}
        style={{
          display: 'none'
        }}
      >
        {}
      </button>
    </div>
  );
};

export const ClearFormGeneratorByGuid = (guid = '') => {
  if (guid) {
    delete response[guid]
  }
};

export const ClearFormGeneratorAll = (except = []) => {
  _.map(Object.keys(response), function (k) {
    if (except.indexOf(k) === -1) {
      delete response[k]
    }
  })
};

export const currentFormResponseDataByGuid = (guid) => {
  if (!response[guid]) {
    return '';
  }
  return response[guid];
};

export const allFormResponseData = (guid) => {
  return response;
};

FormGenerator.propTypes = {
  data: PropTypes.array.isRequired,
  library: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onCheck: PropTypes.func,
  onToggle: PropTypes.func,
  onShow: PropTypes.func,
  onDismiss: PropTypes.func,
  onUpdateInput: PropTypes.func,
  onNewRequest: PropTypes.func,
  filter: PropTypes.func,
  response: PropTypes.object,
  onSubmit: PropTypes.func,
  formRef: PropTypes.func,
  forceUpdate: PropTypes.bool,
  displayErrors: PropTypes.bool,
  patch: PropTypes.object,
  guid: PropTypes.string.isRequired,
  fetchResponse: PropTypes.object,
  onSubmitModel: PropTypes.func
};

FormGenerator.defaultProps = {
  library: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onClick: null,
  onCheck: null,
  onToggle: null,
  onShow: null,
  onDismiss: null,
  onUpdateInput: null,
  onNewRequest: null,
  filter: null,
  response: null,
  onSubmit: null,
  formRef: null,
  forceUpdate: null,
  displayErrors: null,
  patch: null,
  fetchResponse: null,
  onSubmitModel: null
};

export default {
  FormGenerator,
  ClearFormGeneratorByGuid,
  ClearFormGeneratorAll,
  currentFormResponseDataByGuid,
  allFormResponseData
};
