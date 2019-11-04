import React from 'react';
// import PropTypes from 'prop-types';
import { Page } from 'catalog';
import 'highlight.js/styles/zenburn.css';
import * as MUI from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import SplitPane from 'react-split-pane';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';

import { FormGenerator, ClearFormGeneratorAll, isFormChanged } from '../../src';
import JSONEditor from '../jsoneditor.min';
import JSONData from '../data/sample';

let editor = null;
let container = null;

const styles = (theme) => ({
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  appBar: {
    position: 'relative',
    marginLeft: 400
  },
  flex: {
    flex: 1,
  },
});

/** Demo Component */
class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      mode: 'tree',
      // editor: null,
      data: JSONData,
      // preview: false
    };
    this.switchMode = this.switchMode.bind(this);
    this.importJSON = this.importJSON.bind(this);
    this.exportJSON = this.exportJSON.bind(this);
    // this.toggleView = this.toggleView.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    // create the editor
    const self = this;
    setTimeout(function () {
      const options = {
        onChange: () => {
          self.updateData();
        }
      };
      container = document.getElementById('jsoneditor');

      editor = new JSONEditor(container, options);

      editor.set(self.state.data);
    }, 1000);
  }

  updateData() {
    ClearFormGeneratorAll([]);
    const data = editor.get();
    this.setState({
      data
    });
  }

  importJSON(event) {
    if (event.target.files && event.target.files[0]) {
      const fileTypes = ['json']; // acceptable file types
      const extension = event.target.files[0].name.split('.').pop().toLowerCase(); // file extension from input file
      const isSuccess = fileTypes.indexOf(extension) > -1; // is extension in acceptable types

      if (isSuccess) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const obj = JSON.parse(evt.target.result);
          editor.set(obj);
          this.setState({
            data: obj
          });
        };
        reader.readAsText(event.target.files[0]);
      } else {
        alert('unsuported file format!!!');
      }
    }
  }

  exportJSON() {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    const data = editor.get();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'schema.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  switchMode() {
    const mode = editor.getMode();
    if (mode === 'tree') {
      editor.setMode('text');
      this.setState({
        mode: 'text'
      });
    } else {
      editor.setMode('tree');
      this.setState({
        mode: 'tree'
      });
    }
  }

  // toggleView() {
  //   this.setState({
  //     preview: !this.state.preview
  //   });
  // }

  // TODO: Dynamic form submit
  onSubmit(response, errors, formData) {
    console.log(isFormChanged());
    console.log(response)
  }

  // TODO: Handling on save
  triggerSubmit() {
    this.formRef.click();
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    // const { classes } = this.props;
    const { open, mode, data } = this.state;
    return (
      <Page>
        <div>
          <Dialog
            fullScreen
            open={open}
            onClose={this.handleClose}
          >
            <AppBar style={{
              position: 'relative',
              marginLeft: 400
            }}>
              <Toolbar>
                {/* <IconButton color="inherit" onClick={this.handleClose} aria-label="Close" > */}
                {/* <Icon>close</Icon> */}
                {/* </IconButton> */}
                <IconButton color="inherit" onClick={this.triggerSubmit} aria-label="Close">
                  <Icon>save</Icon>
                </IconButton>
              </Toolbar>
            </AppBar>
            <SplitPane defaultSize={400}>
              <div className="jsoneditor">
                <div id="jsoneditor" className="pull-left">{}</div>
                <Button color="primary" onClick={this.importJSON}>
                  Import JSON
                </Button>
                <Button color="primary" onClick={this.exportJSON}>
                  Export JSON
                </Button>
                <Button color="primary" onClick={this.switchMode}>
                  {`Switch to ${(mode === 'tree') ? 'text' : 'tree'}`}
                </Button>
              </div>
              <div className="dynamic-container">
                <FormGenerator data={data}
                  formRef={
                                 (form) => {
                                   this.formRef = form;
                                 }
}
                  library={MUI}
                  guid={Date.parse(new Date().toISOString()).toString()}
                  onSubmit={this.onSubmit} />
              </div>
            </SplitPane>
          </Dialog>
        </div>
      </Page>
    );
  }
}

// Playground.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Playground;
