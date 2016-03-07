var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var UserStore = new Store(Dispatcher);

var DispatchConstants = require('../constants/dispatch_constants.js');

var AlertActions = require('../actions/alert_actions.js');

var _error = '';
var _loggedIn = null;
var _user = {};
var _public_user = {};

UserStore.updateError = function(error){
  _error = error;
};

UserStore.setPublicUser = function(user){
  _public_user = user;
};

UserStore.getPublicUser = function(){
  return _public_user;
};

UserStore.getError = function(){
  return _error;
};

UserStore.login = function(user){
  _loggedIn = true;
  _user = user;
  localStorage.token = user.session_token;
};

UserStore.logout = function(user){
  _loggedIn = false;
  _user = {};
  if(localStorage.token){
    localStorage.removeItem('token');
  }
};

UserStore.getUser = function(){
  return _user;
};

UserStore.isLoggedIn = function(){
  if(localStorage.token){
    return !!localStorage.token;
  } else {
    return false;
  }
};

UserStore.loginStatus = function(){
  return _loggedIn;
};

UserStore.__onDispatch = function (payload) {
  _error = "";
  switch (payload.actionType) {
    case DispatchConstants.LOGIN_SUCCESS:
      UserStore.login(payload.user);
      AlertActions.success("Welcome back " + payload.user.name, 2000);
      UserStore.__emitChange();
      break;
    case DispatchConstants.LOGIN_FAILURE:
      UserStore.updateError(payload.error);
      UserStore.__emitChange();
      break;
    case DispatchConstants.REGISTRATION_SUCCESS:
      AlertActions.success("Registered Successfully", 2000);
      UserStore.login(payload.user);
      UserStore.__emitChange();
      break;
    case DispatchConstants.REGISTRATION_FAILURE:
      UserStore.updateError(payload.error);
      UserStore.__emitChange();
      break;
    case DispatchConstants.LOGGED_IN:
      UserStore.login(payload.user);
      UserStore.__emitChange();
      break;
    case DispatchConstants.LOGGED_OUT:
      UserStore.logout();
      UserStore.__emitChange();
      break;
    case DispatchConstants.GET_USER_INFO:
      UserStore.setPublicUser(payload.user);
      UserStore.__emitChange();
      break;
  }
};

window.UserStore = UserStore;

module.exports = UserStore
