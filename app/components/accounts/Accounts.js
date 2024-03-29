import React from 'react';
import {Styles, Tab, Tabs } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Login from './Login';
import Register from './Register';
require('./account.css');

var Accounts = React.createClass({
  mixins: [
    require('react-onclickoutside')
  ],

  handleClickOutside (evt){
    this.props.close();
  },

  getInitialState(){
    return {
      displayToggle: true
    }
  },
  toggle(){
    this.setState({
      displayToggle: !this.state.displayToggle
    })
  },
  
  render() {
    injectTapEventPlugin();

    if(this.state.displayToggle){
      var display = <Login type="submit" close={this.props.close} onSuccess={this.props.onSuccess} toggle={this.toggle}/>
    } else {
      var display = <Register type="submit" close={this.props.close} onSuccess={this.props.onSuccess} toggle={this.toggle}/>
    }
    
    return (
      <div className="account">
          {display}
      </div>
    );
  }
});

export default Accounts;

