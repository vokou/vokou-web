import React from 'react';
import {Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Fetcher from '../fetcher/DetailFetcher';
import DetailPage from './DetailPage'


let ThemeManager = new Styles.ThemeManager();
var Detail = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState() {
    //console.log(this.props.params);
    let params = this.props.params;
    return {
      fetching: true,
      data:{
        hotelname: params.hotelname,
        city: params.city,
        checkin: params.checkin,
        checkout: params.checkout,
        propID: params.propID
      }
    }

  },
  componentWillMount() {
    let params = this.props.params;
    let state = {
      data:{
        hotelname: params.hotelname,
        propID: params.propID,
        checkin: params.checkIn,
        checkout: params.checkOut
      }
    };
    this.setState({state});
  },

  handleFinish(result) {
    let newState = {
      fetching: false,
      data: result
    };

    this.setState(newState);
  },

  render() {
    injectTapEventPlugin();
    if(this.state.fetching){
      var fetch = <Fetcher
                    className="detail-progress"
                    query={this.state.data}
                    stop={!this.state.fetching}
                    onFinish={this.handleFinish} />
    }
    else{
      var fetch = null;

    }

    return (
      <div className="detail" >
        <div className="center">
          {fetch}
        </div>
        <DetailPage hotel={this.state.data} />
      </div>
    );
  }
});

export default Detail;
