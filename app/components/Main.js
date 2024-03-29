import React from 'react';
import { History } from 'react-router';
import { Styles, Checkbox, Dialog, FlatButton, RaisedButton} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Accounts from './accounts/Accounts';
import Parse from 'parse';
import Feedback from './feedback/Feedback';


let ThemeManager = Styles.ThemeManager;

const Main = React.createClass({
  mixins: [History],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Styles.LightRawTheme)
    };
  },

  getInitialState(){
    let isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

    return {
      isSafari: isSafari ? true : false,
      logedIn: false,
      showLogin: false,
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

  saveSafari() {
    if(this.refs.safariCheckbox.isChecked()){
      localStorage.setItem('safariNoDisplay', 1);
    }
  },

  onLogout() {
    let self = this;
    Parse.User.logOut().then(
      function(result) {
        self.history.replaceState(null, `/`);
        self.setState({logedIn: false});
      }
    );

  },

  onSuccess(){
    this.setState({logedIn: true});
  },

  render() {
    injectTapEventPlugin();



    if(localStorage.getItem('safariNoDisplay') == null){
      let standardActions = [
        <Checkbox
          style={{ width: '32%'}}
          name="safariCheckbox"
          ref="safariCheckbox"
          label="Don't show this again."/>,
        { text: 'OK' }
      ];
      var safariDialog =
      <Dialog
        ref="safari"
        openImmediately={this.state.isSafari}
        autoScrollBodyContent={true}
        actions={standardActions}
        onDismiss={this.saveSafari}
        autoDetectWindowHeight={true}
        className="modal-dialog">

        <div className="modal-header">
          <h4 className="modal-title">You are using Safari!</h4>
        </div>


        Please change your browser's privicy setting or switch to another browser.
        <br/>
        <div style={{height: '400px'}}>
          <img style={{width: '100%'}} src="https://s3.amazonaws.com/vokou/assets/safari.png"/>
        </div>
        <br/>

      </Dialog>
    }else{

      var safariDialog = null;
    }

    if(this.state.logedIn){

      var loginOrUser =
      <li className="ignore-react-onclickoutside">
        <a href="javascript:;" onClick={this.onLogout}>Logout</a>
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
        <nav className="navbar navbar-default"
          style={{
                 backgroundColor: 'black',
                 borderColor: 'black',
                 borderRadius: '0px',
                 marginBottom: '0px'
                 }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Vokou</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              {loginOrUser}
            </ul>
          </div>
        </nav>

        {loginDialog}

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
            <Feedback/>
          </div>
        </div>

        {safariDialog}


      </div>
    );
  }
});

export default Main;
