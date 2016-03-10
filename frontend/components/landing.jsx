var React = require('react');
var ReactDOM = require('react-dom');
var Api = require('../util/api.js');

var ApiActions = require('../actions/api_actions.js');
var SessionStore = require('../stores/session_store.js');

var Login = require('./login.jsx');
var Register = require('./register.jsx');


var Landing = React.createClass({

    getInitialState() {
        return {
            loggedIn: false
        }
    },

    componentWillMount() {
      Api.verifySession();
      this.listenerToken = SessionStore.addListener(this._getUser);
    },

    componentWillUnmount() {
      this.listenerToken.remove();  
    },

    _getUser() {
      this.setState({
        loggedIn: SessionStore.loginStatus()
      })
    },

    render: function(){

      if(this.state.loggedIn) {
        window.location = "#/home";
        return(
          null
        );
      } else {
        return(
          <div className="center">
            <h1>Welcome to Tile Artist</h1>
            <h3>
              <Login />&nbsp;or&nbsp;
              <Register />&nbsp;to get started
            </h3>
          </div>
        );
      }

    }
});



module.exports = Landing;