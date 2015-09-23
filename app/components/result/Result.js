import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Search from '../search/Search';
import Fetcher from '../fetcher/Fetcher';
import HotelList from './HotelList'
require("./result.css");

let ThemeManager = new Styles.ThemeManager();
var Result = React.createClass({
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
  handleNewSearch() {
    this.setState({
      fetching: true,
      data: []
    })
  },
  handleCancelSearch() {
    this.setState({
      fetching: false
    })
  },
  render() {
    injectTapEventPlugin();
    return (
      <div className="result_list">
        <Search
          searchFields={this.props.location.query}
          fetching={this.state.fetching}
          onNewSearch={this.handleNewSearch}
          onCancel={this.handleCancelSearch} />
        <Fetcher query={this.props.location.query} stop={!this.state.fetching} onFinish={this.handleFinish} />
        <HotelList data={this.state.data} />
      </div>
    );
  }
});

export default Result;
