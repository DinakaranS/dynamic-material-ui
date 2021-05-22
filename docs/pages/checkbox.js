import React from 'react';
import PropTypes from 'prop-types';
import { Page, ReactSpecimen } from 'catalog';
import JSONTree from 'react-json-tree';
import Highlight from 'react-highlight';
import 'highlight.js/styles/zenburn.css';
import * as MUI from '@material-ui/core';

// Material-ui/core
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeader from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import { FormGenerator } from '../../src';
import JSONData from '../data/checkbox';

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
    width: 200,
  },
});
/** Demo Component */
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    Checkbox.onUpdate = Checkbox.onUpdate.bind(this);
  }

  static onUpdate(...args) {
    const control = args[0];
    // console.warn(args);
  }

  render() {
    const { classes } = this.props;
    const sourceCode = `
import { FormGenerator } from 'dynamic-material-ui';
import * as MUI from '@material-ui/core';
// Refer JSON data on the right side column
import JSONData from 'src/path';

class Checkbox extends React.Component {
  render() {
    return (
      <div>
        <FormGenerator
          guid="checkbox"
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
        <p>A checkbox is used to verify which options you want selected from a group.</p>

        <hr />

        <div className="full-width codedemo row">
          <div className="col-md-24">
            <FormGenerator
              guid="checkbox"
              data={JSONData}
              library={MUI}
              onCheck={Checkbox.onUpdate}
              patch={{ vikings: false }}
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
Checkbox.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default MUI.withStyles(styles)(Checkbox);
