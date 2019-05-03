import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;
    const PAPER = props.library.Paper;
    const TABLE = props.library[props.component];
    const TABLEBODY = props.library.TableBody;
    const TABLECELL = props.library.TableCell;
    const TABLEHEAD = props.library.TableHead;
    const TABLEROW = props.library.TableRow;
    const tableDetails = props.control.tableDetails;
    return (
      <PAPER {...props.attributes.paper}>
        <TABLE {...props.attributes.table}>
          <TABLEHEAD>
            <TABLEROW>
              {tableDetails.header.map((option, index) => {
                return (<TABLECELL {...option} key={index}>{option.name}</TABLECELL>)
              })}
            </TABLEROW>
          </TABLEHEAD>
          <TABLEBODY>
            {tableDetails.data.map((row, index) => {
              const tableRows = tableDetails.uniqueIdDetails;
              return (
                <TABLEROW {...tableRows} key={index}>
                  {tableDetails.row.map((option, key) => {
                    const value = row[option.name];
                    return (<TABLECELL {...option} key={key}>{value}</TABLECELL>)
                  })}
                </TABLEROW>
              )
            })}
          </TABLEBODY>
        </TABLE>
      </PAPER>
    );
  }
}

Table.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
};
Table.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
};
export default Table;
