import React from 'react';
import {FlatButton, Styles } from 'material-ui';
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
  componentDidMount: function() {
    console.log(this.props.location.query);
  },
  render : function() {
    injectTapEventPlugin();
    var divStyle ={
      border:"1px solid black",
    };
    return (
      <div className="listItem">
        <img src={this.props.image} className="hotelPic"/>
        <div className="hotel_info" itemprop="reviews" itemscope="" itemtype="http://schema.org/Review">
          <h3 className="hotel_name">
            {this.props.name}
          </h3>
          <p className="location">
            {this.props.location}
          </p>
          <span className="pvalue">
            {this.props.pvalue}
          </span>
        </div>
        <div className="brg">
          <div className="hotel_price">
            <div className="price_box">

              
              <strike class="number">{this.props.price}$</strike>
              <strong class="number">{this.props.price}$</strong>

              
              <FlatButton label="BRG" />
            </div>
          </div>

        </div>
      </div>

    );
  }
});

export default ListItem;
