import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormGenerator } from '../FormGenerator';

function TabContainer(props) {
  const { value, control } = props;
  const contentDetails = _.find(control.options, { value });
  if (contentDetails && contentDetails.content){
    const size = 12;
    const GRID = props.library.Grid;
    return (
      <GRID item xs={size} sm={size} md={size} xl={size} lg={size}>
        <FormGenerator data={contentDetails.content.data} library={props.library} guid={contentDetails.content.guid} />
      </GRID>
    )
  }
  return <div />;
}

TabContainer.propTypes = {
  control: PropTypes.object,
  library: PropTypes.object,
  value: PropTypes.string
};

TabContainer.defaultProps = {
  control: null,
  library: null,
  value: null,
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.attributes.value }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const props = this.props;
    const { value } = this.state;
    const TABS = props.library[props.component];
    const APPBAR = props.library.AppBar;
    const TAB = props.library.Tab;
    return (
      <div style={props.attributes.style}>
        <APPBAR {...props.attributes.appBar}>
          <TABS {...props.attributes.tabs} value={value} onChange={this.handleChange}>
            {props.control.options.map((option, index) => {
              return (<TAB {...option} key={index} />)
            })}
          </TABS>
        </APPBAR>
        <TabContainer library={props.library} control={props.control} value={value} />
      </div>
    );
  }
}

Tabs.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
};
Tabs.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
};
export default Tabs;
