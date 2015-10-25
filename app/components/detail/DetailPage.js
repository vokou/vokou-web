import React from 'react';
import {FlatButton, Styles, RaisedButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import servers from '../../config/servers'
import Lightbox from '../../libs/imgGalery/Lightbox';
require("./detail.css");

var DetailPage = React.createClass({
  componentWillReceiveProps(nextProps){
    let hotel = nextProps["hotel"];
    this.setState({
      "image":            hotel.img,
      "thumbnail":        hotel.thumbnail, 
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
      "galleryOpen":      false,
      "index":            null
    });
  },

  componentWillMount(){
    this.setState({
      "image":            null,
      "thumbnail":        null,
      "price":            null,
      "oldPrice":         null,
      "pValue":           null,
      "location":         null,
      "name":             null,
      "canBRG":           null,
      "pointsPlan":       null,
      "pointsAvailable":  null,
      "available":        null,
      "cover":            null,
      "galleryOpen":      false,
      "index":            null
    });
  },

  goBRG(){
    let escapeURL = this.state.brgurl.replace(/\?/g, '%3F').replace(/&/g, '%26');
    window.open(`${servers.vokou}redirect?url=${escapeURL}&type=brg`);
  },

  goSPG(){
    let escapeURL = this.state.spgurl.replace(/\?/g, '%3F').replace(/&/g, '%26');
    window.open(`${servers.vokou}redirect?url=${escapeURL}&type=spg`);
  },

  openGallery(i){
    this.setState({galleryOpen: true, index: i});
  },

  closeGallery(){
    this.setState({galleryOpen: false});
  },

  render() {
    injectTapEventPlugin();
    /* loading detail from server */
    if(!this.state.name)
      return (
        <div className="row">
          <div className="center">
            {/* Loading BRG detail. Please be patient with us. */}
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
          <img src={this.state.image[0]}
            className="big-img img-responsive"/>
        </div>
        <div className="container">
          <div className="row detail-hotel-info">
            <Lightbox
	      images={this.state.image}
	      isOpen={this.state.galleryOpen}
              onClose={this.closeGallery}
              initialImage={this.state.index}
	    />
            <div className="col-md-7 row-height sq-img-container" >
              <img
                src={this.state.thumbnail[1]}
                onClick={this.openGallery.bind(this, 1)}
                className="sq-img"/>
              <img
                src={this.state.thumbnail[2]}
                onClick={this.openGallery.bind(this, 2)}
                className="sq-img"/>
              <img
                src={this.state.thumbnail[3]}
                onClick={this.openGallery.bind(this, 3)}
                className="sq-img"/>
            </div>
            
            <div className="col-md-5">
              <h3 className="detail-text">
                {this.state.name}
              </h3>
              <div className="detail-location">
                {this.state.location}
              </div>
              <div className="points-string-detail detail-text">
                {price}
                {pointsString}
              </div>
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
