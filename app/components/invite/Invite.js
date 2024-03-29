import React from 'react';
import ReactDOM from 'react-dom';
import reqwest from 'reqwest';
import servers from '../../config/servers.js'

function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

const Invite = React.createClass({
  getInitialState() {
    return {
      err: undefined,
      text: undefined
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    let self = this;
    let email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    if (!validateEmail(email)) {
      this.setState({
        err: 'Please enter valid email address'
      });
      return
    }
    reqwest({
      url: `${servers.vokou}apply`,
      method: 'post',
      data: {email: email},
      success: function(resp) {
        self.setState({text: "Thank you! Your invitation code would be sent to you via email during our beta!"});
      },
      error: function(err) {
        let errMsg = `An error occures {err.status}`;
        if(err.status == 403)
          errMsg = "Sorry, You've already applied!";
        else if(err.status == 404)
          errMsg = "Sorry, no more invitation left. We have added you to the waiting list.";
          self.setState({err: errMsg});
      }
    })
  },
  handleClose() {
    this.setState({
      err: undefined
    });
  },
  render() {
    let inputStyle = {
      width: '276px',
      marginRight: '10px'
    };
    let errStyle = {
      position: 'absolute',
      top: '130%',
      width: '100%'
    };
    let errorPanel =
      <div style={errStyle}>
        <div className="alert alert-danger alert-dismissible" role="alert">
          <button type="button" className="close"aria-label="Close" onClick={this.handleClose}><span aria-hidden="true">&times;</span></button>
          {this.state.err}
        </div>
      </div>;
    let infoPanel =
      <div>
        <h3>{this.state.text}</h3>
      </div>;
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
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h1>Welcome to vokou!</h1>
              <p className="lead">vokou is currently under private beta and it's invite only.
                Please leave your e-mail below to get your invitation code.</p>
              <div>
                <div style={{position: 'relative'}}>
                  {this.state.err && errorPanel}
                  <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input type="text"
                             className="form-control"
                             id="emailInput"
                             placeholder="Please enter your e-mail address"
                             style={inputStyle}
                             ref="email" />
                    </div>
                    <button type="submit" className="btn btn-default">Get invitation</button>
                  </form>
                </div>
              </div>
              {this.state.text && infoPanel}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Invite;
