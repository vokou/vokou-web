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

  },
   buttonClick: function() {
       alert(this.refs.searchField.getDOMNode().value);
   },
   render: function() {
       return (
           <div>
               <label htmlFor="searchTextField">
               Please Insert an address:
               </label>
               <br/>
               <input ref='searchField' id="searchTextField" type="text" size="50"/>
               <br/>
               <button onClick={this.buttonClick}>Submit</button>
               <br />
           </div>
           );
   }

});

export default Search;
