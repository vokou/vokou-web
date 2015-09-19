import React from 'react';

const Main = React.createClass({
  render : function() {
    return (
      <div>
        <header>
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
              <ul className="right">
                <li>Login or Register</li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Main;