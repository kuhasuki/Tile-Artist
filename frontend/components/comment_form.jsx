var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Api = require('../util/api.js');
var CommentStore = require('../stores/comment_store.js');
var UserStore = require('../stores/user_store.js');

var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');

var CommentForm = React.createClass({
	mixins: [LinkedStateMixin],
    getInitialState() {
        return {
            body: '',
            showModal: false,
            name: '', 
            password: '', 
            errors: ''
        };
    },

    componentDidMount() {
      this.formData = new FormData();
      this.uploadInProgress = false;
      this.submitText = "Submit";
      //console.log(UserStore.isLoggedIn());
      this.listenerToken = CommentStore.addListener(this._commentsChanged);
      this.listenerToken2 = UserStore.addListener(this._getErrors);    
    },

    componentWillUpdate(nextProps, nextState) {
        Api.fetchComments(this.props.track_id);  
    },

    _commentsChanged() {
        this.uploadInProgress = false;
        this.submitText = "Submit";
        // if (!UserStore.isLoggedIn()){
        //     this.submitText = "Please Sign in to leave a comment"
        // };
    },

    handleSubmit(e){
    	e.preventDefault;
        if (!UserStore.isLoggedIn()){
            this.setState({showModal : true});
            
        } else {
        	Api.submitComment(this.state.body, this.props.track_id);
            Api.fetchComments(this.props.track_id);
            this.setState({body : ''});
        };
    },

    closeModal() {
        this.setState({showModal : false, errors : ''});
    },

    openModal(){
      this.setState({showModal : true});
    },

    login(){
        Api.login(this.state.name, this.state.password);
        this.listenerToken2 = UserStore.addListener(this._getErrors);
    },

    loginGuest(){
        Api.login("guest", "guest1");
        this.listenerToken2 = UserStore.addListener(this._getErrors);
    },

    _getErrors(){
        if (UserStore.getError() != '') {
          this.setState({errors: UserStore.getError()});
        } else {
          this.closeModal(); 
        }
    },

  componentWillUnmount: function () {
    this.listenerToken.remove();  
    this.listenerToken2.remove(); 
  },

  enterSubmit: function(event){
    if (event.keyCode === 13) {
     this.login();
  }
  },

    // sayFile(e){
    //     e.preventDefault;
    // 	var file = e.target.files[0];
    // 	this.formData.append('file', file, file.name);
    // 	this.setState({file : file});
    // },

    render() {
        return (
        <Col xs={12} className="card-space">
            <Row>
            <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                <h4> Leave a Comment</h4>
        	    <form>
	        	<Input type="textarea" label="Comment" placeholder="" valueLink={this.linkState('body')} labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
	        	<ButtonInput value={this.submitText} disabled={this.uploadInProgress} onClick={this.handleSubmit} wrapperClassName="col-xs-offset-2 col-xs-2"/>
                
        	</form>
            </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.closeModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>You must be logged in to post a comment</Modal.Title>
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
            <Button onClick={this.login}>Log in</Button>
            <hr className="overcome-padding"></hr>
            <h5>Not a registered user?</h5>
            <Button onClick={this.loginGuest}>Log in as a Guest</Button>
          </Modal.Body>
        </Modal>
        </Col>

        );
    }
});

module.exports = CommentForm;