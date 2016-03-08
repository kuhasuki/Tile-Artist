var ReactDOM = require('react-dom');
var React = require('react');


var SessionStore = require('../stores/session_store.js');

var AlertActions = require('../actions/alert_actions.js');

var Header = require('./header.jsx');
var NavTools = require('./nav_tools.jsx');


var Navigation = React.createClass({
  render: function(){
    return(      
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Tile Artist</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <NavTools />
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navigation;
