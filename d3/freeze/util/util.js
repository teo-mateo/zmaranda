/**
 * Created by Heapzilla on 5/5/2016.
 */
// jshint ignore: start

Array.maxByReduce = function(data){
    if (data.constructor === Array){
        return data.reduce(function(x,y){
            return (+x > +y) ? +x : +y;
        })
    } else {
        return data;
    }
};

var _util = {
    hasClass: function( target, className ) {
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
    }
};