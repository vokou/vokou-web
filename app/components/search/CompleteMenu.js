import React from 'react';
require('./style.css');

const CompleteMenu = React.createClass({
  getInitialState() {
    return {
      list: undefined
    }
  },
  componentDidMount() {
    this.focus = false;
  },
  componentWillReceiveProps(nextProps) {
    if (this.focus) {
      this.init(nextProps.cities);
    }
  },
  init(cities) {
    let self = this;
    let list = cities.map(function(city, i) {
      return (
        <li key={i} onClick={self.handleClick.bind(self, city)}>
          <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp;
          <div className="menu-item">{city}</div>
        </li>
      )
    });
    this.setState({
      list: list
    });
  },
  handleClick(city) {
    this.props.handleFill(city);
  },
  hide() {
    this.focus = false;
    this.setState({
      list: undefined
    });
  },
  show() {
    this.focus = true;
    this.init(this.props.cities);
  },
  render() {
    let ulStyle = {left: '0'};
    if (this.props.bottom) {
      ulStyle.bottom = '65px';
    } else {
      ulStyle.top = '70px';
    }
    return (
      <ul className="menu" style={ulStyle}>
        {this.state.list}
      </ul>
    );
  }
});

export default CompleteMenu;