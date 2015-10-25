import React from 'react';
import { History } from 'react-router';
import {TextField, FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import servers from '../../config/servers';
import Parse from 'parse';
import reqwest from 'reqwest';

var Register = React.createClass({
  mixins: [History],

  register(e) {
    e.preventDefault();
    let self = this;
    let params = {
      password: this.refs.pw.getValue(),
      email:    this.refs.email.getValue(),
      code:     this.refs.code.getValue()
    };
    let onSuccess = this.props.onSuccess;
    let close = this.props.close;
    reqwest({
      url: `${servers.vokou}users`,
      method: 'post',
      data: params,
      success: function(resp) {
        document.body.style.cursor='default';
        Parse.User.logIn(params.email, params.password, {
          success: function(user) {
            onSuccess();
            close();
            self.history.replaceState(null, '/search');
          },
          error: function(user, error) {
            if(__DEV__)
              console.log(error);
          }
        });
      },
      error: function(err) {
        let res = JSON.parse(err.response);
        if(res.error == "code")
          self.refs.code.setErrorText("Invalid Code");
        if(res.error == "username")
          self.refs.email.setErrorText("Email has been taken");
      }
    })
  },

  render() {
    injectTapEventPlugin();
    return (
      <div>
        <form onSubmit={this.register}>
          <div className="user-input">
            <TextField
              ref="code"
              hintText="Code"
              hintStyle={{color: 'grey'}}
              className="pw inputfield"/>

            <TextField
              ref="email"
              type="email"
              hintText="Email address"
              hintStyle={{color: 'grey'}}
              className="pw inputfield"/>

            <TextField
              ref="pw"
              type="password"
              hintText="Password"
              hintStyle={{color: 'grey'}}
              className="pw inputfield"/>
          </div>

          <div className="login-toggle">
            <FlatButton
              key={2}
              label="Register"
              primary={true}
              type="submit"/>
          </div>
        </form>
        <div></div>
        <div className="login-toggle">
          <a onClick={this.props.toggle}>Already have a account?</a>
        </div>

      </div>
    );

  }
});

export default Register;
