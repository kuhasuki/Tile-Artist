var React = require('react');
var ReactDom = require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Api = require('../util/api.js');
var AlertActions = require('../actions/alert_actions.js');
var ImageStore = require('../stores/image_store.js');
var UserStore = require('../stores/user_store.js');

var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var ArtistUpload = React.createClass({
	mixins: [LinkedStateMixin],
    getInitialState() {
      return {
        alt: '', file : null
      };
    },
    componentWillMount() {
         this.user = {artist_image_url : ''};  
         this.imgHeight = 0;
    },

    componentDidMount() {

      this.formData = new FormData();
      this.uploadInProgress = false;
      this.submitText = "Upload";
     
      
      this.listenerToken = ImageStore.addListener(this._imageChanged);
      this.listenerToken2 = UserStore.addListener(this._userChanged);
      this.forceUpdate(); 
    },

    componentWillUnmount() {
          this.listenerToken.remove();  
          this.listenerToken2.remove();
          AlertActions.clear();  
    },

    componentDidUpdate() {
        //any react component not mounted on initial page load needs to be registered with mdl component handler
        var spin = ReactDom.findDOMNode(this.refs.spinner);
        componentHandler.upgradeElement(spin, "MaterialSpinner");
    },

    _imageChanged() {
        if(ImageStore.uploadReady()){
            var image = ImageStore.getUploadedImage();
            window.location.href = "#/";
        } else {
            this.uploadInProgress = false;
            this.submitText = "Upload";
            this.forceUpdate();
        }
    },

    _userChanged(){
        this.user = UserStore.getUser();
        if(this.user.artist_image_url != ''){
            AlertActions.info("Uploading an Artist Image will overwrite this one");
            this.imgHeight = 200;
        } else {
            this.imgHeight = 0;
        }
        this.forceUpdate();
    },

    handleSubmit(e){
    	e.preventDefault;

      this.uploadInProgress = true; 
      this.submitText = "Uploading...";

      this.forceUpdate();

    	this.formData.append('artist_image', JSON.stringify(this.state));
    	Api.uploadImage(this.formData);
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
            <div style={{'height': this.imgHeight + 'px', 'background': this.user.artist_image_url}}></div>
            <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                <h4>Upload an Artist Image</h4>
        	    <form>
                <Input type="text" label="Description" valueLink={this.linkState('alt')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <Input type="file" accept="image/*" className="btn" style={{"marginBottom" : "10px"}} label="File" onChange={this.sayFile} labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
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

module.exports = ArtistUpload;