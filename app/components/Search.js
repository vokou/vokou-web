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
  componentDidMount: function() {
    var inputOptions = {types: ['(cities)']};
    new google.maps.places.Autocomplete(
      document.getElementById('destination'),
      inputOptions);
    document.getElementById('destination').placeholder = '';
  },
  formatDate(date) {
    let _month = date.getMonth() + 1;
    let mm = _month > 9 ? _month : `0${_month}`;
    let _date = date.getDate();
    let dd = _date > 9 ? _date : `0${_date}`;
    let yy = date.getFullYear();

    return `${dd}/${mm}/${yy}`;
  },
  handleClick() {
    let destination = document.getElementById('destination').value;
    // TODO: date validation
    let query = {
      destination: destination,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    };
    this.history.pushState(null, `/result`, query);
  },
  // TODO: build dedicated component for google autocomplete e.target.value
  // TODO: Date picker restriction and auto focus
  render: function() {
    let buttonStyle = {
      fontSize: '1.5em'
    };
    injectTapEventPlugin();
    return (
      <div className="row">
        <form>
          <div className="col-md-5 align-bottom">
            <TextField
              hintText="Where are you going?"
              floatingLabelText="Destination"
              fullWidth={true}
              id="destination" />
          </div>
          <div className="col-md-3 align-bottom">
            <DatePicker
              hintText="Check in"
              autoOk={true}
              onChange={ (_null, date) => {
                this.checkIn = this.formatDate(date);
              }} />
          </div>
          <div className="col-md-3 align-bottom">
            <DatePicker
              hintText="Check out"
              autoOk={true}
              onChange={ (_null, date) => {
                this.checkOut = this.formatDate(date);
              }} />
          </div>
          <div className="col-md-1 align-bottom">
            <FloatingActionButton
              secondary={true}
              style={buttonStyle}
              onClick={this.handleClick} >
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </FloatingActionButton>
          </div>
        </form>
      </div>
    );
  }

});

export default Search;
