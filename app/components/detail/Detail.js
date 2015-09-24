import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Fetcher from '../fetcher/DetailFetcher';
import DetailPage from './DetailPage'


let ThemeManager = new Styles.ThemeManager();
var Detail = React.createClass({
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
      fetching: true,
      data:[]
    }
  },
  handleFinish(result) {
    let newState = {
      fetching: false,
      data: result
    };
    this.setState(newState);
  },

  render() {
    injectTapEventPlugin();
    return (
      <div className="detail">
        <Fetcher
          query={this.props.location.query}
          stop={!this.state.fetching}
          onFinish={this.handleFinish} />
        <DetailPage hotel={this.state.data} />
      </div>
    );
  }
});

export default Detail;
