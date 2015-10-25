import React from 'react';
import { History, Link } from 'react-router';
import {FlatButton, Styles, RaisedButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

var ListItem = React.createClass({
  mixins: [History],

  componentWillMount(){
    let hotel = this.props.hotel;
    this.setState({
      "image":            hotel.img,
      "price":            hotel.brgPrice,
      "oldPrice":         hotel.original,
      "pValue":           hotel.pointsPlan.value,
      "location":         hotel.address,
      "name":             hotel.name,
      "canBRG":           hotel.brg,
      "pointsPlan":       hotel.pointsPlan.name,
      "pointsAvailable":  hotel.pointsPlan.available,
      "available":        hotel.available,
      "id":               hotel.propertyID,
      "url":              hotel.url
    });

  },

  goToDetail(){
    //no real use for now.
    let query = {
      hotelname: this.state.name,
      city: this.props.query.destination,
      checkin: encodeURIComponent(this.props.query.checkIn),
      checkout: encodeURIComponent(this.props.query.checkOut)
    };
    window.open(this.history.createHref(`/detail//${query.hotelname}//${query.city}//${query.checkin}//${query.checkout}`));
  },

  render() {
    injectTapEventPlugin();

    let pointsString;
    if(this.state.pointsAvailable){
      pointsString = "Use "+this.state.pointsPlan+" as "+this.state.pValue+"$/point";
    }else{
      pointsString = "No best points plan";
    }

    let canBRG;
    if(this.state.price){
      canBRG = <div className="canbrg row-height v-center brg">
        <span>BRG</span>
      </div>
    }else{
      canBRG = <div className="nobrg row-height v-center brg">
        <span>BRG</span>
      </div>
    }

    let price;
    if(this.state.available){
      if(this.state.price === this.state.oldPrice || this.state.price==null){
        price =
        <div className="nobrg-price price-pos">
          <div className="big-number">{this.state.oldPrice}$</div>
        </div>
      }else{
        price =
        <div className="brg-price price-pos" >
          <div className="big-number">{this.state.price}$</div>
          <div className="small-number">{this.state.oldPrice}$</div>
        </div>
      }
    }else{
      price = "No room available"
    }
    
    let query = {
      hotelname: this.state.name,
      city: this.props.query.destination,
      checkin: encodeURIComponent(this.props.query.checkIn),
      checkout: encodeURIComponent(this.props.query.checkOut),
      propID: this.state.id
    };
    
    let detailURL = `/detail//${query.hotelname}//${query.city}//${query.checkin}//${query.checkout}//${query.propID}`;
    
    return (

      <div className="row row-height list-item">
        <Link
          to={detailURL}
          target="_blank"
          onClick={(event) => {
                   event.preventDefault();
                   window.open(this.history.createHref(detailURL));
                   }}
          >
        <img src={this.state.image} 
          className="col-sm-2 img-rounded img-responsive"/>
        <div className="col-sm-8 row-height hotel-info">
          <h3>
            {this.state.name}
          </h3>
          <p>
            {this.state.location}
          </p>
          <p className="points-string">
            {pointsString}
          </p>
        </div>
        <div className="col-sm-1 row-height hotel-price v-center">
            {price}
        </div>
        
        <div className="col-sm-1 row-height fix-align">
          {canBRG}
        </div>
        </Link>
      </div>

    );
  }
});

export default ListItem;
