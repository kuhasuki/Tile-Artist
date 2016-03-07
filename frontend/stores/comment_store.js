var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var CommentStore = new Store(Dispatcher);

var DispatchConstants = require('../constants/dispatch_constants.js');

var AlertActions = require('../actions/alert_actions.js');

var _comments = [];

CommentStore.getAllComments = function(){
  return _comments;
};

CommentStore.addComment = function(comment){
  _comments.push(comment);
};

CommentStore.populate = function(comments){
  _comments = comments;
};

CommentStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DispatchConstants.FETCH_COMMENTS:
      CommentStore.populate(payload.comments);
      CommentStore.__emitChange();
      break;
    case DispatchConstants.NEW_COMMENT:
      CommentStore.addComment(payload.comment);
      CommentStore.__emitChange();
      break;
    case DispatchConstants.FAILED_COMMENT:
      CommentStore.__emitChange();
      break;
  }
};

window.CommentStore = CommentStore;

module.exports = CommentStore