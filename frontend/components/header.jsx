var React = require('react');

var Header = React.createClass({
  render: function(){
    return(
  		<header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
         
          <span className="mdl-layout-title">Tile Artist</span>
         
          <div className="mdl-layout-spacer"></div>
         
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <a className="mdl-navigation__link" href="">My Pictures</a>
            <a className="mdl-navigation__link" href="">New Picture</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
  		</header>
    );
  }
});



module.exports = Header;