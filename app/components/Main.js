import React from 'react';
import { History } from 'react-router';
import {Styles, Dialog, FlatButton, RaisedButton} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Accounts from './accounts/Accounts';
import Parse from 'parse';
require('./main.css');

let ThemeManager = new Styles.ThemeManager();

const Main = React.createClass({
  mixins: [History],
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
      logedIn: false,
      showLogin: false
    }
  },

  componentWillMount() {
    if(Parse.User.current()){
      this.setState({logedIn: true});
    }
  },

  toggleLogin() {
    this.setState({
      logedIn: this.state.logedIn,
      showLogin: !this.state.showLogin
    })
  },

  openLogin(){
    //this.refs.accountDialog.show();
    this.setState({
      logedIn: this.state.logedIn,
      showLogin: true
    })
  },
  
  closeDialog() {
    //this.refs.accountDialog.dismiss();
    this.setState({
      logedIn: this.state.logedIn,
      showLogin: false
    })
  },

  onLogout() {
    Parse.User.logOut();
    this.history.pushState(null, `/`);
    this.setState({logedIn: false});
  },

  onSuccess(){
    this.setState({logedIn: true});
  },

  render() {
    injectTapEventPlugin();
    if(this.state.logedIn){

      var loginOrUser =
      <li className="ignore-react-onclickoutside">
        <a href="javascript:;" onClick={this.onLogout}>Hello {Parse.User.current().getUsername()}</a>
      </li>
    } else {
      var loginOrUser =
      <li className="ignore-react-onclickoutside">
        <a href="javascript:;" onClick={this.toggleLogin}>Login or register</a>
      </li>
    };

    if(this.state.showLogin){
      var loginDialog = <Accounts  close={this.closeDialog} onSuccess={this.onSuccess}/>        
    } else {
      var loginDialog = null;
    }
      
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Logo</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              {loginOrUser}
            </ul>
          </div>
        </nav>
        
        {loginDialog}

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Main;
