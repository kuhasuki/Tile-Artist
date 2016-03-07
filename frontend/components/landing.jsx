var React = require('react');
var CallToAction = require('./call_to_action.jsx');

var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var Panel = require('react-bootstrap/lib/Panel');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var TrackStore = require('../stores/track_store.js');

var Api = require('../util/api.js');

var ApiActions = require('../actions/api_actions.js');

var trackStyle = {"padding": "0", "width": "30%"}

var Landing = React.createClass({

    getInitialState() {
        return {
            tracks: []
        }
    },

    componentWillMount() {
        visibility = "inline-block";
    },


    componentDidMount() {
        componentHandler.upgradeDom();
        Api.fetchTracks();
          this.listenerToken = TrackStore.addListener(this._gotTracks);
    },

    componentWillUnmount() {
      this.listenerToken.remove();  
    },

    _gotTracks() {
      visibility = "none";
      this.setState({
        tracks: TrackStore.getAllTracks().slice(0, 12)
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


    render: function(){
    return(
    	<Col className="mdl-card mdl-shadow--4dp">
      	<CallToAction className="landing-graphic" />
      	<Row>
      		<Col xs={12} className="text-center" >
      			<h4>Trending now:</h4>
             <div  style={{"display": visibility, 'margin':"auto"}} className="mdl-spinner mdl-js-spinner is-active"></div>
      		</Col>
      	</Row>
        <Row>
          {
            this.state.tracks.map(function(track, idx){
              return(
                
                  <Col key={idx} xs={4} style={trackStyle} className="track-element-landing card-space">
                       <Panel header={track.title} style={{"margin": "0", 'background': track.bg}}>
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



module.exports = Landing;