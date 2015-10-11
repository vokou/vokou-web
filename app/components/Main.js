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
        <nav className="navbar navbar-default"
             style={{
              backgroundColor: 'black',
              borderColor: 'black',
              borderRadius: '0px'
             }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Logo</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              {loginOrUser}
            </ul>
          </div>
        </nav>
        
        <Dialog ref="accountDialog">
          <Accounts close={this.closeDialog} onSuccess={this.onSuccess}/>
        </Dialog>
        

        {this.props.children}
        <div style={{
            position: 'fixed',
            width: '100%',
            bottom: 0,
            backgroundColor: 'black'
          }}>
          <div className="container">
            <p style={{marginTop: '20px', marginBottom: '20px', color: '#d3d3d3'}}>
              Ⓒ 2015 Vokou LLC All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }
});

export default Main;
