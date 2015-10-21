import React from 'react';
import { LinearProgress, CircularProgress, Styles } from 'material-ui';

var FetchProgress = React.createClass({
  render() {
    return (
      <div>
        <LinearProgress mode="determinate" value={this.props.percentage} />
        <div>
          <CircularProgress size={0.5} /><span id="progress-txt">{this.props.text}</span>
        </div>
      </div>
    );
  }
});

export default FetchProgress;