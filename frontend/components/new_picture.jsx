var ReactDOM = require('react-dom');
var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Save = require('./save.jsx');

var SessionStore = require('../stores/session_store.js');

function getRandColor(brightness){
    //6 levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
};

var NewPicture = React.createClass({
	mixins: [LinkedStateMixin],
	getInitialState() {
	    return {
	    	base: getRandColor(5),
	      grid: [],
	      gridSize: 1,  
	    };
	},

	buildGrid(size){
		var newGrid = [];
		for(var i = 0; i < size; i++){
			newGrid.push([]);
			for(var j = 0; j < size; j++){
				newGrid[i].push({on: false, color: this.state.base})
			}
		}
    return newGrid;
  },

   _onChange(e) {
    newSize = parseInt(e.target.value);
    console.log(newSize);
    console.log(e.target.value);
    this.setState({ gridSize: newSize, grid: this.buildGrid(e.target.value) });
  },

  _toggleColor(col, idx, jdx) {

    var newGrid = this.state.grid.slice();
    var newCell = {};

    if(col.on === false){
      newCell.on = true;
      newCell.color = getRandColor(5);
    } else {
      newCell.on = false;
      newCell.color = this.state.base;
    }
    newGrid[idx][jdx] = newCell;
    this.setState({ grid: newGrid});

  },


  render: function(){
    var percentage = 100 / this.state.gridSize;
    return(
    <div className='col-xs-12 center' style={{'backgroundColor': 'white', 'height':'100%'}}>
      <h2>Create a New Picture</h2>
     	<label>Size&nbsp;&nbsp;
        <input type="number" min="1" max="25" onChange={this._onChange} />&nbsp;&nbsp;&nbsp;
        <Save grid={this.state.grid} base={this.state.base} gridSize={this.state.gridSize} user={SessionStore.getUser()} />
      </label>
      <br></br>
      {
        this.state.grid.map(function(row, idx){
        	return(
	          row.map(function(col, jdx){
	           	//console.log(col);
	           	return(
                <div style={{'width': percentage + '%', 'height': percentage + '%', 'display':'inline-block', 'padding':'1px'}}>
                <div key={idx+jdx} onClick={this._toggleColor.bind(this, col, idx, jdx)} style={{'height': '100%'}}>
                  <div style={{'width':'100%', 'height': '100%', 'backgroundColor':  col.color}} >
                    &nbsp;
                  </div>
                </div>
                </div>
                );
	          }.bind(this))
          )
        }.bind(this))
      }
    </div>
    );
  }
});



module.exports = NewPicture;