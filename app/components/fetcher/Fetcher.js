import React from 'react';
import axios from 'axios';
import FetchProgress from './FetchProgress'

var Fetcher = React.createClass({
  getInitialState() {
    return {
      percentage: 0,
      text: 'Initializing your Search...'
    }
  },
  componentDidMount() {
    this.searchID = 0;
    let params = this.getParams(this.props.query);
    this.fetch(params, ++this.searchID);
  },
  componentWillReceiveProps(nextProps) {
    if (!nextProps.stop && this.props.stop) {
      let params = this.getParams(nextProps.query);
      this.setState({
        percentage: 0,
        text: 'Initializing your Search...'
      });
      this.fetch(params, ++this.searchID);
    }
  },
  fetch(params, id) {
    let hotels = [];
    axios
      .get('https://vokou.parseapp.com/search', { params: params })
      .then((response) => {
        params.secret = response.data;
        axios
          .get('http://52.89.111.15:8888/search', { params: params })
          .then((response) => {
            hotels = this.transformHotelsArray(response.data);
            this.getHotelsInformation(hotels, 0, id);
          })
      });
  },
  getHotelsInformation(hotels, index, id) {
    if (index == hotels.length) {
      this.props.onFinish();
      return;
    }

    let newState = {
      text: `Found ${hotels.length} hotels, looking for best price on ${index + 1}/${hotels.length} of them...`
    };
    if (index === 0) {
      newState.percentage = 2;
    }
    this.setState(newState);

    let hotel = hotels[index];
    let price = hotel.original;
    let days = this.differenceBetweenDates(new Date(this.props.query.checkIn), new Date(this.props.query.checkOut));

    axios
      .post('http://52.89.111.15:8888/getPrice', {
        hcurl: hotel.url,
        price: price * days
      })
      .then((response) => {

        if (response.data) {
          hotels[index].brgPrice = response.data.price;
          hotels[index].cover = response.data.turl;
        } else {
          hotels[index].brgPrice = null;
        }

        if (this.props.stop || id != this.searchID) {
          return;
        }
        this.props.onUpdate(hotels[index]);
        this.setState({
          percentage: Math.round(100 * (index + 1.0) / hotels.length)
        });
        this.getHotelsInformation(hotels, index + 1, id);
      });
  },
  transformHotelsArray(hotels) {
    return hotels.map(function(hotel) {
      let hotelObj = {
        name: hotel.name,
        available: hotel.lsp ? true : false,
        original: hotel.lsp ? hotel.lsp : 9999,
        url: hotel.url
      };

      if (hotel.detail) {
        hotelObj.address = hotel.detail.address;
        hotelObj.img = hotel.detail.img.replace('_tn', '_md');
        hotelObj.propertyID = hotel.detail.id;
      }
      let pointsPlan = {};
      if(hotel.pp.point_plan === "No Best Point Plan") {
        pointsPlan.available = false;
      } else {
        pointsPlan.available = true;
        pointsPlan.value = hotel.pp.value;
        if (hotel.pp.point_plan === "Points") {
          pointsPlan.name = "SPG Free Nights";
        } else {
          pointsPlan.name = "SPG Cash & Points"
        }
      }
      hotelObj.pointsPlan = pointsPlan;
      return hotelObj;
    });
  },
  differenceBetweenDates(day1, day2) {
    let ms = day2 - day1;
    return Math.round(ms / 1000 / 60 / 60 / 24);
  },
  getParams(query) {
    let destination = query.destination.replace(' Thailand', ', Thailand').split(", ");
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
    }

    return params;
  }
  ,
  render() {
    return (
      <div className="row">
        <br/>
        {!this.props.stop && <FetchProgress percentage={this.state.percentage} text={this.state.text} />}
        <br/>
      </div>
    );
  }
});

export default Fetcher;
