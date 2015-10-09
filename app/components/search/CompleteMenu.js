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
        <li key={i}>
          <div className="menu-item" onClick={self.handleClick.bind(self, city)}>{city}</div>
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
    setTimeout(() => {
      this.setState({
        list: undefined
      });
    }, 100);
  },
  show() {
    this.focus = true;
    this.init(this.props.cities);
  },
  render() {
    let ulStyle = {
      listStyle: 'none',
      position: 'abosolute',
      top: '95%',
      paddingLeft: 0,
      zIndex: 100
    };
    return (
      <ul className="menu" style={ulStyle}>
        {this.state.list}
      </ul>
    );
  }
});

export default CompleteMenu;