import React from 'react';
import { TextField, Styles } from 'material-ui';
let ThemeManager = new Styles.ThemeManager();

const Search = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentDidMount: function() {
    var inputOptions = {types: ['(cities)']};
    new google.maps.places.Autocomplete(
      document.getElementById('searchTextField'),
      inputOptions);
    document.getElementById('searchTextField').placeholder = '';
  },
  buttonClick: function() {
    alert(document.getElementById('searchTextField').value);
  },
  // TODO: build dedicated component for google autocomplete e.target.value

  render: function() {
    return (
      <div>
        <TextField
          hintText="Where are you going?"
          floatingLabelText="Destination"
          id="searchTextField" />
        <button onClick={this.buttonClick}>Submit</button>
      </div>
    );
  }

});

export default Search;
