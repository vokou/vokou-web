import React from 'react';
import axios from 'axios';
//import reqwest from 'reqwest';
import FetchProgress from './FetchProgress'

var Fetcher = React.createClass({
  getInitialState() {
    return {
      percentage: 0
    }
  },
  componentDidMount() {
    let params = this.getParams(this.props.query);
    console.log("nooooo");
    //axios
    //  .get('https://vokou.parseapp.com/search', { params: params })
    //  .then((response) => {
    //    params.secret = response.data;
    //    axios
    //      .get('http://52.89.79.251:8888/search', {params: params })
    //      .then((response) => {
    //
    //      })
    //  });

    //axios
    //  .post('https://vokou.parseapp.com/redirect', {
    //  hcurl: 'http://www.hotelscombined.com/Hotel/SearchResults?destination=hotel:The_Westin_New_York_at_Times_Square&radius=0mi&checkin=2015-09-24&checkout=2015-09-25&Rooms=1&adults_1=2&fileName=The_Westin_New_York_at_Times_Square'
    //}).then(response => console.log(response));
    //axios
    //  .get('http://www.hotelscombined.com/Hotel/SearchResults?destination=hotel:The_Westin_New_York_at_Times_Square&radius=0mi&checkin=2015-09-24&checkout=2015-09-25&Rooms=1&agit dults_1=2&fileName=The_Westin_New_York_at_Times_Square')
    //  .then(response => console.log(response.data));

    //reqwest({
    //  url: `http://www.hotelscombined.com/Hotel/SearchResults?destination=hotel:The_Westin_New_York_at_Times_Square&radius=0mi&checkin=2015-09-24&checkout=2015-09-25&Rooms=1&adults_1=2&fileName=The_Westin_New_York_at_Times_Square`
    //  , type: 'html'
    //  , withCredentials: true
    //  , error: function (err) { }
    //  , success: function (resp) {
    //    console.log(resp);
    //  }
    //})
  },
  getParams(query) {
    let destination = query.destination.split(", ");
    let params = {
      city: destination[0],
      checkin: query.checkIn,
      checkout: query.checkOut,
      source: 'spg'
    };

    if (destination.length > 2) {
      params.state = destination[1];
      params.country = destination[2];
    } else if (destination.length > 1) {
      params.country = destination[1];
    } else {
      params.country = "China";
    }

    return params;
  }
  ,
  render() {
    return (
      <div className="row">
        <br/>
        <FetchProgress percentage={this.state.percentage} />
        <br/>
      </div>
    );
  }
});

export default Fetcher;