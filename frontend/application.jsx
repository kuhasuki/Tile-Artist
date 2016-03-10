var ReactDOM = require('react-dom');
var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
// var History = require('react-router').History;

var Button = require('react-bootstrap/lib/Button');

var Navigation = require('./components/nav.jsx');
var Landing = require('./components/landing.jsx');
var Home = require('./components/home.jsx');
var NewPicture = require('./components/new_picture.jsx');
var ViewPicture = require('./components/view_picture.jsx');
var EditPicture = require('./components/edit_picture.jsx');

var SessionStore = require('./stores/session_store.js');

var TileArtist = React.createClass({
  componentWillMount() {
      Api.verifySession();  
  },
  render: function(){
    return(
      <div  style={{'height':'100%'}}>
        <Navigation />
        <div className="container-fluid" style={{'height':'100%'}}>
          <div className="row" style={{'height':'85%'}}>
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
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector('#tileArtist');
  ReactDOM.render(
  <Router>
    <Route component={TileArtist} >
      <Route path="/" onClick={this._onClick} component={Landing} />
      <Route path="/home"component={Home} onEnter={requireAuth}/>
      <Route path="/new" component={NewPicture} onEnter={requireAuth}/>
      <Route path="pic/:id" component={ViewPicture} />
      <Route path="pic/:id/edit" component={EditPicture} onEnter={requireAuth}/>
    </Route>
  </Router>, root);
});
