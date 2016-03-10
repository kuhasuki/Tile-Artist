'use strict';
var ReactDOM = require('react-dom');
var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Api = require('../util/api.js');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var Alert = require('react-bootstrap/lib/Alert');

var SessionStore = require('../stores/session_store.js');

var Dispatcher = require('../dispatcher/dispatcher');


var Login = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
      return({name: '', password: '', errors: '', showModal: false});
  },

 closeModal: function() {
     this.setState({showModal : false, errors : ''});
 },

 openModal: function(){
      this.setState({showModal : true});
  },

  login: function(){
    Api.login(this.state.name, this.state.password);
    this.listenerToken = SessionStore.addListener(this._getErrors);
  },

  _getErrors: function(){
    if (SessionStore.getError() != '') {
      this.setState({errors: SessionStore.getError()});
    } else {
    }
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._getErrors);    
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();  
  },

  enterSubmit: function(event){
    if (event.keyCode === 13) {
     this.login();
    }
  },

  render: function(){
    return(
      <div style={{'display':'inline-block'}}>
        <a href="javascript:void(0)" onClick={this.openModal} >Login</a>
        <Modal show={this.state.showModal} onHide={this.closeModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.errors.length >= 1 ? <Alert bsStyle="danger">{this.state.errors}</Alert> : "" }
            <label>Username
              <Input type="text" valueLink={this.linkState('name')}/>
            </label>
            <br></br>
            <label>Password
              <Input onKeyUp={this.enterSubmit} type="password" valueLink={this.linkState('password')} />
            </label>
            <br></br>
            <Button onClick={this.login}>Submit</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});



module.exports = Login;
