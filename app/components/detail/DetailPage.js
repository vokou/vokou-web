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
      "image1":           hotel.img_1,
      "image2":           hotel.img_2,
      "image3":           hotel.img_3,
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
      "image1":           null,
      "image2":           null,
      "image3":           null,
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
          <div className="center">
            Loading BRG detail. Please be patient with us.
          </div>
        </div>);


    let pointsString;
    if(this.state.pointsAvailable && this.state.pValue != 0){
      pointsString = "or Use "+this.state.pointsPlan+" as "+this.state.pValue+"$/point";
    }else{
      pointsString = "No best points plan!";
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
          <strong className="number">{this.state.oldPrice}$/Night</strong>
        </div>
      }else{
        price =
        <div>
          <strike className="number">{this.state.oldPrice}$</strike>&nbsp;
          <strong className="number">{this.state.price}$/Night</strong>
        </div>
      }
    }else{
      price = 
        <p>
          No room available!
        </p>
    }



    return (

      <div>
        <div className="container big-img-container" >
          <img src={this.state.image}
            className="big-img img-responsive"/>
        </div>
        <div className="container">
          <div className="row detail-hotel-info">
            <div className="col-md-7 row-height sq-img-container" >
                <img src={this.state.image1} className="sq-img"/>
                <img src={this.state.image2} className="sq-img"/>
                <img src={this.state.image3} className="sq-img"/>
            </div>
            <div className="col-md-5 row-height">
              <h3 className="detail-text">
                {this.state.name} 
              </h3>
              <p className="detail-location">
                {this.state.location}
              </p>
              <p className="points-string detail-text">
                {price}
                {pointsString}
              </p>
              <div className="detail-all">
                <RaisedButton label="Go To SPG" secondary={true} onClick={this.goSPG}/>
              </div>
              <div className="detail-all">{canBRG}</div>
            </div>
          </div>
        </div>
      </div>

    );
  }
});

export default DetailPage;
