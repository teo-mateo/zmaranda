/**
 * Created by Heapzilla on 9/25/2016.
 */
var React = require('react');
var PropTypes = React.PropTypes;

var UserDetailsWrapper = function(props){
    return (
        <div className="col-sm-6">
            <p className="lead">{props.header}</p>
            {props.children}
        </div>
    )
}

module.exports = UserDetailsWrapper;