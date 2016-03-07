'use strict';
var ReactDOM = require('react-dom');
var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Api = require('../util/api.js');
var NavDropdown = require('react-bootstrap/lib/NavDropdown');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var UserStore = require('../stores/user_store.js');

var ProfileOptions = React.createClass({
  getInitialState() {
      return {
          user: UserStore.getUser()  
      };
  },
  _userChanged() {
    this.setState({
      user: UserStore.getUser()
    });
  },
  componentDidMount() {
      this.ListenerToken = UserStore.addListener(this._userChanged);  
  },
  render: function(){
    return(
        <NavDropdown eventKey={3} title={this.state.user.name} id="basic-nav-dropdown">
          <MenuItem eventKey={3.3} href={"#/" + this.state.user.id + "/tracks"}><Glyphicon glyph="th-list" /> Tracks</MenuItem>
          <MenuItem eventKey={3.4} href={"#/artist"}><Glyphicon glyph="picture" /> Artist Image</MenuItem>
        </NavDropdown>
    );
  }
});



module.exports = ProfileOptions;