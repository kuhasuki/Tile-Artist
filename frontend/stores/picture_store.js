var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var PictureStore = new Store(Dispatcher);

var DispatchConstants = require('../constants/dispatch_constants.js');
var AlertActions = require('../actions/alert_actions.js');

var _error = '';
var _picture = {grid:[]};
var _saved = false;
var _pictures = [];
// var _public_user = {};

PictureStore.updateError = function(error){
  _error = error;
  console.log("got error");
  console.log(error);
  _saved = false;
};

// PictureStore.setPublicUser = function(user){
//   _public_user = user;
// };

// PictureStore.getPublicUser = function(){
//   return _public_user;
// };

PictureStore.getError = function(){

  return _error;
};

PictureStore.login = function(user){
  _loggedIn = true;
  _user = user;
  localStorage.token = user.session_token;
};

PictureStore.save = function(picture){
  console.log("in save");
  _picture = picture;
  _pictures.push(picture);
  _saved = true;
};

PictureStore.removeDuplicates = function(){
  console.log("start");
  console.log(_pictures);
  var newPictures = _pictures.slice();
  console.log('newpics', newPictures);
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
  console.log(id);

  console.log(_pictures);
  _pictures.forEach(function(picture){
    console.log(picture.id);
    if(picture.id === id){
      console.log(picture.grid);
      _picture = picture;
    } else {
      console.log("not found");
    }
  })
  return _picture;
};

PictureStore.getPicturesById = function(id){
  id = parseInt(id);
  var matches = [];
  this.removeDuplicates(_pictures);
  _pictures.forEach(function(picture){
    console.log(picture.id);
    if(picture.user_id === id){
      console.log(picture.grid);
      matches.push(picture);
    } else {
      console.log("not found");
    }
  })
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
      //AlertActions.success("Welcome back " + payload.user.name, 2000);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.SAVE_FAILURE:
      console.log(payload.error);
      PictureStore.updateError(payload.error);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.FETCH_SUCCESS:
      console.log(payload.picture);
      PictureStore.addPic(payload.picture);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.FETCH_FAILURE:
      console.log(payload.error);
      PictureStore.updateError(payload.error);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.PICS_FETCH_SUCCESS:
      console.log(payload.picture);
      PictureStore.addPics(payload.pictures);
      PictureStore.__emitChange();
      break;
    case DispatchConstants.PICS_FETCH_FAILURE:
      console.log(payload.error);
      PictureStore.updateError(payload.error);
      PictureStore.__emitChange();
      break;
  }
};

window.PictureStore = PictureStore;

module.exports = PictureStore
