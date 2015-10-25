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
    let bgStyle = {
      width: '100%',
      height: '90vh',
      position: 'absolute',
      top: '52px',
      left: 0
    };
    return (
      <div>
        <img src="https://s3.amazonaws.com/vokou/assets/bg.jpg" style={bgStyle}/>
        <div style={footerStyle}>
          <div className="container">
            <Search bottom={true}/>
          </div>
        </div>
      </div>
    );
  }
});

export default Home;