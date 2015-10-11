import React from 'react';
import { History } from 'react-router';
import { TextField, DatePicker, FloatingActionButton, Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DestInput from './DestInput.js';
import Parse from 'parse';
let ThemeManager = new Styles.ThemeManager();

const Search = React.createClass({
  mixins: [History],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState() {
    let minCheckInDate = new Date();
    minCheckInDate = new Date(minCheckInDate.getTime() + 86400000);
    let minCheckOutDate = new Date(minCheckInDate.getTime() + 86400000);
    return {
      destinationErr: '',
      checkInErr: '',
      checkOutErr:'',
      minCheckInDate: minCheckInDate,
      minCheckOutDate: minCheckOutDate
    }
  },
  componentWillMount() {
    let defaultSearchFields = {
      destination: '',
      checkIn: undefined,
      checkOut: undefined
    };
    const sfs = this.props.searchFields;
    if (this.props.searchFields) {
      this.searchFields = {};
      this.searchFields.destination = sfs.destination;
      this.searchFields.checkIn = new Date(sfs.checkIn);
      this.searchFields.checkOut = new Date(sfs.checkOut);
    } else {
      this.searchFields = defaultSearchFields;
    }
  },
  formatDate(date) {
    if (!date) return undefined;

    let _month = date.getMonth() + 1;
    let mm = _month > 9 ? _month : `0${_month}`;
    let _date = date.getDate();
    let dd = _date > 9 ? _date : `0${_date}`;
    let yy = date.getFullYear();
    return `${mm}/${dd}/${yy}`;
  },
  handleSearchClick() {
    if(!Parse.User.current()){
      alert("Please login first");
      return;
    };
    
    let destination = this.refs.destination.getValue();
    let checkIn = this.formatDate(this.refs.checkIn.getDate());
    let checkOut = this.formatDate(this.refs.checkOut.getDate());
    
    if (destination && checkIn && checkOut) {
      let query = {
        destination,
        checkIn,
        checkOut
      };
      /* remove local cache first */
      localStorage.removeItem('hotels');
      this.history.pushState(null, `/result`, query);
      
      if (this.props.onNewSearch) {
        this.props.onNewSearch();
      }
      return;
    }

    let err = {};
    err.destinationErr = destination? '' : 'Please enter your destination';
    err.checkInErr = checkIn? '' : 'Please select check in date';
    err.checkOutErr = checkOut? '' : 'Please select check out date';

    this.setState(err);
  },
  handleCheckInChange(nill, date) {
    let checkOutDate = new Date(date.getTime() + 86400000);
    this.refs.checkOut.setDate(checkOutDate);
    this.setState({
      minCheckOutDate: checkOutDate
    });
  },
  render() {
    injectTapEventPlugin();
    let buttonStyle = {
      fontSize: '1.5em',
      position: 'relative',
      bottom: '3px'
    };
    let rowStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      marginTop: '0px',
      paddingTop: '20px',
      paddingBottom: '10px'
    };
    return (
      <div className="row" style={rowStyle}>
        <form>
          <div className="col-md-5">
            <DestInput
              errorText={this.state.destinationErr}
              defaultValue={this.searchFields.destination}
              bottom={this.props.bottom}
              ref="destination" />
          </div>
          <div className="col-md-3">
            <DatePicker
              className="input-fields"
              hintText="Check in"
              autoOk={true}
              formatDate={this.formatDate}
              minDate={this.state.minCheckInDate}
              errorText={this.state.checkInErr}
              onChange={this.handleCheckInChange}
              ref="checkIn"
              defaultDate={this.searchFields.checkIn} />
          </div>
          <div className="col-md-3">
            <DatePicker
              className="input-fields"
              hintText="Check out"
              autoOk={true}
              formatDate={this.formatDate}
              minDate={this.state.minCheckOutDate}
              errorText={this.state.checkOutErr}
              ref="checkOut"
              defaultDate={this.searchFields.checkOut} />
          </div>
          <div className="col-md-1">
            { !this.props.fetching && <FloatingActionButton
              secondary={true}
              style={buttonStyle}
              onClick={this.handleSearchClick}>
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </FloatingActionButton> }
            { this.props.fetching && <FloatingActionButton
              secondary={true}
              style={buttonStyle}
              onClick={this.props.onCancel}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </FloatingActionButton> }
          </div>
        </form>
      </div>
    );
  }

});

export default Search;
