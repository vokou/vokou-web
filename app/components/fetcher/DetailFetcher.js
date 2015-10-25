import React from 'react';
import sha1 from 'sha1';
import { CircularProgress } from 'material-ui';
import servers from '../../config/servers';
import _ from 'lodash';
import clientFetch from './clientFetch';
import reqwest from 'reqwest';

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
      hotelObj.img = hotel.detail.img;
      let thumbnail = hotelObj.img;
      hotelObj.thumbnail = _.map(thumbnail, (n)=>{
        return n.replace('_xx', '_ss');
      })
      hotelObj.propertyID = hotel.detail.id;
    }
    
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

    let destination = query.city.split(", ");
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
    var hash = params.checkin+params.checkout+params.city+params.source;
    hash = sha1(hash);

    /* fetching detail information */
    reqwest({
      url: servers.vokou + '/cache/' + hash,
      data: {id: this.props.query.propID}
    }).then((response) => {
      if(response != 'FAIL'){
        
        let hotel = JSON.parse(response);

        hotel.img = hotel.detailImgs;
        let thumbnail = hotel.img;
        hotel.thumbnail = _.map(thumbnail, (n)=>{
          return n.replace('_xx', '_ss');
        });
        if(hotel.brgPrice == null){
          this.props.onFinish(hotel);
        }else{
          let u = servers.proxy + '/http://www.hotelscombined.com/' + hotel.url;
          let self=this;
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
          });
        }
      }else{
        /* no cache found. */
        /* console.log(response); */
        // console.log(params);
        reqwest({
          url: servers.vokou + '/search',
          data: params
        }).then((response) => {
          params.secret = response;
          params.hotelname = this.props.query.hotelname;
          params.propID = this.props.query.propID;
          
          reqwest({
            url:servers.api + '/search',
            data: params,
            crossOrigin: true,
            header: {'x-requested-with': null}
          }).then((response) => {
              let hotel = this.formatHotelData(response);
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
                }})
            })
        })
      }})
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
