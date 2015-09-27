import React from 'react';
import { History, Link } from 'react-router';
import {FlatButton, Styles, RaisedButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';


let ThemeManager = new Styles.ThemeManager();

var ListItem = React.createClass({
  mixins: [History],

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },


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
    //TODO: put real argument

    let query = {
      hotelname: this.state.name,
      city: this.props.query.city,
      checkin: this.props.query.checkIn,
      checkout: this.props.query.checkOut
    };


    this.history.pushState(null, `/detail`, query);

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
      canBRG = <RaisedButton label="BRG" secondary={true} />
    }else{
      canBRG = <div></div>
    }

    let price;
    if(this.state.available){
      if(this.state.price === this.state.oldPrice || this.state.price==null){
        price =
        <div>
          <strong className="number">{this.state.oldPrice}$</strong>
        </div>
      }else{
        price =
        <div>
          <strike className="number">{this.state.oldPrice}$</strike>
          <strong className="number">{this.state.price}$</strong>
        </div>
      }
    }else{
      price = "No room available"
    }
    let query = {
      hotelname: this.state.name,
      city: this.props.query.destination,
      checkin: encodeURIComponent(this.props.query.checkIn),
      checkout: encodeURIComponent(this.props.query.checkOut)
    };
    console.log(query);
    //${query.propID}${query.checkin}${query.checkout}
    return (

      <div className="row row-height list-item">
        <Link to={`/detail//${query.hotelname}//${query.city}//${query.checkin}//${query.checkout}`} >
        <img src={this.state.image} onClick={this.goToDetail}
          className="col-md-3 img-rounded img-responsive"/>
        <div className="col-md-7 row-height hotel-info">
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
        <div className="col-md-2 row-height">
          <div className="hotel-price">{price}</div>
          <div className="can-brg">{canBRG}</div>
        </div>
        </Link>
      </div>

    );
  }
});

export default ListItem;
