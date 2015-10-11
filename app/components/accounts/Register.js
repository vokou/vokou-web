import React from 'react';
import { History } from 'react-router';
import {Styles, TextField, FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import servers from '../../config/servers';
import Parse from 'parse';

let ThemeManager = new Styles.ThemeManager();


var Register = React.createClass({
  mixins: [History],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  submit() {

    let params = {
      password: this.refs.pw.getValue(),
      email:    this.refs.email.getValue(),
      code:     this.refs.code.getValue()
    };
    let onSuccess = this.props.onSuccess;
    let close = this.props.close;
    axios
      .post(servers.vokou + 'users',
            {password: this.refs.pw.getValue(),
             email:    this.refs.email.getValue(),
             code:     this.refs.code.getValue()})
      .then((response) => {
        Parse.User.logIn(params.email, params.password, {
          success: function(user) {
            onSuccess();
            close();
            self.history.replaceState(null, '/search');
          },
          error: function(user, error) {
            console.log(error);
          }
        });
      });
  },

  render() {
    injectTapEventPlugin();
    return (
      <div>
        <div>
          <TextField ref="code" floatingLabelText="Code" hintText="Code" />
        </div>

        <div>
          <TextField ref="email" floatingLabelText="Email" type="email" hintText="Email address" />
        </div>

        <div>
          <TextField ref="pw" floatingLabelText="Password" type="password" hintText="Password" />
        </div>
        <FlatButton
          key={2}
          label="Register"
          primary={true}
          onTouchTap={this.submit} />
        <FlatButton
          key={1}
          label="Cancel"
          secondary={true}
          onTouchTap={this.props.close} />
        <div>
          <a onClick={this.props.toggle}>Already have a account?</a>
        </div>
      </div>
    );

  }
});

export default Register;
