import React from 'react';
import { LinearProgress, Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
let ThemeManager = new Styles.ThemeManager();

var Fetcher = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState() {
    return { progress: 0 }
  },
  componentDidMount() {
    setInterval(this.increase, 1000);
  },
  increase() {
    this.setState({ progress: this.state.progress + 5 });
  },
  render() {
    return (
      <LinearProgress mode="determinate" value={this.state.progress} />
    );
  }
});

export default Fetcher;