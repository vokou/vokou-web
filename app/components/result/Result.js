import React from 'react';
import { History } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Search from '../search/Search';
import Fetcher from '../fetcher/Fetcher';
import HotelList from './HotelList'
require("./result.css");

var Result = React.createClass({
  mixins: [History],

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
    });
    localStorage.setItem('hotels', JSON.stringify(this.state.data));
  },
  render() {
    injectTapEventPlugin();
    let Fetch;
    if(!this.state.fetching){
      Fetch = <div className="row">
                <br/>
                <br/>
              </div>
    }else{
      Fetch = <Fetcher
                query={this.props.location.query}
                stop={!this.state.fetching}
                onUpdate={this.handleUpdate}
                onFinish={this.handleFinish} />
    }
    return (
      <div className="container" style={{paddingBottom:'60px'}}>
        <div className="result">
          <Search
            searchFields={this.props.location.query}
            fetching={this.state.fetching}
            onNewSearch={this.handleNewSearch}
            onCancel={this.handleCancelSearch} />

          {Fetch}
          
          <HotelList data={this.state.data} query={this.props.location.query} />
        </div>
      </div>
    );
  }
});

export default Result;
