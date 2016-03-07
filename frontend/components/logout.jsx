var React = require('react');

var Logout = React.createClass({
  render: function(){
    return(
      <li>
        <a rel="nofollow" data-method="delete" href="/sessions">Logout</a>
      </li>
    );
  }
});



module.exports = Logout;