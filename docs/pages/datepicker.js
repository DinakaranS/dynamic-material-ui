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
import PropTypes from 'prop-types';

import { FormGenerator } from '../../src';
import JSONData from '../data/datepicker';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200
  },
});
/** Demo Component */
class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: JSONData
    };
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(...args) {
    // console.log(args)
  }

  render() {
    const { classes } = this.props;
    const { formData } = this.state;
    const sourceCode = `
import { FormGenerator } from 'dynamic-material-ui';
import * as MUI from '@material-ui/core';
// Refer JSON data on the right side column
import JSONData from 'src/path';

class Datepicker extends React.Component {
  render() {
    return (
      <div>
        <FormGenerator
          guid="datepicker"
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
        <p>Date Pickers are used to select a single date for an input.</p>
        <hr />

        <div className="full-width codedemo row">
          <div className="col-md-24">
            <FormGenerator
              guid="datepicker"
              data={formData}
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
        <div>
          <h4>Notes</h4>
          <p>
            <b>wrapperStyle & closeStyle</b>
            {' '}
            are additional props added to change the close & wrapper block style.
          </p>
        </div>
      </Page>
    );
  }
}
Datepicker.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default MUI.withStyles(styles)(Datepicker);