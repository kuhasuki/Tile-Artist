var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var ImageStore = new Store(Dispatcher);

var DispatchConstants = require('../constants/dispatch_constants.js');

var AlertActions = require('../actions/alert_actions.js');

var _image;
var _uploaded = false;
var _empty = true;

ImageStore.populate = function(image){
  _empty = false;
  _image = image;
};

ImageStore.getUploadedImage = function(){
  return _image;
};

ImageStore.uploadReady = function(){
  return _uploaded;
};

ImageStore.setImage = function(image){
  _image = JSON.parse(image).image;
  _uploaded = true;
};

ImageStore.empty = function(){
  return _empty;
};

ImageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DispatchConstants.IMAGE_UPLOAD_SUCCESS:
      AlertActions.success("Artist image successfully updated", 2000);
      ImageStore.setImage(payload.image);
      ImageStore.__emitChange();
      break;
    case DispatchConstants.IMAGE_UPLOAD_FAILURE:
      ImageStore.__emitChange();
      break;
    case DispatchConstants.FETCH_IMAGE:
      ImageStore.populate(payload.image);
      ImageStore.__emitChange();
      break;
  }
};

window.ImageStore = ImageStore;

module.exports = ImageStore