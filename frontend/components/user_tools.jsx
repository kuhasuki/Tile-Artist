'use strict';
var ReactDOM = require('react-dom');
var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var Alert = require('react-bootstrap/lib/Alert');

var Api = require('../util/api.js');

var UserStore = require('../stores/user_store.js');

var Login = require('./login.jsx');
var Register = require('./register.jsx');
var Guest = require('./guest.jsx');
var Logout = require('./logout.jsx');
var ProfileOptions = require('./profile_options.jsx');

var profilePicStyle = {
    maxHeight: '42px',
    paddingTop: '10px',
}

var UserTools = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
      return {
          "loggedIn" : UserStore.loginStatus(), "user" : UserStore.getUser()
      };
  },
  componentDidMount() {
      UserStore.addListener(this._loginStatus);
  },

  _loginStatus() {
    this.setState({"loggedIn": UserStore.loginStatus(), "user" : UserStore.getUser()});
  },
  
  render: function(){
    if(this.state.loggedIn) {
      return(
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="#/upload" >Upload</a>
          </li>         
        <ProfileOptions />
        <Logout />
      </ul>

      );
    } else {
      return(
        <ul className="nav navbar-nav navbar-right">
          <Login />
          <Register />
          <Guest />
      </ul>

      );
    }
  }
});



module.exports = UserTools;
