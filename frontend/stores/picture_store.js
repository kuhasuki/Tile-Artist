var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var PictureStore = new Store(Dispatcher);

var DispatchConstants = require('../constants/dispatch_constants.js');

var _error = '';
var _picture = {grid:[]};
var _saved = false;
var _pictures = [];

PictureStore.updateError = function(error){
  _error = error;
  _saved = false;
};


PictureStore.getError = function(){
  return _error;
};

PictureStore.save = function(picture){
  _picture = picture;
  _pictures.push(picture);
  _saved = true;
};

PictureStore.removeDuplicates = function(){

  var newPictures = _pictures.slice();

 _pictures.forEach(function(picture, i){
    for(var j = i + 1; j < _pictures.length; j++){

      if(picture.id == _pictures[j].id)
        newPictures.splice(j,1);
    }
  });
  _pictures = newPictures;
};


PictureStore.addPic = function(picture){
  _pictures.push(picture);
};

PictureStore.addPics = function(pictures){
  jQuery.extend(_pictures, pictures);
};


PictureStore.getPictureById = function(id){

  id = parseInt(id);

  _pictures.forEach(function(picture){
    if(picture.id === id){
      _picture = picture;
    }
  });

  return _picture;
};

PictureStore.getPicturesById = function(id){

  id = parseInt(id);
  var matches = [];

  this.removeDuplicates(_pictures);

  _pictures.forEach(function(picture){
    if(picture.user_id === id){
      matches.push(picture);
    }
  });

  return matches;
};

PictureStore.getSavedPicture = function(){
  return _picture;
};

PictureStore.saved = function(){
  return _saved;
};


PictureStore.isLoggedIn = function(){
  if(localStorage.token){
    return !!localStorage.token;
  } else {
    return false;
  }
};

PictureStore.loginStatus = function(){
  return _loggedIn;
};

PictureStore.__onDispatch = function (payload) {
  _saved = false;
  _error = '';
  switch (payload.actionType) {
    case DispatchConstants.SAVE_SUCCESS:
      PictureStore.save(payload.picture);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.SAVE_FAILURE:
      PictureStore.updateError(payload.error);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.FETCH_SUCCESS:
      PictureStore.addPic(payload.picture);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.FETCH_FAILURE:
      PictureStore.updateError(payload.error);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.PICS_FETCH_SUCCESS:
      PictureStore.addPics(payload.pictures);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.PICS_FETCH_FAILURE:
      PictureStore.updateError(payload.error);
      PictureStore.__emitChange();
      break;
  }
};

module.exports = PictureStore
