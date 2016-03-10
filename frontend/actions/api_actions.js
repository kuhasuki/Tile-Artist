var Dispatcher = require('../dispatcher/dispatcher.js');
var DispatchConstants = require('../constants/dispatch_constants.js');

var ApiActions = {

  loginAttempt: function(data){
    if(data.hasOwnProperty("error")){
      Dispatcher.dispatch({
        actionType: DispatchConstants.LOGIN_FAILURE,
        error: data.error
      });

    } else {
      Dispatcher.dispatch({
        actionType: DispatchConstants.LOGIN_SUCCESS,
        user: data
      });

    }
  },

  registerAttempt: function(data){
    if(data.hasOwnProperty("error")){
      Dispatcher.dispatch({
        actionType: DispatchConstants.REGISTRATION_FAILURE,
        error: data.error
      });

    } else {
      Dispatcher.dispatch({
        actionType: DispatchConstants.REGISTRATION_SUCCESS,
        user: data
      });

    }
  },

  checkSession: function(data){
    if(data.hasOwnProperty("status")){
      Dispatcher.dispatch({
        actionType: DispatchConstants.LOGGED_OUT,
        error: data.error
      });

    } else {
      Dispatcher.dispatch({
        actionType: DispatchConstants.LOGGED_IN,
        user: data
      });
    }
  },

  saveAttempt: function(data){
    if(data.hasOwnProperty("error")){
      Dispatcher.dispatch({
        actionType: DispatchConstants.SAVE_FAILURE,
        error: data.error
      });

    } else {
      Dispatcher.dispatch({
        actionType: DispatchConstants.SAVE_SUCCESS,
        picture: data
      });

    }
  },

  fetchPicById: function(data){
    if(data.hasOwnProperty("error")){
      Dispatcher.dispatch({
        actionType: DispatchConstants.FETCH_FAILURE,
        error: data.error
      });

    } else {
      Dispatcher.dispatch({
        actionType: DispatchConstants.FETCH_SUCCESS,
        picture: data
      });
    }
  },


  fetchPicsById: function(data){
    if(data.hasOwnProperty("error")){
      Dispatcher.dispatch({
        actionType: DispatchConstants.PICS_FETCH_FAILURE,
        error: data.error
      });

    } else {
      Dispatcher.dispatch({
        actionType: DispatchConstants.PICS_FETCH_SUCCESS,
        pictures: data
      });
    }
  },
};

module.exports = ApiActions;
