'use strict';
var ReactDOM = require('react-dom');
var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Api = require('../util/api.js');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var Alert = require('react-bootstrap/lib/Alert');

var PictureStore = require('../stores/picture_store.js');


var Save = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
      return({title: '', userId: '', base: this.props.base, size: this.props.gridSize, grid: {}, errors: []});
  },

 closeModal: function() {
     this.setState({showModal : false, errors : ''});
 },

 openModal: function(){
      this.setState({showModal : true});
  },

  save: function(){
    Api.saveNewPicture(this.state.title, this.state.userId, this.state.base, this.state.size, this.state.grid);
  },

  _getErrors: function(){
    if (PictureStore.getError() != '') {
      this.setState({errors: PictureStore.getError()});
    } else if(PictureStore.saved()) {
      var pic = PictureStore.getSavedPicture();
      this.listenerToken.remove();
      window.location.href = "#/pic/" + pic.id;
    } else {
      this.setState({errors: []});
    }
  },

  componentDidMount: function () {
    this.listenerToken = PictureStore.addListener(this._getErrors);    
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();  
  },

  enterSubmit: function(event){
    if (event.keyCode === 13) {
     this.login();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({grid: nextProps.grid, userId: nextProps.user.id, size: nextProps.gridSize});
  },
  render: function(){
    return(
      <div style={{'display':'inline-block'}}>
        <a href="javascript:void(0)" onClick={this.openModal} >Save</a>
        <Modal show={this.state.showModal} onHide={this.closeModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Save Your Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.errors.length >= 1 ? <Alert bsStyle="danger">{this.state.errors.map(function(error){return(<p>{error}</p>)})}</Alert> : "" }
            <label>Title
            <Input type="text" valueLink={this.linkState('title')}/>
            </label>
            <br></br>
            <Button onClick={this.save}>Submit</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});



module.exports = Save;
