import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ListItem from './ListItem';
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
    this.forceUpdate();
  },
  handleNewSearch() {
    this.setState({
      fetching: true,
      data: []
    })
  },
  render() {
    injectTapEventPlugin();

    //data.sort(compare);
    var fetcher = <Fetcher query={this.props.location.query} onFinish={this.handleFinish} />;

    return (
      <div className="result_list">
        <Search searchFields={this.props.location.query} onNewSearch={this.handleNewSearch} />
        {this.state.fetching && fetcher}
        <HotelList data={this.state.data} />
      </div>


    );
  }
});

export default Result;
