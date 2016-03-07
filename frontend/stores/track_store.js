var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var TrackStore = new Store(Dispatcher);

var DispatchConstants = require('../constants/dispatch_constants.js');

var AlertActions = require('../actions/alert_actions.js');

var _track;
var _uploaded = false;
var _tracks = [];
var _empty = true;
var _sticky_track = {};
var _play = false;
var _paused = true;

TrackStore.getAllTracks = function(){
  return _tracks;
};

TrackStore.getTrackById = function(id){

  if(_track && _track.id == id){
    return _track;
  }

  for(i=0;i < _tracks.length; i++){
    if(_tracks[i].id == id){
      return _tracks[i];
    } 
    
  }
  return null;
};

TrackStore.populate = function(tracks){
  _empty = false;
  _tracks = tracks;
};

TrackStore.getUploadedTrack = function(){
  return _track;
};

TrackStore.uploadReady = function(){
  return _uploaded;
};

TrackStore.setTrack = function(track){
  _track = JSON.parse(track).track;
  _uploaded = true;
};

TrackStore.setStickyTrack = function(track){
  _sticky_track = track;
  _play = true;
  _paused = false;
};

TrackStore.getStickyTrack = function(){
  return _sticky_track;
};

TrackStore.getStickyTrackId = function(){
  if(_sticky_track["id"] === undefined){
    return 0;
  } else {
    return _sticky_track.id;
  }
};

TrackStore.empty = function(){
  return _empty;
};

TrackStore.play = function(){
  return _play;
};

TrackStore.paused = function(){
  return _paused;
};

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DispatchConstants.UPLOAD_SUCCESS:
      TrackStore.setTrack(payload.track);
      TrackStore.__emitChange();
      break;
    case DispatchConstants.UPLOAD_FAILURE:
      TrackStore.__emitChange();
      break;
    case DispatchConstants.FETCH_TRACKS:
      TrackStore.populate(payload.tracks);
      TrackStore.__emitChange();
      break;
    case DispatchConstants.FETCH_MY_TRACKS:
      TrackStore.populate(payload.tracks);
      TrackStore.__emitChange();
      break;
    case DispatchConstants.START_PLAYBACK:
      TrackStore.setStickyTrack(payload.track);
      TrackStore.__emitChange();
      break;
    case DispatchConstants.PAUSE_PLAYBACK:
      _paused = true;
      TrackStore.__emitChange();
      break;
    case DispatchConstants.STOP_PLAYBACK:
      _sticky_track = {};
      _play = false;
      TrackStore.__emitChange();
      break;
  }
};

window.TrackStore = TrackStore;

module.exports = TrackStore
