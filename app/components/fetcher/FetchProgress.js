import React from 'react';
import { LinearProgress, CircularProgress, Styles } from 'material-ui';
let ThemeManager = new Styles.ThemeManager();

var FetchProgress = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
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