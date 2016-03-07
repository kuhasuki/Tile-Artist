var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var AlertStore = new Store(Dispatcher);

var DispatchConstants = require('../constants/dispatch_constants.js');

var _alert = null;
var _body = null;
var _timeout = null;
var _type = null;
 
AlertStore.update = function(payload, type) {
  if($.isArray(payload.body)){
    _body = payload.body;
  } else {
    _body = [payload.body];
  }
  _timeout = payload.timeout;
  _type = type;
};

AlertStore.newAlert = function() {
  if(_body === null){
    return false;
  } else {
    return true;
  }
};

AlertStore.getAlert = function() {
  return { type: _type, body: _body, timeout: _timeout };
};

AlertStore.clearAlert = function(){
  _body = null;
  _timeout = null;
  _type = null;
};

AlertStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DispatchConstants.ALERT_SUCCESS:
      AlertStore.update(payload, "success");
      AlertStore.__emitChange();
      break;
    case DispatchConstants.ALERT_INFO:
      AlertStore.update(payload, "info");
      AlertStore.__emitChange();
      break;
    case DispatchConstants.ALERT_WARNING:
      AlertStore.update(payload, "warning");
      AlertStore.__emitChange();
      break;
    case DispatchConstants.ALERT_DANGER:
      AlertStore.update(payload, "danger");
      AlertStore.__emitChange();
      break;
    case DispatchConstants.ALERT_CLEAR:
      AlertStore.clearAlert();
      AlertStore.__emitChange();
      break;
  }
};

window.AlertStore = AlertStore;

module.exports = AlertStore
