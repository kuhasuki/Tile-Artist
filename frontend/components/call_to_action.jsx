var React = require('react');

var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var SearchBar = require('./search_bar.jsx');

var CallToAction = React.createClass({
  render: function(){
    return(
    	<Row >
       	<Jumbotron className="landing-graphic" >
       		<Col xs={12}>
		    		<h2 className="welcome-header">Turn it up</h2>
		    		<p >Discover incredible music. Control the mix. </p>
		    		<p >Find your perfect soundscape</p>
		    		<a href="#/explore"><button className="outline-button mdl-button mdl-js-button mdl-js-ripple-effect">Explore</button></a>
		    		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		    		or
		    		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		    		<a href="#/upload"><button className="outline-button mdl-button mdl-js-button mdl-js-ripple-effect">Upload</button></a>
		    	</Col>

		    	<Col xs={6}>
						
					</Col>
		    	<Col xs={6} className="text-left">
		    			
	    		</Col>
				</Jumbotron>
  		</Row>
    );
  }
});



module.exports = CallToAction;