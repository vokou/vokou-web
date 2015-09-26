import React from 'react';
import { Styles } from 'material-ui';
import { History } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Search from '../search/Search';
import Fetcher from '../fetcher/Fetcher';
import HotelList from './HotelList'
require("./result.css");

let ThemeManager = new Styles.ThemeManager();

var Result = React.createClass({
  mixins: [History],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  isLocalStorageOn() {
    // this code is borrowed from modernizer
    let mod = 'react-count';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch(e) {
      return false;
    }
  },

  componentWillMount() {
    let hotels = JSON.parse(localStorage.getItem('hotels'));
    if(hotels){
      console.log('found hotels in localstorage', hotels);
    }else{
      console.log("no hotels found in localstorage");
      let query = this.props.location.query;
      if (!query.destination || !query.checkIn || !query.checkOut) {
        this.history.replaceState(null, '/search');
      }}
  },
  

  getInitialState(){
    let data = [];
    let fetching = true;
    let hotels = JSON.parse(localStorage.getItem('hotels'));
    
    if(hotels){
      /* hotel found in localstorage */
      fetching = false;
      data = hotels;
    }
    return {
      fetching: fetching,
      data: data
    }
  },
  handleFinish() {
    let newState = {
      fetching: false
    };
    this.setState(newState);
    localStorage.setItem('hotels', JSON.stringify(this.state.data));
    let hs = localStorage.getItem('hotels');
    console.log('stored hotels:' , JSON.parse(hs));
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
