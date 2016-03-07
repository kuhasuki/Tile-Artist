var ReactDOM = require('react-dom');
var React = require('react');

var TrackStore = require('../stores/track_store.js');
var UserStore = require('../stores/user_store.js');

var ApiActions = require('../actions/api_actions.js');

var CommentForm = require('./comment_form.jsx');
var Comments = require('./comments.jsx');

var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Panel = require('react-bootstrap/lib/Panel');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');

var Api = require('../util/api.js');
var progress = 0;

function build() {
 
  var audioElement = document.getElementById('audioElement');
  audioElement.crossOrigin = "anonymous";
  $('#audioElement').on('timeupdate', function() {
     $('#seekbar').attr("value", this.currentTime / this.duration);
	});
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(120);

  var contentWidth = $('#track-content').width();

  var svgHeight = '300';
  var svgWidth = contentWidth + 30;
  var barPadding = '0';

  function createSvg(parent, height, width) {
    return d3.select(parent).insert('svg').attr('height', height).attr('width', width).attr('id', 'svg').style({"background-color": "rgba(255,255,255,0.3)"});
  }

  var svg = createSvg('#destiny', svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
           return 'rgb(' + d + ', ' + d + ', 255)';
        });
  }

  // Run the loop
  renderChart();

};

var Track = React.createClass({
	getInitialState() {
	    return {
	        track: {title:"Song",author:"artist"}, artist: {}
	    };
	},

  componentWillMount() {
        
  },

	componentDidMount() {
		Api.fetchTracks();
    // Api.getUserInfo(this.state.track.user_id);
	  this.listenerToken = TrackStore.addListener(this._getTrack);
    // this.listenerToken2 = UserStore.addListener(this._getArtist);
    build();
    console.log(this.state.track)
	      
	},

	componentWillUnmount() {
	    this.listenerToken.remove();  
	},

  componentDidUpdate() {
    componentHandler.upgradeDom();  
  },

	getProgress(){
		return Math.round(progress * 100);

	},

	play(){
		ApiActions.stopPlayback();
    d3.select(svg).style({"background-color": "rgba(255,255,255,1)"});
    document.getElementById('audioElement').play();
	},

	pause(){
    d3.select(svg).style({"background-color": "rgba(255,255,255,0.5)"});
    document.getElementById('audioElement').pause();
	},


	_getTrack(){
		this.setState({
			track: TrackStore.getTrackById(this.props.params.id)
		})
	},

  // _getArtist(){
  //   this.setState({
  //     artist: UserStore.getPublicUser()
  //   })
  // },

  render: function(){
    return(
    	<Col xs={12} id="track-content">
    	<Row >
      	<Col xs={4} className="show-grid mdl-card mdl-shadow--4dp card-space">
      		<span><h4 style={{"display":"inline-block"}}>{this.state.track.title}</h4>&nbsp;&nbsp;by&nbsp;&nbsp;<a href={'#/' + this.state.track.user_id + '/tracks'}>{this.state.track.author}</a></span>
      	</Col>   	
      	<Col xs={8} >
          
      		<button onClick={this.play} className="soup mdl-button mdl-js-button mdl-button--fab mdl-button--colored"><Glyphicon glyph="play" /></button>
      		&nbsp;
      		<button onClick={this.pause} className="soup mdl-button mdl-js-button mdl-button--fab mdl-button--colored"><Glyphicon glyph="pause" /></button>
      	</Col>   	
      </Row>
    	<progress id="seekbar" value="0" max="1" style={{"width":"100%"}}></progress>
    	<Row className="show-grid mdl-card mdl-shadow--4dp card-space">
      	<Col >
      		<div id="destiny" style={{"background":this.state.track.bg}}></div>
      	</Col>
      </Row>

      <Row className="show-grid mdl-card mdl-shadow--4dp card-space">
      	<Col xs={12}>
      			<br></br>	
      			<span>Genre: {this.state.track.genre}</span><br></br>
      			<span>Description: {this.state.track.description}</span><br></br><br></br>
						<audio src={this.state.track.src} preload="auto" id="audioElement">
						</audio>

      	</Col>
      	</Row>


      <Row className="show-grid mdl-card mdl-shadow--4dp card-space">
      	<Col xs={12}>
      	<Comments track_id={this.props.params.id} />
      	<CommentForm track_id={this.props.params.id}/>
      	</Col>
      	</Row>
      </Col>
    );
  }
});

module.exports = Track;
