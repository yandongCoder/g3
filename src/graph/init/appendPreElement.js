export default function () {
    var svg = this.svgSelection();
    this._brushSelection = svg.append("g").attr("class", "brush");

    var graphGroup = this.graphGroup = svg.append('g').attr('class', 'graph-group');
    
    graphGroup.append("g").attr("class", "links");
    graphGroup.append("g").attr("class", "nodes");
}