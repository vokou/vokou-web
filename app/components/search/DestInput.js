import React from 'react';
import { TextField, Styles } from 'material-ui';
import CompleteMenu from './CompleteMenu.js';
import cityList from '../../utils/cityList.json';
let ThemeManager = new Styles.ThemeManager();

const DestInput = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getValue() {
    return this.refs.destination.getValue();
  },
  getInitialState() {
    return {
      cities: []
    }
  },
  handleInputChange() {
    let input = this.refs.destination.getValue();
    if (input.length > 1) {
      let matches = [];
      let substrRegex = new RegExp(`^${input}`, 'i');

      for (let i = 0; i < cityList.length; i++) {
        let str = cityList[i];
        if (substrRegex.test(str) && matches.length < 7) {
          matches.push(str);
        }
      }

      this.setState({
        cities : matches
      });
    } else {
      this.setState({
        cities: []
      });
    }
  },
  handleBlur() {
    this.refs.menu.hide();
  },
  handleFocus() {
    this.refs.menu.show();
  },
  handleFill(city) {
    this.refs.destination.setValue(city);
  },
  render() {
    return (
      <div>
        <TextField
          hintText="Where are you going?"
          floatingLabelText="Destination"
          fullWidth={true}
          errorText={this.props.errorText}
          ref="destination"
          defaultValue={this.props.defaultValue}
          id="destination"
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus} />
        <CompleteMenu
          cities={this.state.cities}
          handleFill={this.handleFill}
          bottom={this.props.bottom}
          ref="menu" />
      </div>
    );
  }
});

export default DestInput;