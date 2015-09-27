import React from 'react';
import {FlatButton, Styles, RaisedButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
require("./detail.css");

let ThemeManager = new Styles.ThemeManager();

var DetailPage = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillReceiveProps(nextProps){
    let hotel = nextProps["hotel"];
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
      "cover":            hotel.cover,
      "brgurl":           hotel.url,
      "spgurl":           hotel.spgURL,
    });
  },

  componentWillMount(){
    this.setState({
      "image":            null,
      "price":            null,
      "oldPrice":         null,
      "pValue":           null,
      "location":         null,
      "name":             null,
      "canBRG":           null,
      "pointsPlan":       null,
      "pointsAvailable":  null,
      "available":        null,
      "cover": null
    });
  },

  goBRG(){
    
    window.open(this.state.brgurl);
  },

  goSPG(){
    window.open(this.state.spgurl);
  },
  render() {
    injectTapEventPlugin();
    /* loading detail from server */
    if(!this.state.name)
      return (
        <div className="row">
          <div className="col-md-offset-3">
            Loading BRG detail. Please be patient with us.
          </div>
        </div>);


    let pointsString;
    if(this.state.pointsAvailable){
      pointsString = "Use "+this.state.pointsPlan+" as "+this.state.pValue+"$/point";
    }else{
      pointsString = "No best points plan";
    }

    let canBRG;
    if(this.state.price){
      canBRG = <RaisedButton label="BRG" secondary={true} onClick={this.goBRG}/>

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


    return (

      <div>
        <img src={this.state.image}
          className="row"/>
        <div className="row detail-hotel-info">
          <div className="col-md-9 row-height">
            <h3>
              {this.state.name}
            </h3>
            <p>
              {this.state.location}
            </p>
            <div className="detail-price">{price}</div>
            <p className="points-string">
              {pointsString}
              {"   55% success rate"}
            </p>
          </div>
          <div className="col-md-3 row-height spg-brg">
            <div className="detail-brg">{canBRG}</div>
            <div className="detail-spg">
              <RaisedButton label="Go To SPG" secondary={true} onClick={this.goSPG}/>
            </div>
          </div>
        </div>
      </div>

    );
  }
});

export default DetailPage;
