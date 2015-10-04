import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';



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

  getInitialState() {
    return { modalIsOpen: false };
  },
  componentWillMount() {

  },

  openModal() {
    this.setState({modalIsOpen: true});
  },

  closeModal() {
    this.setState({modalIsOpen: false});
  },

  render() {
    injectTapEventPlugin();

    return (
      <div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </div>
    );

  }
});

export default Login;
