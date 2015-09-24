import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ListItem from './ListItem';
import _ from 'underscore';

let ThemeManager = new Styles.ThemeManager();

var HotelList = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  
  compare(a, b) {
    if (a.brg&&!b.brg)
      return -1;
    if (!a.brg&&b.brg)
      return 1;
    if (a.available&&!b.available)
      return -1;
    if (!a.available&&b.available)
      return 1;
    return 0;
  },
  
  sortData(data){
    var result = data;
    result = result.sort(this.compare);
    return result;
  },
  
  getInitialState(){
    return {
      data:this.props.data
    }
  },
  
  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps["data"]
    });
  },
  
  componentWillMount(){
    this.setState({data: this.state.data});
  },
  
  render() {
    injectTapEventPlugin();
    var hotels = this.state.data;
    var query = this.props.query;
    var ListItems = _.map(hotels, function(hotel, key){
      var l = <ListItem hotel={hotel} key={key} query={this.props.query}/>;
      return l;
    });
    
    return (
      <div className="result-list">
        <ul>
          {ListItems}
        </ul>
      </div>


    );
  }
});

export default HotelList;
