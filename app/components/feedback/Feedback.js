import React from 'react';
import $ from 'jquery';
import feedbackLib from '../../libs/feedback.min.js';
import feedbackstyle from '../../libs/feedback.min.css';

const Feedback = React.createClass({
  componentDidMount() {
    $.feedback({
      ajaxURL: 'https://vokou.parseapp.com/feedback',
      html2canvasURL: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js'
    });
  },
  render() {
    return (
      <div>
      </div>
    );
  }
});

export default Feedback;
