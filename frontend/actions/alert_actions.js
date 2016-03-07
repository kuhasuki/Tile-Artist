var Dispatcher = require('../dispatcher/dispatcher.js');
var DispatchConstants = require('../constants/dispatch_constants.js');

var AlertActions = {

  success: function(body, timeout){
    setTimeout(function() {
      Dispatcher.dispatch({
        actionType: DispatchConstants.ALERT_SUCCESS,
        body: body,
        timeout: timeout
      })
    }, 1);
  },

  info: function(body, timeout){
    setTimeout(function() {
      Dispatcher.dispatch({
        actionType: DispatchConstants.ALERT_INFO,
        body: body,
        timeout: timeout
      })
    }, 1);
  },

  warning: function(body, timeout){
    setTimeout(function() {
      Dispatcher.dispatch({
        actionType: DispatchConstants.ALERT_WARNING,
        body: body,
        timeout: timeout
      })
    }, 1);
  },

  danger: function(body, timeout){
    setTimeout(function() {
      Dispatcher.dispatch({
        actionType: DispatchConstants.ALERT_DANGER,
        body: body,
        timeout: timeout
      })
    }, 1);
  },

  clear: function(){
    setTimeout(function() {
      Dispatcher.dispatch({
        actionType: DispatchConstants.ALERT_CLEAR,
      })
    }, 1);
  }
};

window.AlertActions = AlertActions;

module.exports = AlertActions;
