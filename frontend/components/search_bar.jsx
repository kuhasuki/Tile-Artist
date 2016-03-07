var React = require('react');

var Input = require('react-bootstrap/lib/Input');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Button = require('react-bootstrap/lib/Button');

var searchSubmit = <Button className="side-button"><Glyphicon glyph="search" /></Button>;

var Search = React.createClass({
    displayName: 'Search',
    render() {
        return (
            <form >
            	 <Input className="search-box" type="text" placeholder="Search for a track" buttonAfter={searchSubmit} />
            </form>
        );
    }
});

module.exports = Search;