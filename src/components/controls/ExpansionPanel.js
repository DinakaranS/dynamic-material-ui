import React from 'react';
import PropTypes from 'prop-types';
import { FormGenerator } from '../FormGenerator';

class ExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;
    const EXPANSIONPANEL = props.library[props.component];
    const EXPANSIONPANELSUMMARY = props.library.ExpansionPanelSummary;
    const EXPANSIONPANELDETAILS = props.library.ExpansionPanelDetails;
    const TOPOGRAPHY = props.library.Typography;
    const ICON = props.library.Icon;
    const GRID = props.library.Grid;
    return (
      <div style={props.attributes.style}>
        {props.control.options.map((option, index) => {
          const expansionPanel = option.expansionPanel;
          const expandIcon = option.expandIcon;
          const expansionPanelSummary = option.expansionPanelSummary ? option.expansionPanelSummary : {};
          const headerTypography = option.headerTypography ? option.headerTypography : {};
          const expansionPanelDetails = option.expansionPanelDetails ? option.expansionPanelDetails : {};
          const content = option.content ? option.content : null;
          const size = 12;
          return (
            <EXPANSIONPANEL {...expansionPanel} key={index}>
              <EXPANSIONPANELSUMMARY {...expansionPanelSummary}
                expandIcon={
                  <ICON {...expandIcon}>{expansionPanelSummary.icon ? expansionPanelSummary.icon : 'expand_more'}</ICON>
}>
                <TOPOGRAPHY {...headerTypography}>{headerTypography.text ? headerTypography.text : ''}</TOPOGRAPHY>
              </EXPANSIONPANELSUMMARY>
              <EXPANSIONPANELDETAILS {...expansionPanelDetails} style={{ width: 'auto' }}>
                {content ? (
                  <GRID item xs={size} sm={size} md={size} xl={size} lg={size}>
                    <FormGenerator data={JSON.parse(JSON.stringify(content.data))}
                      library={props.library}
                      guid={content.guid}
                      patch={content.patch || {}}
                      forceUpdate={content.forceUpdate || false}
                      onChangeAddForm={props.onChangeAddForm}
                    />
                  </GRID>
                ) : <div />}
              </EXPANSIONPANELDETAILS>
            </EXPANSIONPANEL>
          )
        })}
      </div>
    );
  }
}

ExpansionPanel.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
  onChangeAddForm: PropTypes.func
};
ExpansionPanel.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onChangeAddForm: null
};
export default ExpansionPanel;
