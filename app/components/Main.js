import React from 'react';

const Main = React.createClass({
  render : function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Logo</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Login or register</a></li>
            </ul>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Main;