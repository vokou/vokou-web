import React from 'react';
import { Styles } from 'material-ui';
import { History } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Search from '../search/Search';
import Fetcher from '../fetcher/Fetcher';
import HotelList from './HotelList'
require("./result.css");

var Result = React.createClass({
  mixins: [History],



  componentWillMount() {
    let query = this.props.location.query;
    if (!query.destination || !query.checkIn || !query.checkOut) {
      this.history.replaceState(null, '/search');
    }
  },

  getInitialState(){
    let data = [];
    let fetching = true;
    

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
    
  },
  render() {
    injectTapEventPlugin();

    return (
      <div className="container" style={{paddingBottom:'60px'}}>
        <div className="result">
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
      </div>
    );
  }
});

export default Result;
