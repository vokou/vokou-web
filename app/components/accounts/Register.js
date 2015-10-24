import React from 'react';
import { History } from 'react-router';
import {Styles, TextField, FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import servers from '../../config/servers';
import Parse from 'parse';

var Register = React.createClass({
  mixins: [History],

  register(e) {
    e.preventDefault();
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
      })
      .catch((response) =>{
        alert(response);
      });
  },

  render() {
    injectTapEventPlugin();
    return (
      <div>
        <form onSubmit={this.register}>
          <div className="user-input">
            <TextField ref="code"  hintText="Code" className="pw inputfield"/>

            <TextField ref="email"  type="email" hintText="Email address" className="pw inputfield"/>

            <TextField ref="pw"  type="password" hintText="Password" className="pw inputfield"/>
          </div>

          <div className="login-toggle">
            <FlatButton
              key={2}
              label="Register"
              primary={true}
              type="submit"
              
            />
          </div>
        </form>
        <div className="login-toggle">
          <a onClick={this.props.toggle}>Already have a account?</a>
        </div>

      </div>
    );

  }
});

export default Register;
