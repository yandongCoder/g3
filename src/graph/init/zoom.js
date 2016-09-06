export default function() {
    var self = this;
    return d3.zoom().scaleExtent([0.1, 2.2])
        .on('start', function () {
        })
        .on("zoom", function(){
            self._transform.call(self);
        })
        .on('end', function () {
        });
}

