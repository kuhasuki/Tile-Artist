var React = require('react');
var Api = require('../util/api.js');

var SessionStore = require('../stores/session_store.js');
var PictureStore = require('../stores/picture_store.js');

var Home = React.createClass({
  getInitialState() {
	    return {
	    	user: {},
	   		pics: []
	    };
	},
	componentDidMount() {
			Api.verifySession();
			this.listenerToken = SessionStore.addListener(this._gotUser);
	    console.log(this.props.route);

	},
	componentWillReceiveProps(nextProps) {
	       console.log(this.props);
	},
	_gotPictures(){
			var newPics = PictureStore.getPicturesById(this.state.user.id);
			console.log(newPics);
			this.setState({pics: newPics})
	},

	_gotUser(){
		var newUser = SessionStore.getUser();
		this.setState({
      user: newUser
    })
    Api.fetchPicsById(newUser.id);
    this.listenerToken.remove();
    this.listenerToken2 = PictureStore.addListener(this._gotPictures);

	},

  componentWillUnmount() {
    this.listenerToken.remove();
    this.listenerToken2.remove();    
  },


  render: function(){
  	console.log(this.state.pics);
  	if(this.state.user.id != undefined){
    	return(
	    	<div style={{'width':'100%', 'height': '100%', 'paddingTop' : '2px'}} className="center">
	    	<h2>All of your pictures!</h2>
	     		{
	        this.state.pics.map(function(pic, idx){
	        	
		        return(


			                <div key={idx} className="col-xs-4" style={{'height': '100px', 'padding':'2px'}}>
			    	            <div style={{'height': '100%'}}>
	                  			<div style={{'width':'100%', 'height': '100%', 'backgroundColor':  pic.base}} >
	                    			<a style={{'width':'100%', 'height': '100%', 'fontSize' : '30px', 'textDecoration' : 'none', 'color' : 'black'}} className="btn" href={"#/pic/" + pic.id}> {pic.title} </a>
	                  			</div>
	                			</div>
			                </div>
			              )

	        }.bind(this))
      	}
	     	</div>
    	)} else {
    		return(null);
    	}
  }
});



module.exports = Home;