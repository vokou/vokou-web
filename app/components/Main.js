import React from 'react';
import {Styles, Dialog, FlatButton, RaisedButton} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Accounts from './accounts/Accounts';

let ThemeManager = new Styles.ThemeManager();
const Main = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

    
  openDialog() {
    this.refs.accountDialog.show();
  },

  closeDialog() {
    this.refs.accountDialog.dismiss();
  },
  
  render() {
    injectTapEventPlugin();
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Logo</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li ><a href="javascript:;" onClick={this.openDialog}>Login or register</a></li>
            </ul>
          </div>
        </nav>
        
        <Dialog ref="accountDialog">
          
          <Accounts close={this.closeDialog}/>
          
        </Dialog>
        
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Main;
