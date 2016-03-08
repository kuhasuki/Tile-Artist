var ReactDOM = require('react-dom');
var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
// var History = require('react-router').History;

var Button = require('react-bootstrap/lib/Button');

var Navigation = require('./components/nav.jsx');
var Drawer = require('./components/drawer.jsx');
var Landing = require('./components/landing.jsx');
var Home = require('./components/home.jsx');
var NewPicture = require('./components/new_picture.jsx');
var ViewPicture = require('./components/view_picture.jsx');
var EditPicture = require('./components/edit_picture.jsx');
// var Content = require('./components/content.jsx');
// var Player = require('./components/player.jsx');
// var Profile = require('./components/profile.jsx');
// var Test = require('./components/test.jsx');
// var TrackUpload = require('./components/track_upload.jsx');
// var ImageUpload = require('./components/image_upload.jsx');
// var Track = require('./components/track.jsx');
// var MyTracks = require('./components/my_tracks.jsx');
// var Explore = require('./components/explore.jsx');

// var UserStore = require('./stores/user_store.js');
// var AlertStore = require('./stores/alert_store.js');
// var Api = require('./util/api.js');

// var AlertActions = require('./actions/alert_actions.js');
// var Dispatcher = require('./dispatcher/dispatcher.js');

var TileArtist = React.createClass({
  componentWillMount() {
      Api.verifySession();  
  },
  render: function(){
    // return(
    //   <div>
    //     <Navigation />
    //     {this.props.children}
    //     <br></br>
    //     <br></br>
    //     <Player />
    //   </div>
    // );
    return(
      <div>
        <Navigation />
        <div className="container-fluid">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

function requireAuth(nextState, replaceState ){
  Api.verifySession();
  if(!SessionStore.isLoggedIn()){
    replaceState({ nextPathname: nextState.location.pathname }, '/')
    AlertActions.danger("You must be logged in to do that", 2000);  
  } 
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector('#tileArtist');
  ReactDOM.render(
  <Router>
    <Route component={TileArtist} >
      <Route path="/" onClick={this._onClick} component={Landing} />
      <Route path="/home" component={Home} onEnter={requireAuth}/>
      <Route path="/new" component={NewPicture} onEnter={requireAuth}/>
      <Route path="pic/:id" component={ViewPicture} />
      <Route path="pic/:id/edit" component={EditPicture} onEnter={requireAuth}/>
    </Route>
  </Router>, root);
});
