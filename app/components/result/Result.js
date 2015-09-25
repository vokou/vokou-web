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
  handleFinish() {
    let newState = {
      fetching: false
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
  handleUpdate(hotel) {
    this.setState({
      data: this.state.data.concat([hotel])
    })
  },
  render() {
    injectTapEventPlugin();
    
    return (
      <div className="result-list">
        <Search
          searchFields={this.props.location.query}
          fetching={this.state.fetching}
          onNewSearch={this.handleNewSearch}
          onCancel={this.handleCancelSearch} />

        <Fetcher
          query={this.props.location.query}
          stop={!this.state.fetching}
          onUpdate={this.handleUpdate}
          onFinish={this.handleFinish} />
        <HotelList data={this.state.data} query={this.props.location.query} />

      </div>
    );
  }
});

export default Result;
