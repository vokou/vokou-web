import React from 'react';
import {FlatButton, Styles, RaisedButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';


let ThemeManager = new Styles.ThemeManager();

var ListItem = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    injectTapEventPlugin();

    var pointsString;
    if(this.props.pointsAvailable){
      pointsString = "Use "+this.props.pointsPlan+" as "+this.props.pValue+"$/point";
    }else{
      pointsString = "No best points plan";
    }

    var canBRG;
    if(this.props.price){
      canBRG = <RaisedButton label="BRG" secondary={true} />
    }else{
      canBRG = <div></div>
    }

    var price;
    if(this.props.available){
      if(this.props.price === this.props.oldPrice || this.props.price==null){
        price =
        <div>
          <strong className="number">{this.props.oldPrice}$</strong>
        </div>
      }else{
        price =
        <div>
          <strike className="number">{this.props.oldPrice}$</strike>
          <strong className="number">{this.props.price}$</strong>
        </div>
      }
    }else{
      price = "No room available"
    }
    return (
      
      <div className="listItem">
        <img src={this.props.image} className="hotelPic"/>
        <div className="hotel_info" itemType="http://schema.org/Review">
          <h3 className="hotel_name">
            {this.props.name}
          </h3>
          <p className="location">
            {this.props.location}
          </p>
          <span className="pvalue">
            {pointsString}
          </span>
        </div>
        <div className="brg">
          <div className="hotel_price">
            <div className="price_box">
              {price}
              {canBRG}
            </div>
          </div>

        </div>
      </div>

    );
  }
});

export default ListItem;
