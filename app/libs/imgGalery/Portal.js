import React from 'react';
import ReactDom from 'react-dom';
module.exports = React.createClass({
	displayName: 'Portal',
	portalElement: null,
	render: () => null,
	componentDidMount() {
		var p = this.props.portalId && document.getElementById(this.props.portalId);
		if (!p) {
			var p = document.createElement('div');
			if (this.props.portalId) {
				p.id = this.props.portalId;
			}
			document.body.appendChild(p);
		}
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate() {
		ReactDom.render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
	}
});
