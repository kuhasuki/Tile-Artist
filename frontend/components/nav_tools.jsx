var React = require('react');

var Login = require('./login.jsx');
var Register = require('./register.jsx');


var NavTools = React.createClass({

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
      return(
		    <ul className="nav navbar-nav">
		      <li className="active"><a href="#">My Pictures</a></li>
		      <li><a href="#new">New Picture</a></li>
		      <li><a rel="nofollow" data-method="delete" href="/sessions">Logout</a></li>
		    </ul>
    	);
    } else {
      return(null);
    }
  }
});



module.exports = NavTools;