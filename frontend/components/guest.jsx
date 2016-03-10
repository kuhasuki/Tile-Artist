var React = require('react');
var ReactDOM = require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Api = require('../util/api.js');

var Guest = React.createClass({
	guestLogin: function() {
    Api.login("guest","guest1");
	},

	render: function() {
		return (
      <a href="javascript:void(0)" onClick={this.guestLogin} >Guest Login</a>
		);
	}

});

module.exports = Guest;