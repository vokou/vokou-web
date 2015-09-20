import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ListItem from './listItem';
import Search from '../search/Search';
import Fetcher from '../fetcher/Fetcher';
require("./result.css");

let ThemeManager = new Styles.ThemeManager();
var Result = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialstate(){
    return {
      fetching: 1
    }
  },
  componentDidMount: function() {
    console.log(this.props.location.query);
  },
  handlePageClick: function(data) {
    var selected = data.selected;
    var offset = Math.ceil(selected * 10);

    this.setState({offset: offset}, function() {
      this.loadCommentsFromServer();
    }.bind(this));

    this.loadCommentsFromServer();
  },

  render() {
    injectTapEventPlugin();
    var image = "http://images4.c-ctrip.com/target/hotel/375000/374685/7ffcf8a792fb41fd9cbe0d3eb1bcea36_130_130.jpg";
    var price = 10;
    var oldPrice = 10;
    var pvalue = 120;
    var location = "location";
    var name = "name";
    var canBRG = true;
    
    return (
      <div className="result_list">
        <Search searchFields={this.props.location.query} />
        <Fetcher />
        <ul>
          <ListItem image={image} price={price} oldPrice={oldPrice} pvalue={pvalue} location={location} name={name} canBRG={canBRG}/>
          <ListItem image={image} price={price} oldPrice={oldPrice} pvalue={pvalue} location={location} name={name} canBRG={canBRG}/>
        </ul>
      </div>


    );
  }
});

export default Result;
