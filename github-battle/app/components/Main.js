var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Main = React.createClass({
    render: function(){
        return (
            <div>
                <Link to={'/'}>Home</Link>
                <div className='main-container'>
                {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Main;