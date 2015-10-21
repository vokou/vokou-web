import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ListItem from './ListItem';
import _ from 'underscore';

var HotelList = React.createClass({
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
    let result = data;
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
    let hotels = this.state.data;
    let q = this.props.query;
    let ListItems = _.map(hotels, function(hotel, key){
      let l = <ListItem hotel={hotel} key={key} query={q}/>;
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
