var ReactDOM = require('react-dom');
var React = require('react');

var TrackStore = require('../stores/track_store.js');
var UserStore = require('../stores/user_store.js');

var Api = require('../util/api.js');

var ApiActions = require('../actions/api_actions.js');

var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Panel = require('react-bootstrap/lib/Panel');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var trackStyle = {"padding": "0", "width": "32%"}

var MyTracks = React.createClass({
		getInitialState() {
		    return {
		        tracks: []  
		    };
		},

	componentDidMount() {
		Api.getUserInfo(this.props.params.user_id);
		Api.fetchMyTracks(this.props.params.user_id);
	  this.listenerToken = TrackStore.addListener(this._getMyTracks);    
	},

	componentWillUnmount() {
	    this.listenerToken.remove();  
	},

	_getMyTracks(){
		this.setState({
			tracks: TrackStore.getAllTracks()
		})
	},

	play(track){
      ApiActions.startPlayback(track);
      if(!!document.getElementById('player')){
        document.getElementById('player').play();
      }
    },

    pause(track){
      ApiActions.pausePlayback(track);
      document.getElementById('player').pause();
    },


    isPaused(id){
      if(TrackStore.getStickyTrackId() === id){

        if(TrackStore.paused()){
          return true;
        } else {
          return false;
        }
        
      } else {
        return true;
      }
    },


  render() {
    return (
    	 <Col xs={12} >
          <Row className="show-grid mdl-card mdl-shadow--4dp card-space">
            <Col xs={12}>
      				<h4>Tracks by {UserStore.getPublicUser().name}</h4>
      			</Col>
      		</Row>
      		<Row  >
      		{
      			this.state.tracks.map(function(track, idx){
      				return(
      					
            			<Col key={idx} xs={4} style={trackStyle} className="track-element show-grid mdl-card mdl-shadow--4dp card-space">
      							   <Panel header={track.title} bsStyle="primary" style={{"margin": "0", 'background': track.bg}}>
      									{this.isPaused(track.id) ?  <Button bsSize="large" onClick={this.play.bind(this, track)} ><Glyphicon glyph="play" /> Play</Button> : <Button bsSize="large" onClick={this.pause.bind(this, track)} ><Glyphicon glyph="pause" /> Pause</Button> }
      									&nbsp;
      									<Button bsSize="large" href={"#/track/" + track.id} ><Glyphicon glyph="chevron-right" /> Track Detail</Button>
   										</Panel>

      					</Col>
      				
      					
      					)
      			}.bind(this))
      		}
      		</Row>
      	</Col>
    );
  }
});

module.exports = MyTracks;