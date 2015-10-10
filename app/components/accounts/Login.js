import React from 'react';
import {Styles, TextField, FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Parse from 'parse';
let ThemeManager = new Styles.ThemeManager();


var Login = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState(){
    return {
      currentUser: ''
    }
  },
  
  login(){
    let params = {
      password: this.refs.pw.getValue(),
      email:    this.refs.email.getValue()
    };
    console.log(this.props.onLogin);
    let onSuccess = this.props.onSuccess;
    let close = this.props.close;
    Parse.User.logIn(params.email, params.password, {
      success: function(user) {
        onSuccess();
        close();
        console.log("success");
      },
      error: function(user, error) {
        console.log(error);
      }
    });
  },

  render() {
    injectTapEventPlugin();
    return (
      <div>
        
        <div>
          <TextField ref="email" hintText="email" type="email"/>
        </div>
        
        <div>
          <TextField ref="pw" hintText="Password" type="password"/>
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
          onTouchTap={this.login} />

      </div>
      
    );

  }
});

export default Login;



