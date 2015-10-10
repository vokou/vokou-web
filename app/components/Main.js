import React from 'react';
import { History } from 'react-router';
import {Styles, Dialog, FlatButton, RaisedButton} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Accounts from './accounts/Accounts';
import Parse from 'parse';

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
      logedIn: false
    }
  },

  componentWillMount() {
    Parse.initialize("JUXCXuysBgoulgFgGDGzc9elQNx4q84XiaDBoYyo", "B7RS0P7Yc5ts80tia2wMoMFBsyVqMFmj9H3JocTK");
    if(Parse.User.current()){
      this.setState({logedIn: true});
    }
  },

  openDialog() {
    this.refs.accountDialog.show();
  },

  closeDialog() {
    this.refs.accountDialog.dismiss();
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
      console.log(Parse.User.current());
      var loginOrUser = <li ><a href="javascript:;" onClick={this.onLogout}>Hello {Parse.User.current().getUsername()}</a></li>
    } else {
      var loginOrUser = <li ><a href="javascript:;" onClick={this.openDialog}>Login or register</a></li>
    };
    
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
        
        <Dialog ref="accountDialog" className="account-dialog">
          <Accounts close={this.closeDialog} onSuccess={this.onSuccess}/>
        </Dialog>


        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Main;
