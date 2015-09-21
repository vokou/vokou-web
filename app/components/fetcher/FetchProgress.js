import React from 'react';
import { LinearProgress, Styles } from 'material-ui';
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
      <LinearProgress mode="determinate" value={this.props.percentage} />
    );
  }
});

export default FetchProgress;