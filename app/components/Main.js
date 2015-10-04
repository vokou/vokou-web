import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Modal from './modal/Modal';
import LoginForm from './accounts/Login';


const Main = React.createClass({

  
  getInitialState() {
    return { modalIsOpen: false };
  },
    
  openModal() {
    this.setState({modalIsOpen: true});
  },

  closeModal() {
    this.setState({modalIsOpen: false});
  },
  
  render() {
    injectTapEventPlugin();
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Logo</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li ><a href="javascript:;" onClick={this.openModal}>Login or register</a></li>
            </ul>
          </div>
        </nav>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          title="Vokou">
          
          <LoginForm />
          
        </Modal>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Main;
