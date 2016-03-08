var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var SessionStore = new Store(Dispatcher);

var DispatchConstants = require('../constants/dispatch_constants.js');
var AlertActions = require('../actions/alert_actions.js');

var _error = '';
var _loggedIn = false;
var _user = {};
// var _public_user = {};

SessionStore.updateError = function(error){
  _error = error;
};

// SessionStore.setPublicUser = function(user){
//   _public_user = user;
// };

// SessionStore.getPublicUser = function(){
//   return _public_user;
// };

SessionStore.getError = function(){
  return _error;
};

SessionStore.login = function(user){
  _loggedIn = true;
  _user = user;
  localStorage.token = user.session_token;
};

SessionStore.logout = function(user){
  _loggedIn = false;
  _user = {};
  if(localStorage.token){
    localStorage.removeItem('token');
  }
};

SessionStore.getUser = function(){
  return _user;
};

SessionStore.isLoggedIn = function(){
  if(localStorage.token){
    return !!localStorage.token;
  } else {
    return false;
  }
};

SessionStore.loginStatus = function(){
  return _loggedIn;
};

SessionStore.__onDispatch = function (payload) {
  _error = "";
  switch (payload.actionType) {
    case DispatchConstants.LOGIN_SUCCESS:
      SessionStore.login(payload.user);
      //AlertActions.success("Welcome back " + payload.user.name, 2000);
      SessionStore.__emitChange();
      break;
    case DispatchConstants.LOGIN_FAILURE:
      SessionStore.updateError(payload.error);
      SessionStore.__emitChange();
      break;
    case DispatchConstants.REGISTRATION_SUCCESS:
      //AlertActions.success("Registered Successfully", 2000);
      SessionStore.login(payload.user);
      SessionStore.__emitChange();
      break;
    case DispatchConstants.REGISTRATION_FAILURE:
      SessionStore.updateError(payload.error);
      SessionStore.__emitChange();
      break;
    case DispatchConstants.LOGGED_IN:
      SessionStore.login(payload.user);
      SessionStore.__emitChange();
      break;
    case DispatchConstants.LOGGED_OUT:
      SessionStore.logout();
      SessionStore.__emitChange();
      break;
    case DispatchConstants.GET_USER_INFO:
      SessionStore.setPublicUser(payload.user);
      SessionStore.__emitChange();
      break;
  }
};

window.SessionStore = SessionStore;

module.exports = SessionStore
