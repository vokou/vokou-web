import React from 'react';
import reqwest from 'reqwest';

function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

const Invite = React.createClass({
  handleSubmit() {

  },
  render() {
    let inputStyle = {
      width: '276px',
      marginRight: '10px'
    };
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1>Welcome to vokou!</h1>
          <p className="lead">vokou is currently under private beta and it's invite only.
            Please leave your e-mail below to get your invitation code.</p>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="sr-only" for="emailInput">Email address</label>
              <input type="text"
                     className="form-control"
                     id="emailInput"
                     placeholder="Please leave your e-mail address"
                     style={inputStyle} />
            </div>
            <button type="submit" className="btn btn-default">Get invitation</button>
          </form>
        </div>
      </div>
    );
  }
});

export default Invite;