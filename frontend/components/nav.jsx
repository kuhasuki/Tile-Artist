var ReactDOM = require('react-dom');
var React = require('react');

var UserTools = require('./user_tools.jsx');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var UserStore = require('../stores/user_store.js');

var AlertActions = require('../actions/alert_actions.js');


var Navigation = React.createClass({
  clearAlerts(){
    AlertActions.clear()
  },

  render: function(){
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top mdl-shadow--4dp" role="navigation" >
      <div className="container ">
        <div className="navbar-header ">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
  	        <span className="icon-bar"></span>
  	        <span className="icon-bar"></span>
  	        <span className="icon-bar"></span>
  	      </button>
        <a className="navbar-brand" href="#" onClick={this.clearAlerts} ><Glyphicon glyph="equalizer" /> Beatlab</a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav ">
            <li><a href="#/" onClick={this.clearAlerts}>Home</a></li>
            <li><a href="#/explore" onClick={this.clearAlerts}>Explore</a></li>
          </ul>
            <UserTools />
        </div>
      </div>
    </nav>
    );
  }
});

module.exports = Navigation;
