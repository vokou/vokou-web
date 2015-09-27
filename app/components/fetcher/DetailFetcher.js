import React from 'react';
import axios from 'axios';
import FetchProgress from './FetchProgress';
import { CircularProgress, Styles } from 'material-ui';
import servers from '../../config/servers';
import _ from 'underscore';
import clientFetch from './clientFetch';
import reqwest from 'reqwest';

const serverIP = 'http://52.89.111.15:8888/';
var DetailFetcher = React.createClass({
  contextTypes: {
    location: React.PropTypes.object
  },

  componentDidMount (){
//    this.dataDOM = document.createElement('div');

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
    let pointsPlan = {value: parseFloat(Math.round(hotel.pp.value * 10000) / 10000),
                      name: hotel.pp.point_plan,
                      available: hotel.pp.point_plan ? true : false
    };
    hotelObj.spgURL = hotel.spgurl;
    hotelObj.pointsPlan = pointsPlan;
    return hotelObj;
  },

  fetch(query) {

    let days = this.differenceBetweenDates(new Date(query.checkin),
                                           new Date(query.checkout));

    let destination = query.city.replace(' Thailand', ', Thailand').split(", ");
    let params = {
      city: destination[0],
      checkin: query.checkin,
      checkout: query.checkout,
      source: 'spg'
    };

    if (destination.length > 2) {
      params.state = destination[1];
      params.country = destination[2];
    } else if (destination.length > 1) {
      params.country = destination[1];
    }

    //console.log(params);
    axios
      .get('https://vokou.parseapp.com/search', { params: params })
      .then((response) => {
        params.secret = response.data;
        params.hotelname = this.props.query.hotelname;
        params.propID = this.props.query.propID;
        axios
          .get(servers.api + '/search', { params: params })
          .then((response) => {
            let hotel = this.formatHotelData(response.data);
            let price = hotel.original;
            
            let self = this;
            reqwest({
              url: `${servers.proxy}/http://hotelscombined.com`,
              method: 'get',
              withCredentials: true,
              success: function() {
                //the dom created at componentDiDmount does not work;
                var d = document.createElement('div');

                clientFetch(d, hotel.url,
                            result => {
                              
                              if (!result.err && result.price < price * days * 0.99) {
                                hotel.brgPrice = parseFloat(Math.round(result.price * 10 / days) / 10);
                                /* translate url to real url */
                                var u = servers.proxy + '/http://www.hotelscombined.com/' + result.url;
                                reqwest({
                                  url: u,
                                  method: 'get',
                                  success: function (resp) {
                                    // get the part start from url = 'h<- this 'h'
                                    let starti = resp.indexOf("url") + 7;
                                    let endi = resp.indexOf("\'", starti + 7);
                                    let brgurl = resp.substring(starti, endi);
                                    hotel.url = brgurl;
                                    self.props.onFinish(hotel);
                                  }
                                })
                              } else {
                                hotel.brgPrice = null;
                                self.props.onFinish(hotel);
                              }

                            }, () => {
                              hotel.brgPrice = null;
                              self.props.onFinish(hotel);
                            });
              }
            });
          })
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
