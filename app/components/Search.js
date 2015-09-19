import React from 'react';
import { TextField } from 'material-ui';
let ThemeManager = new (require('material-ui/lib/styles/theme-manager'))();

const Search = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  },
  render : function() {
    return (
      <div className="valign-wrapper">
        <TextField className="valign" hintText="Where are you going?" floatingLabelText="Destination" fullWidth={true}/>
      </div>
    );
  }
});

export default Search;