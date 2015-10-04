import React from 'react';
import {Styles, TextField, FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';



let ThemeManager = new Styles.ThemeManager();


var Register = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    injectTapEventPlugin();

    return (
      <div>
        Username:
        <div>

          <TextField hintText="User name" />
        </div>
        Email:
        <div>
          <TextField hintText="Email address" />
        </div>
        Password:
        <div>
          <TextField hintText="Password" />
        </div>
        <FlatButton
          key={1}
          label="Cancel"
          secondary={true}
          onTouchTap={this.props.close} />
        <FlatButton
          key={2}
          label="Submit"
          primary={true}
          onTouchTap={this.props.submit} />
      </div>
    );

  }
});

export default Register;
