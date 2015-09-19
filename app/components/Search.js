import React from 'react';

const Search = React.createClass({

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
