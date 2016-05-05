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