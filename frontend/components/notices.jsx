var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var Alert = require('react-bootstrap/lib/Alert');

var AlertStore = require('../stores/alert_store.js');


var Notices = React.createClass({
  getInitialState() {
    return {
      alert: { type : null, body : null , timeout: null}, alertVisible: false
    };
  },

  componentDidMount() {
      this.listenerToken = AlertStore.addListener(this._incomingAlert);  
  },

  _incomingAlert() {
      this.handleAlertDismiss();
      this.setState({
        alert: AlertStore.getAlert(), alertVisible: AlertStore.newAlert()
      });
      
  },

  render() {
    if (this.state.alertVisible && this.state.alert.timeout !== null) {
      $('#notices').addClass('card-space');
      return (
        <Alert bsStyle={this.state.alert.type} onDismiss={this.handleAlertDismiss} dismissAfter={this.state.alert.timeout}>
          {
            this.state.alert.body.map(function(alert, idx){
           return(<p key={idx}>{alert}</p>)
          })
          }
        </Alert>
      );
    } else if(this.state.alertVisible && this.state.alert.timeout === null){
      $('#notices').addClass('card-space');
      return (
        <Alert bsStyle={this.state.alert.type} onDismiss={this.handleAlertDismiss}>
          {
            this.state.alert.body.map(function(alert, idx){
           return(<p key={idx}>{alert}</p>)
          })
          }
          <br></br>
          <Button onClick={this.handleAlertDismiss}>Hide Alert</Button>
        </Alert>
      );
    }
    return (null
    );
  },

  handleAlertDismiss: function () {
    $('#notices').removeClass('card-space');
    this.setState({alertVisible: false});
  },

  handleAlertShow: function () {
    this.setState({alertVisible: true});
  }
});




module.exports = Notices;