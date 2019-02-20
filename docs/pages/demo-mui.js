import React from 'react';
import PropTypes from 'prop-types';
import { Page, ReactSpecimen } from 'catalog';
import JSONTree from 'react-json-tree';
import Highlight from 'react-highlight';
import 'highlight.js/styles/zenburn.css';
import * as MUI from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeader from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';

import { Aztec } from './../../src';
import JSONData from './../data/simpleform';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

/** Demo Component */
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: JSONData,
      response: '',
      errors: '',
      displayFormErrors: false
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
  }
  onUpdate(...args) {
    console.log(...args);
  }
  onSubmit(response, errors, formData) {
    this.setState({
      response: JSON.stringify(response, null, 2),
      errors: JSON.stringify(errors, null, 2),
      formData,
      displayFormErrors: true
    });
  }
  triggerSubmit(data) {
    this.formRef.click();
  }
  render() {
    const { classes } = this.props;
    const sourceCode = `
import { Aztec } from 'react-aztec';
import * as MUI from '@material-ui/core';
// Refer JSON data on the right side column
import JSONData from 'src/path';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: JSONData,
      displayFormErrors: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
  }
  onSubmit(response, errors, formData) {
    this.setState({
      formData, //!important to reset the formData to retain the updated form values on UI
      displayFormErrors: true //To display field errors
    });
  }
  triggerSubmit(data) {
    this.formRef.click();
  }
  render() {
    return (
      <div>
        <Aztec
          guid="simple-form" //mandatory unique id
          data={this.state.formData}
          displayErrors={this.state.displayFormErrors} //Displays only mandatory field errors
          library={MUI}
          forceUpdate={false} //Default(false) -> Force update the form data
          patch={{ 1 : 'Patched Name' }} //pass patch to update the data partially {"1": "Name"}
          onChange={this.onUpdate}
          formRef={
            (form) => {
              this.formRef = form;
            }
          }
          onSubmit={this.onSubmit}
        />
        <button onClick={this.triggerSubmit}>Submit</button>
      </div>
    )
  }
}
    `
    return (
      <Page>
        <p>Hey stranger, I wanna get to know you better!</p>

        <hr />

        <div className="full-width codedemo row">
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <Aztec
              data={this.state.formData}
              guid="simple-form"
              library={MUI}
              onChange={this.onUpdate}
              patch={{ 1: 'Patched Name', 4: 'xxxxx@gmail.com' }}
              displayErrors={this.state.displayFormErrors}
              formRef={
                (form) => {
                  this.formRef = form;
                }
              }
              onSubmit={this.onSubmit}
            />
            <Button color="primary" variant="contained" onClick={this.triggerSubmit} >Complete Survey</Button>
          </Grid>
          <div className="col-md-12">
            <h4>Refer the response on submit</h4>
            <h4 style={{ color: 'green' }}>Response Form Data</h4>
            <div style={{ fontSize: '14px', color: '#7f7d7d' }}>
              <pre>
                {this.state.response || '<>'}
              </pre>
            </div>
            <h4 style={{ color: 'red' }}>Errors</h4>
            <div style={{ fontSize: '14px', color: '#7f7d7d' }}>
              <pre>
                {this.state.errors || '<>'}
              </pre>
            </div>
          </div>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHeader>
              <TableRow>
                <TableCell>Source Code</TableCell>
                <TableCell>JSON Schema</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="syntax">
                    <Highlight className="javascript">
                      {sourceCode}
                    </Highlight>
                  </div>
                </TableCell>
                <TableCell>
                  <JSONTree data={JSONData} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

      </Page>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default MUI.withStyles(styles)(Demo);
