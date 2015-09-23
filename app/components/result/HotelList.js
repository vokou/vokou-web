import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ListItem from './listItem';


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

  getInitialState(){
    return {
      data:this.props.data
    }
  },
  componentWillMount(){
    function compare(a, b) {
      if (a.brg&&!b.brg)
        return -1;
      if (!a.brg&&b.brg)
        return 1;
      if (a.available&&!b.available)
        return -1;
      if (!a.available&&b.available)
        return 1;
      return 0;
    };

    var sortData = this.state.data;
    sortData.sort(compare);
    this.setState({data: sortData});
    
  },
  render() {
    injectTapEventPlugin();

    var ListItems = this.state.data.map(function (hotel) {
      return (
        <ListItem
          image={hotel.img}
          price={hotel.brgPrice}
          oldPrice={hotel.original}
          pValue={hotel.pointsPlan.value}
          location={hotel.address}
          name={hotel.name}
          canBRG={hotel.brg}
          pointsPlan={hotel.pointsPlan.name}
          pointsAvailable={hotel.pointsPlan.available}
          available={hotel.available}
        />
      );
    });
    return (
      <div className="result_list">
        <ul>
          {ListItems}
        </ul>
      </div>


    );
  }
});

export default HotelList;
