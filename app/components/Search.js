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
  render: function() {
    return (
      <div>
        <TextField
          hintText="Where are you going?"
          floatingLabelText="Destination"
          id="searchTextField"
          ref="searchField" />
        <button onClick={this.buttonClick}>Submit</button>
        <br />
      </div>
   );
  }

});

export default Search;
