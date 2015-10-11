import React from 'react';
import Search from './Search'

const Home = React.createClass({
  render() {
    let footerStyle = {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      paddingBottom: '60px'
    };
    return (
      <div style={footerStyle}>
        <div className="container">
          <Search bottom={true}/>
        </div>
      </div>
    );
  }
});

export default Home;