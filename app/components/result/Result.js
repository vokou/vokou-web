import React from 'react';
import Search from '../search/Search';

var Result = React.createClass({
  componentDidMount: function() {
    console.log(this.props.location.query);
  },
  render() {
    return (
      <div>
        <Search searchFields={this.props.location.query} />
        <h1>Result</h1>
      </div>
    );
  }
});

export default Result;