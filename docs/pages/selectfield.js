import React from 'react';
import { Page, ReactSpecimen } from 'catalog';
import JSONTree from 'react-json-tree';
import Highlight from 'react-highlight';
import 'highlight.js/styles/zenburn.css';
import * as MUI from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeader from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import { FormGenerator } from './../../src';
import JSONData from './../data/selectfield';
import PropTypes from 'prop-types';

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
class Selectfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    };
    this.onUpdate = this.onUpdate.bind(this);
  }
  onUpdate(...args) {
    const control = args[0];
    const formData = this.state.formData;
    if (control.type === 'textfield') {
      formData[control.id] = args[2];
    }
    this.setState({
      formData
    });
  }
  render() {
    const { classes } = this.props;
    const sourceCode = `
import { FormGenerator } from 'dynamic-material-ui';
import * as MUI from '@material-ui/core';
// Refer JSON data on the right side column
import JSONData from 'src/path';

class SelectField extends React.Component {
  render() {
    return (
      <div>
        <FormGenerator
          guid="selectfield"
          data={JSONData}
          library={MUI}
        />
      </div>
    )
  }
}
    `
    return (
      <Page>
        <p>SelectField is implemented as a controlled selection component.</p>

        <hr />

        <div className="full-width codedemo row">
          <div className="col-md-24">
            <FormGenerator
              guid="selectfield"
              data={JSONData}
              library={MUI}
              onChange={this.onUpdate}
            />
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
Selectfield.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default MUI.withStyles(styles)(Selectfield);
