import React from 'react';
import axios from 'axios';
import FetchProgress from './FetchProgress';
import { CircularProgress, Styles } from 'material-ui';

const serverIP = 'http://52.89.111.15:8888/';
var DetailFetcher = React.createClass({
  contextTypes: {
    location: React.PropTypes.object
  },

  componentDidMount (){
    this.fetch(this.props.query);
  },
  
  differenceBetweenDates(day1, day2) {
    let ms = day2 - day1;
    return Math.round(ms / 1000 / 60 / 60 / 24);
  },

  formatHotelData(hotel){
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
    /* TODO: server does not support points plan yet */
    let pointsPlan = {value: 10,
                      name: "hey",
                      available: true};
    hotelObj.pointsPlan = pointsPlan;
    return hotelObj;
  },

  fetch(query) {

    let days = this.differenceBetweenDates(new Date(query.checkin),
                                           new Date(query.checkout));
    
    axios
      .get(serverIP + 'getSPG', { params: query })
      .then((response) => {
        
        let hotel = this.formatHotelData(response.data);

        /* if lsp doesnot exist, make it relative large. */
        let price = 10000;
        if(response.data.lsp > 0)
          price = response.data.lsp;

        /* + 33 is used to get around server issue. Need to be fixed after server is fixed */
        axios.post(serverIP + 'getPrice', {
          hcurl: response.data.hcurl,
          price: price * days+33
        }).then((response) => {
          console.log("getprice: ");
          console.log(response.data);
          if (response.data) {
            if (response.data.price)
              hotel.brgPrice = parseFloat(Math.round(response.data.price / days * 10) / 10);

            /* call source api to get brg address*/
            axios.get(serverIP + 'source/' + response.data.turl)
              .then((response) =>{
                hotel.cover = response.data;
                this.props.onFinish(hotel);
              });
          } else {
            hotel.brgPrice = null;
            console.log(hotel);
            this.props.onFinish(hotel);
          }

        });
      });
  },

  render() {
    return (
      <div className="row detail-progress">
        <br/>
        <div className="col-md-3 col-md-offset-4">
          {!this.props.stop && <CircularProgress mode="indeterminate" size={2} />}
        </div>
        <br/>
      </div>
    );
  }
});

export default DetailFetcher;
