var React = require('react');

var Drawer = React.createClass({
  render: function(){
    return(
  		<div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Tile Artist</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
      </div>
    );
  }
});



module.exports = Drawer;