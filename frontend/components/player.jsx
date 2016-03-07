var ReactDOM = require('react-dom');
var React = require('react');

var TrackStore = require('../stores/track_store.js');

var ApiActions = require('../actions/api_actions.js');

var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Button = require('react-bootstrap/lib/Button');

var Col = require('react-bootstrap/lib/Col');

var Player = React.createClass({
	getInitialState() {
  	return {
  	  track: { src : ''}
  	};
  },
  componentDidMount() {
	 	this.listenerToken = TrackStore.addListener(this._trackChange);    
	},

	componentWillUnmount() {
	    this.listenerToken.remove();  
	},

	_trackChange(){
		this.setState({
			track: TrackStore.getStickyTrack()
		})
	},

	play(){
    ApiActions.startPlayback(this.state.track);
    document.getElementById('player').play();
	},

	pause(){
    ApiActions.pausePlayback(this.state.track);
    document.getElementById('player').pause();
	},

	stahp(){
		ApiActions.stopPlayback();
	},

  render: function(){
  	if(TrackStore.play()){
  		    return(
  		    <Col xs={12} className="player-toolbar mdl-card mdl-shadow--4dp">
  		    	<div >
		    			<span>Currently playing: &nbsp;<a href={'#/track/' + this.state.track.id}>{this.state.track.title}</a> &nbsp;by &nbsp;{this.state.track.author}&nbsp; &nbsp; </span>
  		    		<Button onClick={this.play} ><Glyphicon glyph="play" /></Button>
      				&nbsp;
      				<Button onClick={this.pause} ><Glyphicon glyph="pause" /></Button>
      				&nbsp;
      				<Button onClick={this.stahp} ><Glyphicon glyph="stop" /></Button>
     				<audio src={this.state.track.src} id="player" autoPlay></audio>
     			</div>
     		</Col>
    	);
  	} 
  	else {
  		return(null);
  	}

  }
});

module.exports = Player;
