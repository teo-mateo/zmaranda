/**
 * Created by Heapzilla on 5/5/2016.
 */
Array.maxByReduce = function(data){
    if (data.constructor === Array){
        return data.reduce(function(x,y){
            return (+x > +y) ? +x : +y;
        })
    } else {
        return data;
    }
};

function hasClass( target, className ) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}