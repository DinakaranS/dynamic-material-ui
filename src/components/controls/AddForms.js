import React from 'react';
import PropTypes from 'prop-types';
import { FormGenerator } from '../FormGenerator';

class AddForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.control.options || []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidCatch(error, errorInfo) {
  }

  onClick() {
    const state = this.state;
    const props = this.props;
    const options = state.options || [];
    const data = options && options.length > 0 ? options[0].data : props.control.addformtemplate;
    const guid = props.control.addformguidfield + (state.options.length + 1);
    options.push({ data, guid });
    this.setState({ options })
  }

  render() {
    const state = this.state;
    const props = this.props;
    const FAB = props.library.Fab;
    const ICON = props.library.Icon;
    const GRID = props.library.Grid;
    const ICONSTYLE = props.attributes.iconstyle || { };
    const ICONNAME = props.attributes.iconname || 'add';
    return (
      <div style={props.attributes.style}>
        {state.options.map((content, index) => {
          const size = 12;
          return (
            <div key={index}>
              {content ? (
                <GRID item xs={size} sm={size} md={size} xl={size} lg={size}>
                  <FormGenerator data={JSON.parse(JSON.stringify(content.data))} library={props.library} guid={content.guid} patch={content.patch || {}} />
                </GRID>
                ) : <div />}
            </div>
          )
        })}
        <FAB {...ICONSTYLE} onClick={this.onClick}><ICON>{ICONNAME}</ICON></FAB>
      </div>
    );
  }
}

AddForms.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
};
AddForms.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
};
export default AddForms;
