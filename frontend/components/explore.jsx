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

var Explore = React.createClass({

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
        tracks: TrackStore.getAllTracks()
      })
    },

    play(track){
      ApiActions.startPlayback(track);
      //console.log("sticky track id is:" + TrackStore.getStickyTrackId());
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
    	<Col xs={12} className="mdl-card mdl-shadow--4dp">
      <br></br>
      <h3 style={{"textAlign":"center"}}>Explore all Tracks</h3>
      <div  style={{"display": visibility, 'margin':"auto"}} className="mdl-spinner mdl-js-spinner is-active"></div>
      <br></br>
        <Row>
          {
            this.state.tracks.map(function(track, idx){
              return(
                
                  <Col key={idx} xs={4} style={trackStyle} className="track-element-landing card-space">
                      
                       <Panel style={{"margin": "0"}}>
                        <a href={'#/track/' + track.id} >{track.title}</a><span> by </span>
                        <a href={"#/" + track.user_id + "/tracks"} >{track.author}</a><hr></hr>
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



module.exports = Explore;