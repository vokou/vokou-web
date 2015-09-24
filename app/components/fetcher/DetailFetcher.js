import React from 'react';
import axios from 'axios';
import FetchProgress from './FetchProgress'

var DetailFetcher = React.createClass({
  contextTypes: {
    location: React.PropTypes.object
  },
  //TODO: implement actual detail fetcher.
  componentDidMount (){
    var hotel = {
      "img":"http://www.starwoodhotels.com/pub/media/3016/she3016ex.104576_md.jpg",
      "brgPrice":           30,
      "original":         40,
      "pointsPlan":{value: 10,
                    name: "hey",
                    available: true,
      },
      "address":         "location",
      "name":             "name",
      "brg":           true,
      "available":        true
    }
    console.log(this.context.location);
    this.props.onFinish(hotel);
  },

  render() {
    return (
      <div></div>
    );
  }
});

export default DetailFetcher;
