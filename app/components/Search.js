import React from 'react';
import { TextField, Styles } from 'material-ui';
let ThemeManager = new Styles.ThemeManager();

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
  changeTest: function(e) {
    // TODO: build dedicated component for google autocomplete
    console.log(e.target.value);
  },

  render: function() {
    return (
      <div>
        <TextField
          hintText="Where are you going?"
          floatingLabelText="Destination"
          id="searchTextField"
          onChange={this.changeTest} />
        <button onClick={this.buttonClick}>Submit</button>
        <br />
      </div>
    );
  }

});

export default Search;
