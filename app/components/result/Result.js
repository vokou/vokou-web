import React from 'react';

var Result = React.createClass({
  componentDidMount: function() {
    console.log(this.props.location.query);
  },
  render : function() {
    return (
      <h1>Result</h1>
    );
  }
});

export default Result;