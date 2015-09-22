import React from 'react';
import axios from 'axios';
import FetchProgress from './FetchProgress'

var Fetcher = React.createClass({
  getInitialState() {
    return {
      percentage: 0
    }
  },
  componentDidMount() {
    let params = this.getParams(this.props.query);
    let hotels = [];
    axios
      .get('https://vokou.parseapp.com/search', { params: params })
      .then((response) => {
        params.secret = response.data;
        axios
          .get('http://52.89.79.251:8888/search', {params: params })
          .then((response) => {
            console.log(response.data);
            hotels = React.addons.update(response.data, {});
            this.getHotelsInformation(hotels, 0);
          })
      });
  },
  getHotelsInformation(hotels, index) {
    if (index == hotels.length) {
      console.log(hotels);
      return;
    }

    let hotel = hotels[index];
    let price = hotel.lsp ? hotel.lsp : 9999;
    let days = this.differenceBetweenDates(new Date(this.props.query.checkIn), new Date(this.props.query.checkOut));

    console.log(index);
    console.log(price * days);
    axios
      .post('http://52.89.79.251:8888/getPrice', {
        hcurl: hotel.url,
        price: price * days
      })
      .then((response) => {
        console.log("ok");
        console.log(response.data);
        hotels[index]['brgPrice'] = !response.data ? null : response.data.price;
        this.getHotelsInformation(hotels, index + 1);
      });
  },
  differenceBetweenDates(day1, day2) {
    let ms = day2 - day1;
    return Math.round(ms / 1000 / 60 / 60 / 24);
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