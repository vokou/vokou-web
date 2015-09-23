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
  getInitialState(){
    return {
      fetching: true,
      data:[]
    }
  },
  
  handleFinish(result) {
    let newState = {
      fetching: false,
      data: result
    };
    this.setState(newState);
  },
  handleNewSearch() {
    this.setState({
      fetching: true,
      data: []
    })
  },
  render() {
    injectTapEventPlugin();

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
    }
    //data.sort(compare);
    var fetcher = <Fetcher query={this.props.location.query} onFinish={this.handleFinish} />;

    console.log(this.state.data);
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
        <Search searchFields={this.props.location.query} onNewSearch={this.handleNewSearch} />
        {this.state.fetching && fetcher}
        <ul>
          {ListItems}
        </ul>
      </div>


    );
  }
});

export default Result;
