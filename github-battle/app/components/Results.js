/**
 * Created by Heapzilla on 9/25/2016.
 */
var React = require('react');
var PropTypes = React.PropTypes;

function puke(object){
    return <pre>{JSON.stringify(object, null, ' ')}</pre>
}

function Results(props) {
    return (
        <div>Results: {puke(props)}</div>
    )
}

Results.PropTypes = {
    isLoading: PropTypes.bool.isRequired,
    playersInfo: PropTypes.array.isRequired,
    scores: PropTypes.array.isRequired
}

module.exports = Results;