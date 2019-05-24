import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import deburr from 'lodash/deburr';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

function getSuggestions(value, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? suggestions
    : suggestions.filter((suggestion) => {
      const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function AutoComplete(props) {
  const {
    library, attributes, control, onChange
  } = props;
  const { label, id, custominputprops } = attributes;
  const useStyles = library.makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    container: {
      position: 'relative',
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 3,
      marginTop: theme.spacing(0.5),
      left: 0,
      right: 0,
      maxHeight: 180,
      overflowY: 'auto',
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    divider: {
      height: theme.spacing(2),
    },
  }));

  function renderInputComponent(inputProps) {
    const {
      classes, inputRef = () => {
      }, ref, ...other
    } = inputProps;
    const TEXTFIELD = library.TextField;
    return (
      <TEXTFIELD
        fullWidth
        InputProps={{
          inputRef: (node) => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
          ...getInputProps()
        }}
        {...other}
      />
    );
  }

  function getInputProps() {
    if (custominputprops) {
      if (custominputprops.InputAdornment) {
        const INPUTADORMENT = library.InputAdornment;
        const ICON = library.Icon;
        return {
          startAdornment: (
            <INPUTADORMENT {...custominputprops.InputAdornment}>
              {custominputprops.InputAdornment.icon ? (
                <ICON>
                  {custominputprops.InputAdornment.icon}
                </ICON>
              ) : custominputprops.InputAdornment.text || ''}
            </INPUTADORMENT>)
        }
      }
    }
    return {};
  }

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);
    const MENUITEM = library.MenuItem;
    return (
      <MENUITEM selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => (part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )),)}
        </div>
      </MENUITEM>
    );
  }

  const classes = useStyles();
  const [state, setState] = React.useState({
    single: '',
    popper: '',
    [id]: attributes.value || ''
  });

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, control.suggestions));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
    onChange(control, newValue);
  };

  const handleOnSuggestionSelected = (name, newValue) => {
    setState({
      ...state,
      [name]: newValue,
    });
    onChange(control, newValue);
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };
  const PAPER = library.Paper;
  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          id,
          classes,
          label,
          value: state[id],
          onChange: handleChange(id),
          margin: 'normal',
          variant: 'outlined',
          autoComplete: 'nope'
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        shouldRenderSuggestions={() => true}
        renderSuggestionsContainer={options => (
          <PAPER {...options.containerProps} square>
            {options.children}
          </PAPER>
        )}
        onSuggestionSelected={(e, suggestionSelect) => {
          handleOnSuggestionSelected(id, suggestionSelect.suggestionValue);
        }}
      />
    </div>
  )
}

AutoComplete.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
  onChange: PropTypes.func,
};

AutoComplete.defaultProps = {
  library: null,
  attributes: null,
  control: null,
  rules: null,
  onChange: null,
};

export default AutoComplete;
