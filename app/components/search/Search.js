import React from 'react';
import { History } from 'react-router';
import { TextField, DatePicker, FloatingActionButton, Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
    return {
      destinationErr: '',
      checkInErr: '',
      checkOutErr:''
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
  componentDidMount() {
    var inputOptions = {types: ['(cities)']};
    new google.maps.places.Autocomplete(
      document.getElementById('destination'),
      inputOptions);
    document.getElementById('destination').placeholder = '';
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
  handleSubmit() {
    let destination = this.refs.destination.getValue();
    let checkIn = this.formatDate(this.refs.checkIn.getDate());
    let checkOut = this.formatDate(this.refs.checkOut.getDate());

    if (destination && checkIn && checkOut) {
      let query = {
        destination,
        checkIn,
        checkOut
      };
      this.history.pushState(null, `/result`, query);
      return;
    }

    let err = {};
    err.destinationErr = destination? '' : 'Please enter your destination';
    err.checkInErr = checkIn? '' : 'Please select check in date';
    err.checkOutErr = checkOut? '' : 'Please select check out date';

    this.setState(err);
  },
  // TODO: build dedicated component for google autocomplete e.target.value
  // TODO: Date picker restriction and auto focus
  render() {
    injectTapEventPlugin();
    let buttonStyle = {
      fontSize: '1.5em',
      marginTop: "20px"
    };
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="col-md-5">
            <TextField
              hintText="Where are you going?"
              floatingLabelText="Destination"
              fullWidth={true}
              errorText={this.state.destinationErr}
              ref="destination"
              defaultValue={this.searchFields.destination}
              id="destination" />
          </div>
          <div className="col-md-3">
            <DatePicker
              hintText="Check in"
              autoOk={true}
              formatDate={this.formatDate}
              errorText={this.state.checkInErr}
              ref="checkIn"
              defaultDate={this.searchFields.checkIn}
              textFieldStyle={{
                marginTop: "24px"
              }} />
          </div>
          <div className="col-md-3">
            <DatePicker
              hintText="Check out"
              autoOk={true}
              formatDate={this.formatDate}
              errorText={this.state.checkOutErr}
              ref="checkOut"
              defaultDate={this.searchFields.checkOut}
              textFieldStyle={{
                marginTop: "24px"
              }} />
          </div>
          <div className="col-md-1">
            <FloatingActionButton
              secondary={true}
              style={buttonStyle}
              type="submit">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </FloatingActionButton>
          </div>
        </form>
      </div>
    );
  }

});

export default Search;
