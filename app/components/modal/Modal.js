import React            from 'react/addons';
import Modal            from 'react-modal';

require("./modal.css");

const customStyles = {
  content : {
    border: 'none'
  }
};

var VokouModal = React.createClass({

  render: function() {
    return (
      <Modal className="modal-dialog" style={customStyles} {...this.props} >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onTouchTap={this.props.onRequestClose} >
              <span>&times;</span>
              <span className="sr-only">Close</span>
            </button>

            <h4 className="modal-title">{this.props.title}</h4>
          </div>

          <div className="modal-body">
            {this.props.children}
          </div>
        </div>
      </Modal>
    );
  },
});

export default VokouModal;
