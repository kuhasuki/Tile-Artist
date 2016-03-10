var React = require('react');
var Api = require('../util/api.js');

var ViewPicture = React.createClass({
	getInitialState() {
	    return {
	        pic: {grid:[], size: 0, title: 'Picture'}
	    };
	},
	componentDidMount() {
	    this.listenerToken = PictureStore.addListener(this._gotPicture);  
	    Api.fetchPicById(this.props.params.id);
	},
	componentWillUnmount() {
	    this.listenerToken.remove();  
	},
	_gotPicture(){
		var newPic = PictureStore.getPictureById(this.props.params.id);
		console.log(newPic);
		this.setState({pic: newPic})
	},
  render: function(){
  	console.log(this.state.pic);
  	var percentage = 100 / this.state.pic.size;
    return(
	    <div style={{'width':'100%', 'height': '100%'}} className="center">
	     	<h1>{this.state.pic.title}</h1>
	     	{
	        this.state.pic.grid.map(function(row, idx){
	        	return(
		          row.map(function(col, jdx){
		           	//console.log(col);
		           	return(
	                <div style={{'width': percentage + '%', 'height': percentage + '%', 'display':'inline-block', 'padding':'1px'}}>
	                <div key={idx+jdx} style={{'height': '100%'}}>
	                  <div style={{'width':'100%', 'height': '100%', 'backgroundColor':  col.color}} >
	                    &nbsp;
	                  </div>
	                </div>
	                </div>
	                );
		          }.bind(this))
	          )
	        }.bind(this))
      	}
	     </div>
    );
  }
});



module.exports = ViewPicture;