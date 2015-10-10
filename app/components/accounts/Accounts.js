import React from 'react';
import {Styles, Tab, Tabs } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Login from './Login';
import Register from './Register';

let ThemeManager = new Styles.ThemeManager();


var Accounts = React.createClass({
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
      <Tabs>
        <Tab label="Log In" >
          <Login close={this.props.close} onSuccess={this.props.onSuccess}/>
        </Tab>
        <Tab label="Register" >
          <Register close={this.props.close} onSuccess={this.props.onSuccess}/>
        </Tab>
        
      </Tabs>
    );

  }
});

export default Accounts;

