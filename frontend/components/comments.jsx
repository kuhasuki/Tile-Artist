var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Api = require('../util/api.js');
var CommentStore = require('../stores/comment_store.js');

var Row = require('react-bootstrap/lib/Row');
var Well = require('react-bootstrap/lib/Well');
var Col = require('react-bootstrap/lib/Col');
var Comments = React.createClass({
	mixins: [LinkedStateMixin],
    getInitialState() {
        return {
            comments: []
        };
    },

    componentDidMount() {
        Api.fetchComments(this.props.track_id);
        this.listenerToken = CommentStore.addListener(this._commentsChanged)
    },

    // componentWillUpdate(nextProps, nextState) {
    //     Api.fetchComments(this.props.track_id);  
    // },

    componentWillUnmount() {
        this.listenerToken.remove();
    },

    _commentsChanged() {
       this.setState({
        comments:CommentStore.getAllComments()
       })
    },

    render() {
        return (
            <Row>
            <br></br>
        {
            this.state.comments.map(function(comment, idx){
              return(
                
                  <Col key={idx} xs={12} md={8} mdOffset={2} className="card-space">
                      
                       <Well style={{"margin": "0"}}>
                        <p>{comment.author} : {comment.body}</p>
                      </Well>

                </Col>
              
                
                )
            }.bind(this))
          }

          </Row>

        );
    }
});

module.exports = Comments;