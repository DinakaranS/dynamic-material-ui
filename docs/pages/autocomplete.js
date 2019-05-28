/* eslint-disable */
import React from 'react';
import { Page } from 'catalog';
import JSONTree from 'react-json-tree';
import Highlight from 'react-highlight';
import 'highlight.js/styles/zenburn.css';
import * as MUI from '@material-ui/core';
// import RaisedButton from '@material-ui/core/RaisedButton'; //
import {
 Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from '@material-ui/core/Table';

import { FormGenerator } from '../../src';
import JSONData from '../data/autocomplete';


/** Demo Component */
class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    };
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(...args) {
    const control = args[0];
    const state = this.state;
    const formData = state.formData;
    if (control.type === 'textfield') {
      formData[control.id] = args[2];
    }
    this.setState({
      formData
    });
  }

  render() {
    const sourceCode = `
import { FormGenerator } from 'dynamic-material-ui';
import * as MUI from '@material-ui/core';
// Refer JSON data on the right side column
import JSONData from 'src/path';

class AutoComplete extends React.Component {
  render() {
    return (
      <div>
        <FormGenerator
          guid="autocomplete"
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
        <p>The auto-complete is an extension of a regular text-field that will auto-complete the input dynamically. It can take different auto-complete filters and uses a menu to display suggestions.</p>

        <hr />

        <div className="full-width codedemo row">
          <div className="col-md-24">
            <FormGenerator
              guid="autocomplete"
              data={JSONData}
              library={MUI}
              onUpdateInput={this.onUpdate}
            />
          </div>
        </div>

        <div className="codeblock">
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Source Code</TableHeaderColumn>
                <TableHeaderColumn>JSON Schema</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>
                  <div className="syntax">
                    <Highlight className="javascript">
                      {sourceCode}
                    </Highlight>
                  </div>
                </TableRowColumn>
                <TableRowColumn>
                  <JSONTree data={JSONData} />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Page>
    );
  }
}

export default AutoComplete;
