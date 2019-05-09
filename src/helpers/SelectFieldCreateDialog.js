import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import { generateLayout } from './filter';
import { DynamicComponent } from '../components/DynamicComponent';
import mui from '../config/mui';

const LIBMap = {
  MUI: {
    map: mui
  }
};
const customguid = 'modeldialog';

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

const state = {};
state[customguid] = {};
const handleData = (guid, ...args) => {
  const controls = args[0];
  state[guid][controls.id] = getFieldValue(...args);
};

class SelectFieldCreateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    state[customguid] = {};
    this.closeDialog = this.closeDialog.bind(this);
  }

  closeDialog() {
    const props = this.props;
    props.handleClose(state.modeldialog);
    state[customguid] = {};
  }

  render() {
    const props = this.props;
    const {
      open, model, library
    } = props;
    const DIALOG = library.Dialog;
    const DIALOGTITLE = library.DialogTitle;
    const DIALOGCONTENT = library.DialogContent;
    const DIVIDER = library.Divider;
    const BUTTON = library.Button;
    const DIALOGACTIONS = library.DialogActions;
    const {
      data, dialog, dialogtitle, dialogcontent
    } = model;
    const layout = generateLayout(data);
    const config = LIBMap.MUI;
    config.modules = library;
    return (
      <DIALOG
        open={open}
        onClose={this.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        {...dialog}
      >
        <DIALOGTITLE {...dialogtitle} id="alert-dialog-title">{dialogtitle.title}</DIALOGTITLE>
        <DIVIDER />
        <DIALOGCONTENT {...dialogcontent}>
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
                              handleData(customguid, ...args);
                              if (typeof props.onChange === 'function') {
                                props.onChange(...args);
                              }
                            }
                          }
                          onBlur={props.onBlur}
                          onFocus={props.onFocus}
                          onCheck={
                            (...args) => {
                              handleData(customguid, ...args);
                              if (typeof props.onCheck === 'function') {
                                props.onCheck(...args);
                              }
                            }
                          }
                          onToggle={
                            (...args) => {
                              handleData(customguid, ...args);
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
                              handleData(customguid, ...args);
                              if (typeof props.onUpdateInput === 'function') {
                                props.onUpdateInput(...args);
                              }
                            }
                          }
                          onNewRequest={props.onNewRequest}
                          filter={props.filter}
                        />
                      </Col>
                    ))
                  }
                </Row>
              ))
            }
          </div>
        </DIALOGCONTENT>
        <DIVIDER />
        <DIALOGACTIONS>
          <BUTTON onClick={this.closeDialog} color="primary">
            Cancel
          </BUTTON>
          <BUTTON onClick={this.closeDialog} color="primary" autoFocus>
            Save
          </BUTTON>
        </DIALOGACTIONS>
      </DIALOG>
    )
  }
}

SelectFieldCreateDialog.propTypes = {
  open: PropTypes.bool,
  library: PropTypes.object,
  handleClose: PropTypes.func,
  model: PropTypes.object
};

SelectFieldCreateDialog.defaultProps = {
  open: false,
  library: null,
  handleClose: null,
  model: {}
};

export default SelectFieldCreateDialog;
