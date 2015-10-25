import React from 'react';
import { History } from 'react-router';
import { Styles, TextField, FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Parse from 'parse';

var Login = React.createClass({
  mixins: [History],

  getInitialState(){
    return {
      currentUser: ''
    }
  },

  login(e){
    e.preventDefault();
    let self = this;
    let params = {
      password: this.refs.pw.getValue(),
      email:    this.refs.email.getValue()
    };

    let onSuccess = this.props.onSuccess;
    let close = this.props.close;
    Parse.User.logIn(params.email, params.password, {
      success: function(user) {
        // console.log("success");
        onSuccess();
        close();
        self.history.replaceState(null, '/search');
      },
      error: function(user, error) {
        alert(error.message);
      }
    });

  },

  render() {
    injectTapEventPlugin();
    return (
      <div>
        <form onSubmit={this.login}>
          <div>
            <p>Sign in to Vokou or create a account</p>
          </div>
          <div className="user-input">
            <TextField
              ref="email"
              hintText="email"
              type="email"
              hintStyle={{color: 'grey'}}
              className="email inputfield"/>
            <TextField
              ref="pw"
              hintText="Password"
              type="password"
              hintStyle={{color: 'grey'}}
              className="pw inputfield"/>

          </div>
          <div className="login-toggle">
            <FlatButton
              key={2}
              label="Sign in"
              primary={true}
              className="login-button"
              type="submit"
            />
          </div>
        </form>
        <div className="login-toggle">
          <a onClick={this.props.toggle}>Register</a>
        </div>

      </div>

    );

  }
});

export default Login;
