var ReactDOM = require('react-dom');
var React = require('react');

var Notices = require('./notices.jsx');



var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var divStyle = {
	border: 'solid 1px black'
};

var Content = React.createClass({
  render: function(){
    return(
		  <Grid>
		    <Row id="notices" className="show-grid mdl-card mdl-shadow--4dp">
		      <Col><Notices /></Col>
		    </Row>

		    <Row>
		    	{this.props.children}
		    </Row>

		  </Grid>
    );
  }
});

module.exports = Content;
