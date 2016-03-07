var React = require('react');
var ReactDom = require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Api = require('../util/api.js');
var TrackStore = require('../stores/track_store.js');

var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var TrackUpload = React.createClass({
	mixins: [LinkedStateMixin],
    getInitialState() {
      return {
        title: '', file : null, genre: '', description: ''
      };
    },

    componentDidMount() {
      this.formData = new FormData();
      this.uploadInProgress = false;
      this.submitText = "Upload";
      this.listenerToken = TrackStore.addListener(this._trackChanged);
      this.forceUpdate(); 
    },

    componentDidUpdate() {
        //any react component not mounted on initial page load needs to be registered with mdl component handler
        var spin = ReactDom.findDOMNode(this.refs.spinner);
        componentHandler.upgradeElement(spin, "MaterialSpinner");
    },

    _trackChanged() {
        if(TrackStore.uploadReady()){
            var track = TrackStore.getUploadedTrack();
            this.listenerToken.remove();
            window.location.href = "#/track/" + track.id;
        } else {
            this.uploadInProgress = false;
            this.submitText = "Upload";
            this.forceUpdate();
        }
    },

    handleSubmit(e){
    	e.preventDefault;

      this.uploadInProgress = true; 
      this.submitText = "Uploading...";

      this.forceUpdate();

    	this.formData.append('track', JSON.stringify(this.state));
    	Api.upload(this.formData);
    },

    sayFile(e){
      e.preventDefault;
    	var file = e.target.files[0];
    	this.formData.append('file', file, file.name);
    	this.setState({file : file});
    },

    render() {  
        if(this.uploadInProgress){
            visibility = "inline-block";
        } else {
            visibility = "none";
        }
        return (
        <Col xs={12} className="show-grid mdl-card mdl-shadow--4dp upload-form">
            <Row>
            <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                <h4> Upload a Track</h4>
        	    <form>
                <Input type="text" label="Title" valueLink={this.linkState('title')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <Input type="file" accept=".mp3" className="btn" style={{"marginBottom" : "10px"}} label="File" onChange={this.sayFile} labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
	        	
                <Input type="text" label="Genre" valueLink={this.linkState('genre')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />

	        	<Input type="textarea" label="Description" placeholder="" valueLink={this.linkState('description')} labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
        	<ButtonInput type="reset" value="Reset" style={{"marginBottom" : "10px"}} wrapperClassName="col-xs-offset-2 col-xs-10" />
	        	<ButtonInput value={this.submitText} disabled={this.uploadInProgress} onClick={this.handleSubmit} wrapperClassName="col-xs-offset-2 col-xs-2"/>
                <div ref="spinner"  style={{"display": visibility}} className="mdl-spinner mdl-js-spinner is-active"></div>
        	</form>
            </Col>
        </Row>
        </Col>

        );
    }
});

module.exports = TrackUpload;